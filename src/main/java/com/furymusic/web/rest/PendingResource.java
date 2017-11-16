package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.Pending;

import com.furymusic.repository.PendingRepository;
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
 * REST controller for managing Pending.
 */
@RestController
@RequestMapping("/api")
public class PendingResource {

    private final Logger log = LoggerFactory.getLogger(PendingResource.class);

    private static final String ENTITY_NAME = "pending";

    private final PendingRepository pendingRepository;

    public PendingResource(PendingRepository pendingRepository) {
        this.pendingRepository = pendingRepository;
    }

    /**
     * POST  /pendings : Create a new pending.
     *
     * @param pending the pending to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pending, or with status 400 (Bad Request) if the pending has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pendings")
    @Timed
    public ResponseEntity<Pending> createPending(@RequestBody Pending pending) throws URISyntaxException {
        log.debug("REST request to save Pending : {}", pending);
        if (pending.getId() != null) {
            throw new BadRequestAlertException("A new pending cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pending result = pendingRepository.save(pending);
        return ResponseEntity.created(new URI("/api/pendings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pendings : Updates an existing pending.
     *
     * @param pending the pending to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pending,
     * or with status 400 (Bad Request) if the pending is not valid,
     * or with status 500 (Internal Server Error) if the pending couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pendings")
    @Timed
    public ResponseEntity<Pending> updatePending(@RequestBody Pending pending) throws URISyntaxException {
        log.debug("REST request to update Pending : {}", pending);
        if (pending.getId() == null) {
            return createPending(pending);
        }
        Pending result = pendingRepository.save(pending);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pending.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pendings : get all the pendings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pendings in body
     */
    @GetMapping("/pendings")
    @Timed
    public List<Pending> getAllPendings() {
        log.debug("REST request to get all Pendings");
        return pendingRepository.findAll();
        }

    /**
     * GET  /pendings/:id : get the "id" pending.
     *
     * @param id the id of the pending to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pending, or with status 404 (Not Found)
     */
    @GetMapping("/pendings/{id}")
    @Timed
    public ResponseEntity<Pending> getPending(@PathVariable Long id) {
        log.debug("REST request to get Pending : {}", id);
        Pending pending = pendingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pending));
    }

    /**
     * DELETE  /pendings/:id : delete the "id" pending.
     *
     * @param id the id of the pending to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pendings/{id}")
    @Timed
    public ResponseEntity<Void> deletePending(@PathVariable Long id) {
        log.debug("REST request to delete Pending : {}", id);
        pendingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
