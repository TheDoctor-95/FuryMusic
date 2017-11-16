package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.FavouriteReview;

import com.furymusic.repository.FavouriteReviewRepository;
import com.furymusic.web.rest.errors.BadRequestAlertException;
import com.furymusic.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FavouriteReview.
 */
@RestController
@RequestMapping("/api")
public class FavouriteReviewResource {

    private final Logger log = LoggerFactory.getLogger(FavouriteReviewResource.class);

    private static final String ENTITY_NAME = "favouriteReview";

    private final FavouriteReviewRepository favouriteReviewRepository;

    public FavouriteReviewResource(FavouriteReviewRepository favouriteReviewRepository) {
        this.favouriteReviewRepository = favouriteReviewRepository;
    }

    /**
     * POST  /favourite-reviews : Create a new favouriteReview.
     *
     * @param favouriteReview the favouriteReview to create
     * @return the ResponseEntity with status 201 (Created) and with body the new favouriteReview, or with status 400 (Bad Request) if the favouriteReview has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/favourite-reviews")
    @Timed
    public ResponseEntity<FavouriteReview> createFavouriteReview(@RequestBody FavouriteReview favouriteReview) throws URISyntaxException {
        log.debug("REST request to save FavouriteReview : {}", favouriteReview);
        if (favouriteReview.getId() != null) {
            throw new BadRequestAlertException("A new favouriteReview cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FavouriteReview result = favouriteReviewRepository.save(favouriteReview);
        return ResponseEntity.created(new URI("/api/favourite-reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /favourite-reviews : Updates an existing favouriteReview.
     *
     * @param favouriteReview the favouriteReview to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated favouriteReview,
     * or with status 400 (Bad Request) if the favouriteReview is not valid,
     * or with status 500 (Internal Server Error) if the favouriteReview couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/favourite-reviews")
    @Timed
    public ResponseEntity<FavouriteReview> updateFavouriteReview(@RequestBody FavouriteReview favouriteReview) throws URISyntaxException {
        log.debug("REST request to update FavouriteReview : {}", favouriteReview);
        if (favouriteReview.getId() == null) {
            return createFavouriteReview(favouriteReview);
        }
        FavouriteReview result = favouriteReviewRepository.save(favouriteReview);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, favouriteReview.getId().toString()))
            .body(result);
    }

    /**
     * GET  /favourite-reviews : get all the favouriteReviews.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of favouriteReviews in body
     */
    @GetMapping("/favourite-reviews")
    @Timed
    public List<FavouriteReview> getAllFavouriteReviews() {
        log.debug("REST request to get all FavouriteReviews");
        return favouriteReviewRepository.findAll();
        }

    /**
     * GET  /favourite-reviews/:id : get the "id" favouriteReview.
     *
     * @param id the id of the favouriteReview to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the favouriteReview, or with status 404 (Not Found)
     */
    @GetMapping("/favourite-reviews/{id}")
    @Timed
    public ResponseEntity<FavouriteReview> getFavouriteReview(@PathVariable Long id) {
        log.debug("REST request to get FavouriteReview : {}", id);
        FavouriteReview favouriteReview = favouriteReviewRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(favouriteReview));
    }

    /**
     * DELETE  /favourite-reviews/:id : delete the "id" favouriteReview.
     *
     * @param id the id of the favouriteReview to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/favourite-reviews/{id}")
    @Timed
    public ResponseEntity<Void> deleteFavouriteReview(@PathVariable Long id) {
        log.debug("REST request to delete FavouriteReview : {}", id);
        favouriteReviewRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
