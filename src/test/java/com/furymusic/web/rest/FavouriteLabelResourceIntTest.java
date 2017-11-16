package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.FavouriteLabel;
import com.furymusic.repository.FavouriteLabelRepository;
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
 * Test class for the FavouriteLabelResource REST controller.
 *
 * @see FavouriteLabelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class FavouriteLabelResourceIntTest {

    private static final Boolean DEFAULT_LIKED = false;
    private static final Boolean UPDATED_LIKED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private FavouriteLabelRepository favouriteLabelRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFavouriteLabelMockMvc;

    private FavouriteLabel favouriteLabel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FavouriteLabelResource favouriteLabelResource = new FavouriteLabelResource(favouriteLabelRepository);
        this.restFavouriteLabelMockMvc = MockMvcBuilders.standaloneSetup(favouriteLabelResource)
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
    public static FavouriteLabel createEntity(EntityManager em) {
        FavouriteLabel favouriteLabel = new FavouriteLabel()
            .liked(DEFAULT_LIKED)
            .date(DEFAULT_DATE);
        return favouriteLabel;
    }

    @Before
    public void initTest() {
        favouriteLabel = createEntity(em);
    }

    @Test
    @Transactional
    public void createFavouriteLabel() throws Exception {
        int databaseSizeBeforeCreate = favouriteLabelRepository.findAll().size();

        // Create the FavouriteLabel
        restFavouriteLabelMockMvc.perform(post("/api/favourite-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteLabel)))
            .andExpect(status().isCreated());

        // Validate the FavouriteLabel in the database
        List<FavouriteLabel> favouriteLabelList = favouriteLabelRepository.findAll();
        assertThat(favouriteLabelList).hasSize(databaseSizeBeforeCreate + 1);
        FavouriteLabel testFavouriteLabel = favouriteLabelList.get(favouriteLabelList.size() - 1);
        assertThat(testFavouriteLabel.isLiked()).isEqualTo(DEFAULT_LIKED);
        assertThat(testFavouriteLabel.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createFavouriteLabelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = favouriteLabelRepository.findAll().size();

        // Create the FavouriteLabel with an existing ID
        favouriteLabel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFavouriteLabelMockMvc.perform(post("/api/favourite-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteLabel)))
            .andExpect(status().isBadRequest());

        // Validate the FavouriteLabel in the database
        List<FavouriteLabel> favouriteLabelList = favouriteLabelRepository.findAll();
        assertThat(favouriteLabelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFavouriteLabels() throws Exception {
        // Initialize the database
        favouriteLabelRepository.saveAndFlush(favouriteLabel);

        // Get all the favouriteLabelList
        restFavouriteLabelMockMvc.perform(get("/api/favourite-labels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favouriteLabel.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getFavouriteLabel() throws Exception {
        // Initialize the database
        favouriteLabelRepository.saveAndFlush(favouriteLabel);

        // Get the favouriteLabel
        restFavouriteLabelMockMvc.perform(get("/api/favourite-labels/{id}", favouriteLabel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(favouriteLabel.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingFavouriteLabel() throws Exception {
        // Get the favouriteLabel
        restFavouriteLabelMockMvc.perform(get("/api/favourite-labels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFavouriteLabel() throws Exception {
        // Initialize the database
        favouriteLabelRepository.saveAndFlush(favouriteLabel);
        int databaseSizeBeforeUpdate = favouriteLabelRepository.findAll().size();

        // Update the favouriteLabel
        FavouriteLabel updatedFavouriteLabel = favouriteLabelRepository.findOne(favouriteLabel.getId());
        updatedFavouriteLabel
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);

        restFavouriteLabelMockMvc.perform(put("/api/favourite-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFavouriteLabel)))
            .andExpect(status().isOk());

        // Validate the FavouriteLabel in the database
        List<FavouriteLabel> favouriteLabelList = favouriteLabelRepository.findAll();
        assertThat(favouriteLabelList).hasSize(databaseSizeBeforeUpdate);
        FavouriteLabel testFavouriteLabel = favouriteLabelList.get(favouriteLabelList.size() - 1);
        assertThat(testFavouriteLabel.isLiked()).isEqualTo(UPDATED_LIKED);
        assertThat(testFavouriteLabel.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFavouriteLabel() throws Exception {
        int databaseSizeBeforeUpdate = favouriteLabelRepository.findAll().size();

        // Create the FavouriteLabel

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFavouriteLabelMockMvc.perform(put("/api/favourite-labels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteLabel)))
            .andExpect(status().isCreated());

        // Validate the FavouriteLabel in the database
        List<FavouriteLabel> favouriteLabelList = favouriteLabelRepository.findAll();
        assertThat(favouriteLabelList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFavouriteLabel() throws Exception {
        // Initialize the database
        favouriteLabelRepository.saveAndFlush(favouriteLabel);
        int databaseSizeBeforeDelete = favouriteLabelRepository.findAll().size();

        // Get the favouriteLabel
        restFavouriteLabelMockMvc.perform(delete("/api/favourite-labels/{id}", favouriteLabel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FavouriteLabel> favouriteLabelList = favouriteLabelRepository.findAll();
        assertThat(favouriteLabelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FavouriteLabel.class);
        FavouriteLabel favouriteLabel1 = new FavouriteLabel();
        favouriteLabel1.setId(1L);
        FavouriteLabel favouriteLabel2 = new FavouriteLabel();
        favouriteLabel2.setId(favouriteLabel1.getId());
        assertThat(favouriteLabel1).isEqualTo(favouriteLabel2);
        favouriteLabel2.setId(2L);
        assertThat(favouriteLabel1).isNotEqualTo(favouriteLabel2);
        favouriteLabel1.setId(null);
        assertThat(favouriteLabel1).isNotEqualTo(favouriteLabel2);
    }
}
