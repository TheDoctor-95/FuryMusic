package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.Collection;
import com.furymusic.repository.CollectionRepository;
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
 * Test class for the CollectionResource REST controller.
 *
 * @see CollectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class CollectionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCollectionMockMvc;

    private Collection collection;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CollectionResource collectionResource = new CollectionResource(collectionRepository);
        this.restCollectionMockMvc = MockMvcBuilders.standaloneSetup(collectionResource)
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
    public static Collection createEntity(EntityManager em) {
        Collection collection = new Collection()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return collection;
    }

    @Before
    public void initTest() {
        collection = createEntity(em);
    }

    @Test
    @Transactional
    public void createCollection() throws Exception {
        int databaseSizeBeforeCreate = collectionRepository.findAll().size();

        // Create the Collection
        restCollectionMockMvc.perform(post("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collection)))
            .andExpect(status().isCreated());

        // Validate the Collection in the database
        List<Collection> collectionList = collectionRepository.findAll();
        assertThat(collectionList).hasSize(databaseSizeBeforeCreate + 1);
        Collection testCollection = collectionList.get(collectionList.size() - 1);
        assertThat(testCollection.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCollection.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createCollectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = collectionRepository.findAll().size();

        // Create the Collection with an existing ID
        collection.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCollectionMockMvc.perform(post("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collection)))
            .andExpect(status().isBadRequest());

        // Validate the Collection in the database
        List<Collection> collectionList = collectionRepository.findAll();
        assertThat(collectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCollections() throws Exception {
        // Initialize the database
        collectionRepository.saveAndFlush(collection);

        // Get all the collectionList
        restCollectionMockMvc.perform(get("/api/collections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(collection.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getCollection() throws Exception {
        // Initialize the database
        collectionRepository.saveAndFlush(collection);

        // Get the collection
        restCollectionMockMvc.perform(get("/api/collections/{id}", collection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(collection.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCollection() throws Exception {
        // Get the collection
        restCollectionMockMvc.perform(get("/api/collections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCollection() throws Exception {
        // Initialize the database
        collectionRepository.saveAndFlush(collection);
        int databaseSizeBeforeUpdate = collectionRepository.findAll().size();

        // Update the collection
        Collection updatedCollection = collectionRepository.findOne(collection.getId());
        updatedCollection
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restCollectionMockMvc.perform(put("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCollection)))
            .andExpect(status().isOk());

        // Validate the Collection in the database
        List<Collection> collectionList = collectionRepository.findAll();
        assertThat(collectionList).hasSize(databaseSizeBeforeUpdate);
        Collection testCollection = collectionList.get(collectionList.size() - 1);
        assertThat(testCollection.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCollection.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCollection() throws Exception {
        int databaseSizeBeforeUpdate = collectionRepository.findAll().size();

        // Create the Collection

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCollectionMockMvc.perform(put("/api/collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(collection)))
            .andExpect(status().isCreated());

        // Validate the Collection in the database
        List<Collection> collectionList = collectionRepository.findAll();
        assertThat(collectionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCollection() throws Exception {
        // Initialize the database
        collectionRepository.saveAndFlush(collection);
        int databaseSizeBeforeDelete = collectionRepository.findAll().size();

        // Get the collection
        restCollectionMockMvc.perform(delete("/api/collections/{id}", collection.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Collection> collectionList = collectionRepository.findAll();
        assertThat(collectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Collection.class);
        Collection collection1 = new Collection();
        collection1.setId(1L);
        Collection collection2 = new Collection();
        collection2.setId(collection1.getId());
        assertThat(collection1).isEqualTo(collection2);
        collection2.setId(2L);
        assertThat(collection1).isNotEqualTo(collection2);
        collection1.setId(null);
        assertThat(collection1).isNotEqualTo(collection2);
    }
}
