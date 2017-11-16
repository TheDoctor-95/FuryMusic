package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.ArtistBandStatus;
import com.furymusic.repository.ArtistBandStatusRepository;
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
 * Test class for the ArtistBandStatusResource REST controller.
 *
 * @see ArtistBandStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class ArtistBandStatusResourceIntTest {

    private static final LocalDate DEFAULT_INCORPORATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INCORPORATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LEAVING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LEAVING_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ArtistBandStatusRepository artistBandStatusRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArtistBandStatusMockMvc;

    private ArtistBandStatus artistBandStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArtistBandStatusResource artistBandStatusResource = new ArtistBandStatusResource(artistBandStatusRepository);
        this.restArtistBandStatusMockMvc = MockMvcBuilders.standaloneSetup(artistBandStatusResource)
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
    public static ArtistBandStatus createEntity(EntityManager em) {
        ArtistBandStatus artistBandStatus = new ArtistBandStatus()
            .incorporationDate(DEFAULT_INCORPORATION_DATE)
            .leavingDate(DEFAULT_LEAVING_DATE);
        return artistBandStatus;
    }

    @Before
    public void initTest() {
        artistBandStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createArtistBandStatus() throws Exception {
        int databaseSizeBeforeCreate = artistBandStatusRepository.findAll().size();

        // Create the ArtistBandStatus
        restArtistBandStatusMockMvc.perform(post("/api/artist-band-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artistBandStatus)))
            .andExpect(status().isCreated());

        // Validate the ArtistBandStatus in the database
        List<ArtistBandStatus> artistBandStatusList = artistBandStatusRepository.findAll();
        assertThat(artistBandStatusList).hasSize(databaseSizeBeforeCreate + 1);
        ArtistBandStatus testArtistBandStatus = artistBandStatusList.get(artistBandStatusList.size() - 1);
        assertThat(testArtistBandStatus.getIncorporationDate()).isEqualTo(DEFAULT_INCORPORATION_DATE);
        assertThat(testArtistBandStatus.getLeavingDate()).isEqualTo(DEFAULT_LEAVING_DATE);
    }

    @Test
    @Transactional
    public void createArtistBandStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = artistBandStatusRepository.findAll().size();

        // Create the ArtistBandStatus with an existing ID
        artistBandStatus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArtistBandStatusMockMvc.perform(post("/api/artist-band-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artistBandStatus)))
            .andExpect(status().isBadRequest());

        // Validate the ArtistBandStatus in the database
        List<ArtistBandStatus> artistBandStatusList = artistBandStatusRepository.findAll();
        assertThat(artistBandStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArtistBandStatuses() throws Exception {
        // Initialize the database
        artistBandStatusRepository.saveAndFlush(artistBandStatus);

        // Get all the artistBandStatusList
        restArtistBandStatusMockMvc.perform(get("/api/artist-band-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(artistBandStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].incorporationDate").value(hasItem(DEFAULT_INCORPORATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].leavingDate").value(hasItem(DEFAULT_LEAVING_DATE.toString())));
    }

    @Test
    @Transactional
    public void getArtistBandStatus() throws Exception {
        // Initialize the database
        artistBandStatusRepository.saveAndFlush(artistBandStatus);

        // Get the artistBandStatus
        restArtistBandStatusMockMvc.perform(get("/api/artist-band-statuses/{id}", artistBandStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(artistBandStatus.getId().intValue()))
            .andExpect(jsonPath("$.incorporationDate").value(DEFAULT_INCORPORATION_DATE.toString()))
            .andExpect(jsonPath("$.leavingDate").value(DEFAULT_LEAVING_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingArtistBandStatus() throws Exception {
        // Get the artistBandStatus
        restArtistBandStatusMockMvc.perform(get("/api/artist-band-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArtistBandStatus() throws Exception {
        // Initialize the database
        artistBandStatusRepository.saveAndFlush(artistBandStatus);
        int databaseSizeBeforeUpdate = artistBandStatusRepository.findAll().size();

        // Update the artistBandStatus
        ArtistBandStatus updatedArtistBandStatus = artistBandStatusRepository.findOne(artistBandStatus.getId());
        updatedArtistBandStatus
            .incorporationDate(UPDATED_INCORPORATION_DATE)
            .leavingDate(UPDATED_LEAVING_DATE);

        restArtistBandStatusMockMvc.perform(put("/api/artist-band-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArtistBandStatus)))
            .andExpect(status().isOk());

        // Validate the ArtistBandStatus in the database
        List<ArtistBandStatus> artistBandStatusList = artistBandStatusRepository.findAll();
        assertThat(artistBandStatusList).hasSize(databaseSizeBeforeUpdate);
        ArtistBandStatus testArtistBandStatus = artistBandStatusList.get(artistBandStatusList.size() - 1);
        assertThat(testArtistBandStatus.getIncorporationDate()).isEqualTo(UPDATED_INCORPORATION_DATE);
        assertThat(testArtistBandStatus.getLeavingDate()).isEqualTo(UPDATED_LEAVING_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingArtistBandStatus() throws Exception {
        int databaseSizeBeforeUpdate = artistBandStatusRepository.findAll().size();

        // Create the ArtistBandStatus

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restArtistBandStatusMockMvc.perform(put("/api/artist-band-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(artistBandStatus)))
            .andExpect(status().isCreated());

        // Validate the ArtistBandStatus in the database
        List<ArtistBandStatus> artistBandStatusList = artistBandStatusRepository.findAll();
        assertThat(artistBandStatusList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteArtistBandStatus() throws Exception {
        // Initialize the database
        artistBandStatusRepository.saveAndFlush(artistBandStatus);
        int databaseSizeBeforeDelete = artistBandStatusRepository.findAll().size();

        // Get the artistBandStatus
        restArtistBandStatusMockMvc.perform(delete("/api/artist-band-statuses/{id}", artistBandStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ArtistBandStatus> artistBandStatusList = artistBandStatusRepository.findAll();
        assertThat(artistBandStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArtistBandStatus.class);
        ArtistBandStatus artistBandStatus1 = new ArtistBandStatus();
        artistBandStatus1.setId(1L);
        ArtistBandStatus artistBandStatus2 = new ArtistBandStatus();
        artistBandStatus2.setId(artistBandStatus1.getId());
        assertThat(artistBandStatus1).isEqualTo(artistBandStatus2);
        artistBandStatus2.setId(2L);
        assertThat(artistBandStatus1).isNotEqualTo(artistBandStatus2);
        artistBandStatus1.setId(null);
        assertThat(artistBandStatus1).isNotEqualTo(artistBandStatus2);
    }
}
