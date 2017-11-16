package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.AlbumTypes;
import com.furymusic.repository.AlbumTypesRepository;
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
import java.util.List;

import static com.furymusic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AlbumTypesResource REST controller.
 *
 * @see AlbumTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class AlbumTypesResourceIntTest {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private AlbumTypesRepository albumTypesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAlbumTypesMockMvc;

    private AlbumTypes albumTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AlbumTypesResource albumTypesResource = new AlbumTypesResource(albumTypesRepository);
        this.restAlbumTypesMockMvc = MockMvcBuilders.standaloneSetup(albumTypesResource)
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
    public static AlbumTypes createEntity(EntityManager em) {
        AlbumTypes albumTypes = new AlbumTypes()
            .type(DEFAULT_TYPE);
        return albumTypes;
    }

    @Before
    public void initTest() {
        albumTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAlbumTypes() throws Exception {
        int databaseSizeBeforeCreate = albumTypesRepository.findAll().size();

        // Create the AlbumTypes
        restAlbumTypesMockMvc.perform(post("/api/album-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(albumTypes)))
            .andExpect(status().isCreated());

        // Validate the AlbumTypes in the database
        List<AlbumTypes> albumTypesList = albumTypesRepository.findAll();
        assertThat(albumTypesList).hasSize(databaseSizeBeforeCreate + 1);
        AlbumTypes testAlbumTypes = albumTypesList.get(albumTypesList.size() - 1);
        assertThat(testAlbumTypes.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createAlbumTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = albumTypesRepository.findAll().size();

        // Create the AlbumTypes with an existing ID
        albumTypes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlbumTypesMockMvc.perform(post("/api/album-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(albumTypes)))
            .andExpect(status().isBadRequest());

        // Validate the AlbumTypes in the database
        List<AlbumTypes> albumTypesList = albumTypesRepository.findAll();
        assertThat(albumTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAlbumTypes() throws Exception {
        // Initialize the database
        albumTypesRepository.saveAndFlush(albumTypes);

        // Get all the albumTypesList
        restAlbumTypesMockMvc.perform(get("/api/album-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(albumTypes.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getAlbumTypes() throws Exception {
        // Initialize the database
        albumTypesRepository.saveAndFlush(albumTypes);

        // Get the albumTypes
        restAlbumTypesMockMvc.perform(get("/api/album-types/{id}", albumTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(albumTypes.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAlbumTypes() throws Exception {
        // Get the albumTypes
        restAlbumTypesMockMvc.perform(get("/api/album-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAlbumTypes() throws Exception {
        // Initialize the database
        albumTypesRepository.saveAndFlush(albumTypes);
        int databaseSizeBeforeUpdate = albumTypesRepository.findAll().size();

        // Update the albumTypes
        AlbumTypes updatedAlbumTypes = albumTypesRepository.findOne(albumTypes.getId());
        updatedAlbumTypes
            .type(UPDATED_TYPE);

        restAlbumTypesMockMvc.perform(put("/api/album-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAlbumTypes)))
            .andExpect(status().isOk());

        // Validate the AlbumTypes in the database
        List<AlbumTypes> albumTypesList = albumTypesRepository.findAll();
        assertThat(albumTypesList).hasSize(databaseSizeBeforeUpdate);
        AlbumTypes testAlbumTypes = albumTypesList.get(albumTypesList.size() - 1);
        assertThat(testAlbumTypes.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAlbumTypes() throws Exception {
        int databaseSizeBeforeUpdate = albumTypesRepository.findAll().size();

        // Create the AlbumTypes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAlbumTypesMockMvc.perform(put("/api/album-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(albumTypes)))
            .andExpect(status().isCreated());

        // Validate the AlbumTypes in the database
        List<AlbumTypes> albumTypesList = albumTypesRepository.findAll();
        assertThat(albumTypesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAlbumTypes() throws Exception {
        // Initialize the database
        albumTypesRepository.saveAndFlush(albumTypes);
        int databaseSizeBeforeDelete = albumTypesRepository.findAll().size();

        // Get the albumTypes
        restAlbumTypesMockMvc.perform(delete("/api/album-types/{id}", albumTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AlbumTypes> albumTypesList = albumTypesRepository.findAll();
        assertThat(albumTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AlbumTypes.class);
        AlbumTypes albumTypes1 = new AlbumTypes();
        albumTypes1.setId(1L);
        AlbumTypes albumTypes2 = new AlbumTypes();
        albumTypes2.setId(albumTypes1.getId());
        assertThat(albumTypes1).isEqualTo(albumTypes2);
        albumTypes2.setId(2L);
        assertThat(albumTypes1).isNotEqualTo(albumTypes2);
        albumTypes1.setId(null);
        assertThat(albumTypes1).isNotEqualTo(albumTypes2);
    }
}
