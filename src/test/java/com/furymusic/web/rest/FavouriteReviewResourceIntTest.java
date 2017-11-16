package com.furymusic.web.rest;

import com.furymusic.FuryMusicApp;

import com.furymusic.domain.FavouriteReview;
import com.furymusic.repository.FavouriteReviewRepository;
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
 * Test class for the FavouriteReviewResource REST controller.
 *
 * @see FavouriteReviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FuryMusicApp.class)
public class FavouriteReviewResourceIntTest {

    private static final Boolean DEFAULT_LIKED = false;
    private static final Boolean UPDATED_LIKED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private FavouriteReviewRepository favouriteReviewRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFavouriteReviewMockMvc;

    private FavouriteReview favouriteReview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FavouriteReviewResource favouriteReviewResource = new FavouriteReviewResource(favouriteReviewRepository);
        this.restFavouriteReviewMockMvc = MockMvcBuilders.standaloneSetup(favouriteReviewResource)
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
    public static FavouriteReview createEntity(EntityManager em) {
        FavouriteReview favouriteReview = new FavouriteReview()
            .liked(DEFAULT_LIKED)
            .date(DEFAULT_DATE);
        return favouriteReview;
    }

    @Before
    public void initTest() {
        favouriteReview = createEntity(em);
    }

    @Test
    @Transactional
    public void createFavouriteReview() throws Exception {
        int databaseSizeBeforeCreate = favouriteReviewRepository.findAll().size();

        // Create the FavouriteReview
        restFavouriteReviewMockMvc.perform(post("/api/favourite-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteReview)))
            .andExpect(status().isCreated());

        // Validate the FavouriteReview in the database
        List<FavouriteReview> favouriteReviewList = favouriteReviewRepository.findAll();
        assertThat(favouriteReviewList).hasSize(databaseSizeBeforeCreate + 1);
        FavouriteReview testFavouriteReview = favouriteReviewList.get(favouriteReviewList.size() - 1);
        assertThat(testFavouriteReview.isLiked()).isEqualTo(DEFAULT_LIKED);
        assertThat(testFavouriteReview.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createFavouriteReviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = favouriteReviewRepository.findAll().size();

        // Create the FavouriteReview with an existing ID
        favouriteReview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFavouriteReviewMockMvc.perform(post("/api/favourite-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteReview)))
            .andExpect(status().isBadRequest());

        // Validate the FavouriteReview in the database
        List<FavouriteReview> favouriteReviewList = favouriteReviewRepository.findAll();
        assertThat(favouriteReviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFavouriteReviews() throws Exception {
        // Initialize the database
        favouriteReviewRepository.saveAndFlush(favouriteReview);

        // Get all the favouriteReviewList
        restFavouriteReviewMockMvc.perform(get("/api/favourite-reviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(favouriteReview.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getFavouriteReview() throws Exception {
        // Initialize the database
        favouriteReviewRepository.saveAndFlush(favouriteReview);

        // Get the favouriteReview
        restFavouriteReviewMockMvc.perform(get("/api/favourite-reviews/{id}", favouriteReview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(favouriteReview.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingFavouriteReview() throws Exception {
        // Get the favouriteReview
        restFavouriteReviewMockMvc.perform(get("/api/favourite-reviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFavouriteReview() throws Exception {
        // Initialize the database
        favouriteReviewRepository.saveAndFlush(favouriteReview);
        int databaseSizeBeforeUpdate = favouriteReviewRepository.findAll().size();

        // Update the favouriteReview
        FavouriteReview updatedFavouriteReview = favouriteReviewRepository.findOne(favouriteReview.getId());
        updatedFavouriteReview
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);

        restFavouriteReviewMockMvc.perform(put("/api/favourite-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFavouriteReview)))
            .andExpect(status().isOk());

        // Validate the FavouriteReview in the database
        List<FavouriteReview> favouriteReviewList = favouriteReviewRepository.findAll();
        assertThat(favouriteReviewList).hasSize(databaseSizeBeforeUpdate);
        FavouriteReview testFavouriteReview = favouriteReviewList.get(favouriteReviewList.size() - 1);
        assertThat(testFavouriteReview.isLiked()).isEqualTo(UPDATED_LIKED);
        assertThat(testFavouriteReview.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFavouriteReview() throws Exception {
        int databaseSizeBeforeUpdate = favouriteReviewRepository.findAll().size();

        // Create the FavouriteReview

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFavouriteReviewMockMvc.perform(put("/api/favourite-reviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(favouriteReview)))
            .andExpect(status().isCreated());

        // Validate the FavouriteReview in the database
        List<FavouriteReview> favouriteReviewList = favouriteReviewRepository.findAll();
        assertThat(favouriteReviewList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFavouriteReview() throws Exception {
        // Initialize the database
        favouriteReviewRepository.saveAndFlush(favouriteReview);
        int databaseSizeBeforeDelete = favouriteReviewRepository.findAll().size();

        // Get the favouriteReview
        restFavouriteReviewMockMvc.perform(delete("/api/favourite-reviews/{id}", favouriteReview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FavouriteReview> favouriteReviewList = favouriteReviewRepository.findAll();
        assertThat(favouriteReviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FavouriteReview.class);
        FavouriteReview favouriteReview1 = new FavouriteReview();
        favouriteReview1.setId(1L);
        FavouriteReview favouriteReview2 = new FavouriteReview();
        favouriteReview2.setId(favouriteReview1.getId());
        assertThat(favouriteReview1).isEqualTo(favouriteReview2);
        favouriteReview2.setId(2L);
        assertThat(favouriteReview1).isNotEqualTo(favouriteReview2);
        favouriteReview1.setId(null);
        assertThat(favouriteReview1).isNotEqualTo(favouriteReview2);
    }
}
