package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.RateAlbum;

import com.furymusic.repository.RateAlbumRepository;
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
 * REST controller for managing RateAlbum.
 */
@RestController
@RequestMapping("/api")
public class RateAlbumResource {

    private final Logger log = LoggerFactory.getLogger(RateAlbumResource.class);

    private static final String ENTITY_NAME = "rateAlbum";

    private final RateAlbumRepository rateAlbumRepository;

    public RateAlbumResource(RateAlbumRepository rateAlbumRepository) {
        this.rateAlbumRepository = rateAlbumRepository;
    }

    /**
     * POST  /rate-albums : Create a new rateAlbum.
     *
     * @param rateAlbum the rateAlbum to create
     * @return the ResponseEntity with status 201 (Created) and with body the new rateAlbum, or with status 400 (Bad Request) if the rateAlbum has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rate-albums")
    @Timed
    public ResponseEntity<RateAlbum> createRateAlbum(@RequestBody RateAlbum rateAlbum) throws URISyntaxException {
        log.debug("REST request to save RateAlbum : {}", rateAlbum);
        if (rateAlbum.getId() != null) {
            throw new BadRequestAlertException("A new rateAlbum cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RateAlbum result = rateAlbumRepository.save(rateAlbum);
        return ResponseEntity.created(new URI("/api/rate-albums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rate-albums : Updates an existing rateAlbum.
     *
     * @param rateAlbum the rateAlbum to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated rateAlbum,
     * or with status 400 (Bad Request) if the rateAlbum is not valid,
     * or with status 500 (Internal Server Error) if the rateAlbum couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rate-albums")
    @Timed
    public ResponseEntity<RateAlbum> updateRateAlbum(@RequestBody RateAlbum rateAlbum) throws URISyntaxException {
        log.debug("REST request to update RateAlbum : {}", rateAlbum);
        if (rateAlbum.getId() == null) {
            return createRateAlbum(rateAlbum);
        }
        RateAlbum result = rateAlbumRepository.save(rateAlbum);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, rateAlbum.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rate-albums : get all the rateAlbums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rateAlbums in body
     */
    @GetMapping("/rate-albums")
    @Timed
    public List<RateAlbum> getAllRateAlbums() {
        log.debug("REST request to get all RateAlbums");
        return rateAlbumRepository.findAll();
        }

    /**
     * GET  /rate-albums/:id : get the "id" rateAlbum.
     *
     * @param id the id of the rateAlbum to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the rateAlbum, or with status 404 (Not Found)
     */
    @GetMapping("/rate-albums/{id}")
    @Timed
    public ResponseEntity<RateAlbum> getRateAlbum(@PathVariable Long id) {
        log.debug("REST request to get RateAlbum : {}", id);
        RateAlbum rateAlbum = rateAlbumRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(rateAlbum));
    }

    /**
     * DELETE  /rate-albums/:id : delete the "id" rateAlbum.
     *
     * @param id the id of the rateAlbum to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rate-albums/{id}")
    @Timed
    public ResponseEntity<Void> deleteRateAlbum(@PathVariable Long id) {
        log.debug("REST request to delete RateAlbum : {}", id);
        rateAlbumRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
