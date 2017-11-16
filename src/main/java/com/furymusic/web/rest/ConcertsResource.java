package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.Concerts;

import com.furymusic.repository.ConcertsRepository;
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
 * REST controller for managing Concerts.
 */
@RestController
@RequestMapping("/api")
public class ConcertsResource {

    private final Logger log = LoggerFactory.getLogger(ConcertsResource.class);

    private static final String ENTITY_NAME = "concerts";

    private final ConcertsRepository concertsRepository;

    public ConcertsResource(ConcertsRepository concertsRepository) {
        this.concertsRepository = concertsRepository;
    }

    /**
     * POST  /concerts : Create a new concerts.
     *
     * @param concerts the concerts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new concerts, or with status 400 (Bad Request) if the concerts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/concerts")
    @Timed
    public ResponseEntity<Concerts> createConcerts(@RequestBody Concerts concerts) throws URISyntaxException {
        log.debug("REST request to save Concerts : {}", concerts);
        if (concerts.getId() != null) {
            throw new BadRequestAlertException("A new concerts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Concerts result = concertsRepository.save(concerts);
        return ResponseEntity.created(new URI("/api/concerts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /concerts : Updates an existing concerts.
     *
     * @param concerts the concerts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated concerts,
     * or with status 400 (Bad Request) if the concerts is not valid,
     * or with status 500 (Internal Server Error) if the concerts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/concerts")
    @Timed
    public ResponseEntity<Concerts> updateConcerts(@RequestBody Concerts concerts) throws URISyntaxException {
        log.debug("REST request to update Concerts : {}", concerts);
        if (concerts.getId() == null) {
            return createConcerts(concerts);
        }
        Concerts result = concertsRepository.save(concerts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, concerts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /concerts : get all the concerts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of concerts in body
     */
    @GetMapping("/concerts")
    @Timed
    public List<Concerts> getAllConcerts() {
        log.debug("REST request to get all Concerts");
        return concertsRepository.findAll();
        }

    /**
     * GET  /concerts/:id : get the "id" concerts.
     *
     * @param id the id of the concerts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the concerts, or with status 404 (Not Found)
     */
    @GetMapping("/concerts/{id}")
    @Timed
    public ResponseEntity<Concerts> getConcerts(@PathVariable Long id) {
        log.debug("REST request to get Concerts : {}", id);
        Concerts concerts = concertsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(concerts));
    }

    /**
     * DELETE  /concerts/:id : delete the "id" concerts.
     *
     * @param id the id of the concerts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/concerts/{id}")
    @Timed
    public ResponseEntity<Void> deleteConcerts(@PathVariable Long id) {
        log.debug("REST request to delete Concerts : {}", id);
        concertsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
