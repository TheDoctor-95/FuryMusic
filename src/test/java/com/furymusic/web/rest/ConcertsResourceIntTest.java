package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.Concerts;
import com.furymusic.repository.ConcertsRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.furymusic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConcertsResource REST controller.
 *
 * @see ConcertsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class ConcertsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_PLACE = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUD = 1D;
    private static final Double UPDATED_LONGITUD = 2D;

    private static final String DEFAULT_URL_GOOGLE = "AAAAAAAAAA";
    private static final String UPDATED_URL_GOOGLE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ConcertsRepository concertsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConcertsMockMvc;

    private Concerts concerts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConcertsResource concertsResource = new ConcertsResource(concertsRepository);
        this.restConcertsMockMvc = MockMvcBuilders.standaloneSetup(concertsResource)
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
    public static Concerts createEntity(EntityManager em) {
        Concerts concerts = new Concerts()
            .name(DEFAULT_NAME)
            .place(DEFAULT_PLACE)
            .latitude(DEFAULT_LATITUDE)
            .longitud(DEFAULT_LONGITUD)
            .urlGoogle(DEFAULT_URL_GOOGLE)
            .date(DEFAULT_DATE);
        return concerts;
    }

    @Before
    public void initTest() {
        concerts = createEntity(em);
    }

    @Test
    @Transactional
    public void createConcerts() throws Exception {
        int databaseSizeBeforeCreate = concertsRepository.findAll().size();

        // Create the Concerts
        restConcertsMockMvc.perform(post("/api/concerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(concerts)))
            .andExpect(status().isCreated());

        // Validate the Concerts in the database
        List<Concerts> concertsList = concertsRepository.findAll();
        assertThat(concertsList).hasSize(databaseSizeBeforeCreate + 1);
        Concerts testConcerts = concertsList.get(concertsList.size() - 1);
        assertThat(testConcerts.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testConcerts.getPlace()).isEqualTo(DEFAULT_PLACE);
        assertThat(testConcerts.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testConcerts.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testConcerts.getUrlGoogle()).isEqualTo(DEFAULT_URL_GOOGLE);
        assertThat(testConcerts.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createConcertsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = concertsRepository.findAll().size();

        // Create the Concerts with an existing ID
        concerts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConcertsMockMvc.perform(post("/api/concerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(concerts)))
            .andExpect(status().isBadRequest());

        // Validate the Concerts in the database
        List<Concerts> concertsList = concertsRepository.findAll();
        assertThat(concertsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConcerts() throws Exception {
        // Initialize the database
        concertsRepository.saveAndFlush(concerts);

        // Get all the concertsList
        restConcertsMockMvc.perform(get("/api/concerts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(concerts.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].place").value(hasItem(DEFAULT_PLACE.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].urlGoogle").value(hasItem(DEFAULT_URL_GOOGLE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getConcerts() throws Exception {
        // Initialize the database
        concertsRepository.saveAndFlush(concerts);

        // Get the concerts
        restConcertsMockMvc.perform(get("/api/concerts/{id}", concerts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(concerts.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.place").value(DEFAULT_PLACE.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.doubleValue()))
            .andExpect(jsonPath("$.urlGoogle").value(DEFAULT_URL_GOOGLE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConcerts() throws Exception {
        // Get the concerts
        restConcertsMockMvc.perform(get("/api/concerts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConcerts() throws Exception {
        // Initialize the database
        concertsRepository.saveAndFlush(concerts);
        int databaseSizeBeforeUpdate = concertsRepository.findAll().size();

        // Update the concerts
        Concerts updatedConcerts = concertsRepository.findOne(concerts.getId());
        updatedConcerts
            .name(UPDATED_NAME)
            .place(UPDATED_PLACE)
            .latitude(UPDATED_LATITUDE)
            .longitud(UPDATED_LONGITUD)
            .urlGoogle(UPDATED_URL_GOOGLE)
            .date(UPDATED_DATE);

        restConcertsMockMvc.perform(put("/api/concerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConcerts)))
            .andExpect(status().isOk());

        // Validate the Concerts in the database
        List<Concerts> concertsList = concertsRepository.findAll();
        assertThat(concertsList).hasSize(databaseSizeBeforeUpdate);
        Concerts testConcerts = concertsList.get(concertsList.size() - 1);
        assertThat(testConcerts.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testConcerts.getPlace()).isEqualTo(UPDATED_PLACE);
        assertThat(testConcerts.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testConcerts.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testConcerts.getUrlGoogle()).isEqualTo(UPDATED_URL_GOOGLE);
        assertThat(testConcerts.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingConcerts() throws Exception {
        int databaseSizeBeforeUpdate = concertsRepository.findAll().size();

        // Create the Concerts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConcertsMockMvc.perform(put("/api/concerts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(concerts)))
            .andExpect(status().isCreated());

        // Validate the Concerts in the database
        List<Concerts> concertsList = concertsRepository.findAll();
        assertThat(concertsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConcerts() throws Exception {
        // Initialize the database
        concertsRepository.saveAndFlush(concerts);
        int databaseSizeBeforeDelete = concertsRepository.findAll().size();

        // Get the concerts
        restConcertsMockMvc.perform(delete("/api/concerts/{id}", concerts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Concerts> concertsList = concertsRepository.findAll();
        assertThat(concertsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Concerts.class);
        Concerts concerts1 = new Concerts();
        concerts1.setId(1L);
        Concerts concerts2 = new Concerts();
        concerts2.setId(concerts1.getId());
        assertThat(concerts1).isEqualTo(concerts2);
        concerts2.setId(2L);
        assertThat(concerts1).isNotEqualTo(concerts2);
        concerts1.setId(null);
        assertThat(concerts1).isNotEqualTo(concerts2);
    }
}
