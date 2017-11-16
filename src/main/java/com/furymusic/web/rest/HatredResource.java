package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.Hatred;

import com.furymusic.repository.HatredRepository;
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
 * REST controller for managing Hatred.
 */
@RestController
@RequestMapping("/api")
public class HatredResource {

    private final Logger log = LoggerFactory.getLogger(HatredResource.class);

    private static final String ENTITY_NAME = "hatred";

    private final HatredRepository hatredRepository;

    public HatredResource(HatredRepository hatredRepository) {
        this.hatredRepository = hatredRepository;
    }

    /**
     * POST  /hatreds : Create a new hatred.
     *
     * @param hatred the hatred to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hatred, or with status 400 (Bad Request) if the hatred has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hatreds")
    @Timed
    public ResponseEntity<Hatred> createHatred(@RequestBody Hatred hatred) throws URISyntaxException {
        log.debug("REST request to save Hatred : {}", hatred);
        if (hatred.getId() != null) {
            throw new BadRequestAlertException("A new hatred cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hatred result = hatredRepository.save(hatred);
        return ResponseEntity.created(new URI("/api/hatreds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hatreds : Updates an existing hatred.
     *
     * @param hatred the hatred to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hatred,
     * or with status 400 (Bad Request) if the hatred is not valid,
     * or with status 500 (Internal Server Error) if the hatred couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hatreds")
    @Timed
    public ResponseEntity<Hatred> updateHatred(@RequestBody Hatred hatred) throws URISyntaxException {
        log.debug("REST request to update Hatred : {}", hatred);
        if (hatred.getId() == null) {
            return createHatred(hatred);
        }
        Hatred result = hatredRepository.save(hatred);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hatred.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hatreds : get all the hatreds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hatreds in body
     */
    @GetMapping("/hatreds")
    @Timed
    public List<Hatred> getAllHatreds() {
        log.debug("REST request to get all Hatreds");
        return hatredRepository.findAll();
        }

    /**
     * GET  /hatreds/:id : get the "id" hatred.
     *
     * @param id the id of the hatred to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hatred, or with status 404 (Not Found)
     */
    @GetMapping("/hatreds/{id}")
    @Timed
    public ResponseEntity<Hatred> getHatred(@PathVariable Long id) {
        log.debug("REST request to get Hatred : {}", id);
        Hatred hatred = hatredRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hatred));
    }

    /**
     * DELETE  /hatreds/:id : delete the "id" hatred.
     *
     * @param id the id of the hatred to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hatreds/{id}")
    @Timed
    public ResponseEntity<Void> deleteHatred(@PathVariable Long id) {
        log.debug("REST request to delete Hatred : {}", id);
        hatredRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
