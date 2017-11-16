package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.RateAlbum;
import com.furymusic.repository.AlbumRepository;
import com.furymusic.repository.RateAlbumRepository;
import com.furymusic.repository.UserRepository;
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
 * Test class for the RateAlbumResource REST controller.
 *
 * @see RateAlbumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class RateAlbumResourceIntTest {

    private static final Integer DEFAULT_RATE = 1;
    private static final Integer UPDATED_RATE = 2;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RateAlbumRepository rateAlbumRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRateAlbumMockMvc;

    private RateAlbum rateAlbum;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RateAlbumResource rateAlbumResource = new RateAlbumResource(rateAlbumRepository, albumRepository, userRepository);
        this.restRateAlbumMockMvc = MockMvcBuilders.standaloneSetup(rateAlbumResource)
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
    public static RateAlbum createEntity(EntityManager em) {
        RateAlbum rateAlbum = new RateAlbum()
            .rate(DEFAULT_RATE)
            .date(DEFAULT_DATE);
        return rateAlbum;
    }

    @Before
    public void initTest() {
        rateAlbum = createEntity(em);
    }

    @Test
    @Transactional
    public void createRateAlbum() throws Exception {
        int databaseSizeBeforeCreate = rateAlbumRepository.findAll().size();

        // Create the RateAlbum
        restRateAlbumMockMvc.perform(post("/api/rate-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateAlbum)))
            .andExpect(status().isCreated());

        // Validate the RateAlbum in the database
        List<RateAlbum> rateAlbumList = rateAlbumRepository.findAll();
        assertThat(rateAlbumList).hasSize(databaseSizeBeforeCreate + 1);
        RateAlbum testRateAlbum = rateAlbumList.get(rateAlbumList.size() - 1);
        assertThat(testRateAlbum.getRate()).isEqualTo(DEFAULT_RATE);
        assertThat(testRateAlbum.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createRateAlbumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rateAlbumRepository.findAll().size();

        // Create the RateAlbum with an existing ID
        rateAlbum.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRateAlbumMockMvc.perform(post("/api/rate-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateAlbum)))
            .andExpect(status().isBadRequest());

        // Validate the RateAlbum in the database
        List<RateAlbum> rateAlbumList = rateAlbumRepository.findAll();
        assertThat(rateAlbumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRateAlbums() throws Exception {
        // Initialize the database
        rateAlbumRepository.saveAndFlush(rateAlbum);

        // Get all the rateAlbumList
        restRateAlbumMockMvc.perform(get("/api/rate-albums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rateAlbum.getId().intValue())))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getRateAlbum() throws Exception {
        // Initialize the database
        rateAlbumRepository.saveAndFlush(rateAlbum);

        // Get the rateAlbum
        restRateAlbumMockMvc.perform(get("/api/rate-albums/{id}", rateAlbum.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rateAlbum.getId().intValue()))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingRateAlbum() throws Exception {
        // Get the rateAlbum
        restRateAlbumMockMvc.perform(get("/api/rate-albums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRateAlbum() throws Exception {
        // Initialize the database
        rateAlbumRepository.saveAndFlush(rateAlbum);
        int databaseSizeBeforeUpdate = rateAlbumRepository.findAll().size();

        // Update the rateAlbum
        RateAlbum updatedRateAlbum = rateAlbumRepository.findOne(rateAlbum.getId());
        updatedRateAlbum
            .rate(UPDATED_RATE)
            .date(UPDATED_DATE);

        restRateAlbumMockMvc.perform(put("/api/rate-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRateAlbum)))
            .andExpect(status().isOk());

        // Validate the RateAlbum in the database
        List<RateAlbum> rateAlbumList = rateAlbumRepository.findAll();
        assertThat(rateAlbumList).hasSize(databaseSizeBeforeUpdate);
        RateAlbum testRateAlbum = rateAlbumList.get(rateAlbumList.size() - 1);
        assertThat(testRateAlbum.getRate()).isEqualTo(UPDATED_RATE);
        assertThat(testRateAlbum.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingRateAlbum() throws Exception {
        int databaseSizeBeforeUpdate = rateAlbumRepository.findAll().size();

        // Create the RateAlbum

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRateAlbumMockMvc.perform(put("/api/rate-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateAlbum)))
            .andExpect(status().isCreated());

        // Validate the RateAlbum in the database
        List<RateAlbum> rateAlbumList = rateAlbumRepository.findAll();
        assertThat(rateAlbumList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRateAlbum() throws Exception {
        // Initialize the database
        rateAlbumRepository.saveAndFlush(rateAlbum);
        int databaseSizeBeforeDelete = rateAlbumRepository.findAll().size();

        // Get the rateAlbum
        restRateAlbumMockMvc.perform(delete("/api/rate-albums/{id}", rateAlbum.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RateAlbum> rateAlbumList = rateAlbumRepository.findAll();
        assertThat(rateAlbumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RateAlbum.class);
        RateAlbum rateAlbum1 = new RateAlbum();
        rateAlbum1.setId(1L);
        RateAlbum rateAlbum2 = new RateAlbum();
        rateAlbum2.setId(rateAlbum1.getId());
        assertThat(rateAlbum1).isEqualTo(rateAlbum2);
        rateAlbum2.setId(2L);
        assertThat(rateAlbum1).isNotEqualTo(rateAlbum2);
        rateAlbum1.setId(null);
        assertThat(rateAlbum1).isNotEqualTo(rateAlbum2);
    }
}
