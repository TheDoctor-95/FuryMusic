package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.FavouriteLabel;

import com.furymusic.repository.FavouriteLabelRepository;
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
 * REST controller for managing FavouriteLabel.
 */
@RestController
@RequestMapping("/api")
public class FavouriteLabelResource {

    private final Logger log = LoggerFactory.getLogger(FavouriteLabelResource.class);

    private static final String ENTITY_NAME = "favouriteLabel";

    private final FavouriteLabelRepository favouriteLabelRepository;

    public FavouriteLabelResource(FavouriteLabelRepository favouriteLabelRepository) {
        this.favouriteLabelRepository = favouriteLabelRepository;
    }

    /**
     * POST  /favourite-labels : Create a new favouriteLabel.
     *
     * @param favouriteLabel the favouriteLabel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new favouriteLabel, or with status 400 (Bad Request) if the favouriteLabel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/favourite-labels")
    @Timed
    public ResponseEntity<FavouriteLabel> createFavouriteLabel(@RequestBody FavouriteLabel favouriteLabel) throws URISyntaxException {
        log.debug("REST request to save FavouriteLabel : {}", favouriteLabel);
        if (favouriteLabel.getId() != null) {
            throw new BadRequestAlertException("A new favouriteLabel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FavouriteLabel result = favouriteLabelRepository.save(favouriteLabel);
        return ResponseEntity.created(new URI("/api/favourite-labels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /favourite-labels : Updates an existing favouriteLabel.
     *
     * @param favouriteLabel the favouriteLabel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated favouriteLabel,
     * or with status 400 (Bad Request) if the favouriteLabel is not valid,
     * or with status 500 (Internal Server Error) if the favouriteLabel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/favourite-labels")
    @Timed
    public ResponseEntity<FavouriteLabel> updateFavouriteLabel(@RequestBody FavouriteLabel favouriteLabel) throws URISyntaxException {
        log.debug("REST request to update FavouriteLabel : {}", favouriteLabel);
        if (favouriteLabel.getId() == null) {
            return createFavouriteLabel(favouriteLabel);
        }
        FavouriteLabel result = favouriteLabelRepository.save(favouriteLabel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, favouriteLabel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /favourite-labels : get all the favouriteLabels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of favouriteLabels in body
     */
    @GetMapping("/favourite-labels")
    @Timed
    public List<FavouriteLabel> getAllFavouriteLabels() {
        log.debug("REST request to get all FavouriteLabels");
        return favouriteLabelRepository.findAll();
        }

    /**
     * GET  /favourite-labels/:id : get the "id" favouriteLabel.
     *
     * @param id the id of the favouriteLabel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the favouriteLabel, or with status 404 (Not Found)
     */
    @GetMapping("/favourite-labels/{id}")
    @Timed
    public ResponseEntity<FavouriteLabel> getFavouriteLabel(@PathVariable Long id) {
        log.debug("REST request to get FavouriteLabel : {}", id);
        FavouriteLabel favouriteLabel = favouriteLabelRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(favouriteLabel));
    }

    /**
     * DELETE  /favourite-labels/:id : delete the "id" favouriteLabel.
     *
     * @param id the id of the favouriteLabel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/favourite-labels/{id}")
    @Timed
    public ResponseEntity<Void> deleteFavouriteLabel(@PathVariable Long id) {
        log.debug("REST request to delete FavouriteLabel : {}", id);
        favouriteLabelRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
