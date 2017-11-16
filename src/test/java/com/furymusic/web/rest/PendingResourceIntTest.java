package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.Pending;
import com.furymusic.repository.PendingRepository;
import com.furymusic.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.furymusic.web.rest.TestUtil.sameInstant;
import static com.furymusic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PendingResource REST controller.
 *
 * @see PendingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class PendingResourceIntTest {

    private static final Boolean DEFAULT_PENDING = false;
    private static final Boolean UPDATED_PENDING = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PendingRepository pendingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPendingMockMvc;

    private Pending pending;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PendingResource pendingResource = new PendingResource(pendingRepository);
        this.restPendingMockMvc = MockMvcBuilders.standaloneSetup(pendingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pending createEntity(EntityManager em) {
        Pending pending = new Pending()
            .pending(DEFAULT_PENDING)
            .date(DEFAULT_DATE);
        return pending;
    }

    @Before
    public void initTest() {
        pending = createEntity(em);
    }

    @Test
    @Transactional
    public void createPending() throws Exception {
        int databaseSizeBeforeCreate = pendingRepository.findAll().size();

        // Create the Pending
        restPendingMockMvc.perform(post("/api/pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pending)))
            .andExpect(status().isCreated());

        // Validate the Pending in the database
        List<Pending> pendingList = pendingRepository.findAll();
        assertThat(pendingList).hasSize(databaseSizeBeforeCreate + 1);
        Pending testPending = pendingList.get(pendingList.size() - 1);
        assertThat(testPending.isPending()).isEqualTo(DEFAULT_PENDING);
        assertThat(testPending.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createPendingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pendingRepository.findAll().size();

        // Create the Pending with an existing ID
        pending.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPendingMockMvc.perform(post("/api/pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pending)))
            .andExpect(status().isBadRequest());

        // Validate the Pending in the database
        List<Pending> pendingList = pendingRepository.findAll();
        assertThat(pendingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPendings() throws Exception {
        // Initialize the database
        pendingRepository.saveAndFlush(pending);

        // Get all the pendingList
        restPendingMockMvc.perform(get("/api/pendings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pending.getId().intValue())))
            .andExpect(jsonPath("$.[*].pending").value(hasItem(DEFAULT_PENDING.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getPending() throws Exception {
        // Initialize the database
        pendingRepository.saveAndFlush(pending);

        // Get the pending
        restPendingMockMvc.perform(get("/api/pendings/{id}", pending.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pending.getId().intValue()))
            .andExpect(jsonPath("$.pending").value(DEFAULT_PENDING.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingPending() throws Exception {
        // Get the pending
        restPendingMockMvc.perform(get("/api/pendings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePending() throws Exception {
        // Initialize the database
        pendingRepository.saveAndFlush(pending);
        int databaseSizeBeforeUpdate = pendingRepository.findAll().size();

        // Update the pending
        Pending updatedPending = pendingRepository.findOne(pending.getId());
        updatedPending
            .pending(UPDATED_PENDING)
            .date(UPDATED_DATE);

        restPendingMockMvc.perform(put("/api/pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPending)))
            .andExpect(status().isOk());

        // Validate the Pending in the database
        List<Pending> pendingList = pendingRepository.findAll();
        assertThat(pendingList).hasSize(databaseSizeBeforeUpdate);
        Pending testPending = pendingList.get(pendingList.size() - 1);
        assertThat(testPending.isPending()).isEqualTo(UPDATED_PENDING);
        assertThat(testPending.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPending() throws Exception {
        int databaseSizeBeforeUpdate = pendingRepository.findAll().size();

        // Create the Pending

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPendingMockMvc.perform(put("/api/pendings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pending)))
            .andExpect(status().isCreated());

        // Validate the Pending in the database
        List<Pending> pendingList = pendingRepository.findAll();
        assertThat(pendingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePending() throws Exception {
        // Initialize the database
        pendingRepository.saveAndFlush(pending);
        int databaseSizeBeforeDelete = pendingRepository.findAll().size();

        // Get the pending
        restPendingMockMvc.perform(delete("/api/pendings/{id}", pending.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pending> pendingList = pendingRepository.findAll();
        assertThat(pendingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pending.class);
        Pending pending1 = new Pending();
        pending1.setId(1L);
        Pending pending2 = new Pending();
        pending2.setId(pending1.getId());
        assertThat(pending1).isEqualTo(pending2);
        pending2.setId(2L);
        assertThat(pending1).isNotEqualTo(pending2);
        pending1.setId(null);
        assertThat(pending1).isNotEqualTo(pending2);
    }
}
