package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.ArtistBandStatus;

import com.furymusic.repository.ArtistBandStatusRepository;
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
 * REST controller for managing ArtistBandStatus.
 */
@RestController
@RequestMapping("/api")
public class ArtistBandStatusResource {

    private final Logger log = LoggerFactory.getLogger(ArtistBandStatusResource.class);

    private static final String ENTITY_NAME = "artistBandStatus";

    private final ArtistBandStatusRepository artistBandStatusRepository;

    public ArtistBandStatusResource(ArtistBandStatusRepository artistBandStatusRepository) {
        this.artistBandStatusRepository = artistBandStatusRepository;
    }

    /**
     * POST  /artist-band-statuses : Create a new artistBandStatus.
     *
     * @param artistBandStatus the artistBandStatus to create
     * @return the ResponseEntity with status 201 (Created) and with body the new artistBandStatus, or with status 400 (Bad Request) if the artistBandStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/artist-band-statuses")
    @Timed
    public ResponseEntity<ArtistBandStatus> createArtistBandStatus(@RequestBody ArtistBandStatus artistBandStatus) throws URISyntaxException {
        log.debug("REST request to save ArtistBandStatus : {}", artistBandStatus);
        if (artistBandStatus.getId() != null) {
            throw new BadRequestAlertException("A new artistBandStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArtistBandStatus result = artistBandStatusRepository.save(artistBandStatus);
        return ResponseEntity.created(new URI("/api/artist-band-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /artist-band-statuses : Updates an existing artistBandStatus.
     *
     * @param artistBandStatus the artistBandStatus to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated artistBandStatus,
     * or with status 400 (Bad Request) if the artistBandStatus is not valid,
     * or with status 500 (Internal Server Error) if the artistBandStatus couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/artist-band-statuses")
    @Timed
    public ResponseEntity<ArtistBandStatus> updateArtistBandStatus(@RequestBody ArtistBandStatus artistBandStatus) throws URISyntaxException {
        log.debug("REST request to update ArtistBandStatus : {}", artistBandStatus);
        if (artistBandStatus.getId() == null) {
            return createArtistBandStatus(artistBandStatus);
        }
        ArtistBandStatus result = artistBandStatusRepository.save(artistBandStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, artistBandStatus.getId().toString()))
            .body(result);
    }

    /**
     * GET  /artist-band-statuses : get all the artistBandStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of artistBandStatuses in body
     */
    @GetMapping("/artist-band-statuses")
    @Timed
    public List<ArtistBandStatus> getAllArtistBandStatuses() {
        log.debug("REST request to get all ArtistBandStatuses");
        return artistBandStatusRepository.findAll();
        }

    /**
     * GET  /artist-band-statuses/:id : get the "id" artistBandStatus.
     *
     * @param id the id of the artistBandStatus to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the artistBandStatus, or with status 404 (Not Found)
     */
    @GetMapping("/artist-band-statuses/{id}")
    @Timed
    public ResponseEntity<ArtistBandStatus> getArtistBandStatus(@PathVariable Long id) {
        log.debug("REST request to get ArtistBandStatus : {}", id);
        ArtistBandStatus artistBandStatus = artistBandStatusRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(artistBandStatus));
    }

    /**
     * DELETE  /artist-band-statuses/:id : delete the "id" artistBandStatus.
     *
     * @param id the id of the artistBandStatus to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/artist-band-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteArtistBandStatus(@PathVariable Long id) {
        log.debug("REST request to delete ArtistBandStatus : {}", id);
        artistBandStatusRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
