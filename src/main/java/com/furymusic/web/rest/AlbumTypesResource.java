package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.AlbumTypes;

import com.furymusic.repository.AlbumTypesRepository;
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
 * REST controller for managing AlbumTypes.
 */
@RestController
@RequestMapping("/api")
public class AlbumTypesResource {

    private final Logger log = LoggerFactory.getLogger(AlbumTypesResource.class);

    private static final String ENTITY_NAME = "albumTypes";

    private final AlbumTypesRepository albumTypesRepository;

    public AlbumTypesResource(AlbumTypesRepository albumTypesRepository) {
        this.albumTypesRepository = albumTypesRepository;
    }

    /**
     * POST  /album-types : Create a new albumTypes.
     *
     * @param albumTypes the albumTypes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new albumTypes, or with status 400 (Bad Request) if the albumTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/album-types")
    @Timed
    public ResponseEntity<AlbumTypes> createAlbumTypes(@RequestBody AlbumTypes albumTypes) throws URISyntaxException {
        log.debug("REST request to save AlbumTypes : {}", albumTypes);
        if (albumTypes.getId() != null) {
            throw new BadRequestAlertException("A new albumTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlbumTypes result = albumTypesRepository.save(albumTypes);
        return ResponseEntity.created(new URI("/api/album-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /album-types : Updates an existing albumTypes.
     *
     * @param albumTypes the albumTypes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated albumTypes,
     * or with status 400 (Bad Request) if the albumTypes is not valid,
     * or with status 500 (Internal Server Error) if the albumTypes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/album-types")
    @Timed
    public ResponseEntity<AlbumTypes> updateAlbumTypes(@RequestBody AlbumTypes albumTypes) throws URISyntaxException {
        log.debug("REST request to update AlbumTypes : {}", albumTypes);
        if (albumTypes.getId() == null) {
            return createAlbumTypes(albumTypes);
        }
        AlbumTypes result = albumTypesRepository.save(albumTypes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, albumTypes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /album-types : get all the albumTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of albumTypes in body
     */
    @GetMapping("/album-types")
    @Timed
    public List<AlbumTypes> getAllAlbumTypes() {
        log.debug("REST request to get all AlbumTypes");
        return albumTypesRepository.findAll();
        }

    /**
     * GET  /album-types/:id : get the "id" albumTypes.
     *
     * @param id the id of the albumTypes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the albumTypes, or with status 404 (Not Found)
     */
    @GetMapping("/album-types/{id}")
    @Timed
    public ResponseEntity<AlbumTypes> getAlbumTypes(@PathVariable Long id) {
        log.debug("REST request to get AlbumTypes : {}", id);
        AlbumTypes albumTypes = albumTypesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(albumTypes));
    }

    /**
     * DELETE  /album-types/:id : delete the "id" albumTypes.
     *
     * @param id the id of the albumTypes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/album-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlbumTypes(@PathVariable Long id) {
        log.debug("REST request to delete AlbumTypes : {}", id);
        albumTypesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
