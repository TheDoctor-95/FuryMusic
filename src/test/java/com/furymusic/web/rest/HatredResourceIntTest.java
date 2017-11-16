package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.Hatred;
import com.furymusic.repository.HatredRepository;
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
 * Test class for the HatredResource REST controller.
 *
 * @see HatredResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class HatredResourceIntTest {

    private static final Boolean DEFAULT_HATED = false;
    private static final Boolean UPDATED_HATED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private HatredRepository hatredRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHatredMockMvc;

    private Hatred hatred;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HatredResource hatredResource = new HatredResource(hatredRepository);
        this.restHatredMockMvc = MockMvcBuilders.standaloneSetup(hatredResource)
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
    public static Hatred createEntity(EntityManager em) {
        Hatred hatred = new Hatred()
            .hated(DEFAULT_HATED)
            .date(DEFAULT_DATE);
        return hatred;
    }

    @Before
    public void initTest() {
        hatred = createEntity(em);
    }

    @Test
    @Transactional
    public void createHatred() throws Exception {
        int databaseSizeBeforeCreate = hatredRepository.findAll().size();

        // Create the Hatred
        restHatredMockMvc.perform(post("/api/hatreds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hatred)))
            .andExpect(status().isCreated());

        // Validate the Hatred in the database
        List<Hatred> hatredList = hatredRepository.findAll();
        assertThat(hatredList).hasSize(databaseSizeBeforeCreate + 1);
        Hatred testHatred = hatredList.get(hatredList.size() - 1);
        assertThat(testHatred.isHated()).isEqualTo(DEFAULT_HATED);
        assertThat(testHatred.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createHatredWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hatredRepository.findAll().size();

        // Create the Hatred with an existing ID
        hatred.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHatredMockMvc.perform(post("/api/hatreds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hatred)))
            .andExpect(status().isBadRequest());

        // Validate the Hatred in the database
        List<Hatred> hatredList = hatredRepository.findAll();
        assertThat(hatredList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHatreds() throws Exception {
        // Initialize the database
        hatredRepository.saveAndFlush(hatred);

        // Get all the hatredList
        restHatredMockMvc.perform(get("/api/hatreds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hatred.getId().intValue())))
            .andExpect(jsonPath("$.[*].hated").value(hasItem(DEFAULT_HATED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getHatred() throws Exception {
        // Initialize the database
        hatredRepository.saveAndFlush(hatred);

        // Get the hatred
        restHatredMockMvc.perform(get("/api/hatreds/{id}", hatred.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hatred.getId().intValue()))
            .andExpect(jsonPath("$.hated").value(DEFAULT_HATED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingHatred() throws Exception {
        // Get the hatred
        restHatredMockMvc.perform(get("/api/hatreds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHatred() throws Exception {
        // Initialize the database
        hatredRepository.saveAndFlush(hatred);
        int databaseSizeBeforeUpdate = hatredRepository.findAll().size();

        // Update the hatred
        Hatred updatedHatred = hatredRepository.findOne(hatred.getId());
        updatedHatred
            .hated(UPDATED_HATED)
            .date(UPDATED_DATE);

        restHatredMockMvc.perform(put("/api/hatreds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHatred)))
            .andExpect(status().isOk());

        // Validate the Hatred in the database
        List<Hatred> hatredList = hatredRepository.findAll();
        assertThat(hatredList).hasSize(databaseSizeBeforeUpdate);
        Hatred testHatred = hatredList.get(hatredList.size() - 1);
        assertThat(testHatred.isHated()).isEqualTo(UPDATED_HATED);
        assertThat(testHatred.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingHatred() throws Exception {
        int databaseSizeBeforeUpdate = hatredRepository.findAll().size();

        // Create the Hatred

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHatredMockMvc.perform(put("/api/hatreds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hatred)))
            .andExpect(status().isCreated());

        // Validate the Hatred in the database
        List<Hatred> hatredList = hatredRepository.findAll();
        assertThat(hatredList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHatred() throws Exception {
        // Initialize the database
        hatredRepository.saveAndFlush(hatred);
        int databaseSizeBeforeDelete = hatredRepository.findAll().size();

        // Get the hatred
        restHatredMockMvc.perform(delete("/api/hatreds/{id}", hatred.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Hatred> hatredList = hatredRepository.findAll();
        assertThat(hatredList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hatred.class);
        Hatred hatred1 = new Hatred();
        hatred1.setId(1L);
        Hatred hatred2 = new Hatred();
        hatred2.setId(hatred1.getId());
        assertThat(hatred1).isEqualTo(hatred2);
        hatred2.setId(2L);
        assertThat(hatred1).isNotEqualTo(hatred2);
        hatred1.setId(null);
        assertThat(hatred1).isNotEqualTo(hatred2);
    }
}
