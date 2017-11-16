package com.furymusic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.furymusic.domain.FavouriteArtist;

import com.furymusic.repository.FavouriteArtistRepository;
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
 * REST controller for managing FavouriteArtist.
 */
@RestController
@RequestMapping("/api")
public class FavouriteArtistResource {

    private final Logger log = LoggerFactory.getLogger(FavouriteArtistResource.class);

    private static final String ENTITY_NAME = "favouriteArtist";

    private final FavouriteArtistRepository favouriteArtistRepository;

    public FavouriteArtistResource(FavouriteArtistRepository favouriteArtistRepository) {
        this.favouriteArtistRepository = favouriteArtistRepository;
    }

    /**
     * POST  /favourite-artists : Create a new favouriteArtist.
     *
     * @param favouriteArtist the favouriteArtist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new favouriteArtist, or with status 400 (Bad Request) if the favouriteArtist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/favourite-artists")
    @Timed
    public ResponseEntity<FavouriteArtist> createFavouriteArtist(@RequestBody FavouriteArtist favouriteArtist) throws URISyntaxException {
        log.debug("REST request to save FavouriteArtist : {}", favouriteArtist);
        if (favouriteArtist.getId() != null) {
            throw new BadRequestAlertException("A new favouriteArtist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FavouriteArtist result = favouriteArtistRepository.save(favouriteArtist);
        return ResponseEntity.created(new URI("/api/favourite-artists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /favourite-artists : Updates an existing favouriteArtist.
     *
     * @param favouriteArtist the favouriteArtist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated favouriteArtist,
     * or with status 400 (Bad Request) if the favouriteArtist is not valid,
     * or with status 500 (Internal Server Error) if the favouriteArtist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/favourite-artists")
    @Timed
    public ResponseEntity<FavouriteArtist> updateFavouriteArtist(@RequestBody FavouriteArtist favouriteArtist) throws URISyntaxException {
        log.debug("REST request to update FavouriteArtist : {}", favouriteArtist);
        if (favouriteArtist.getId() == null) {
            return createFavouriteArtist(favouriteArtist);
        }
        FavouriteArtist result = favouriteArtistRepository.save(favouriteArtist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, favouriteArtist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /favourite-artists : get all the favouriteArtists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of favouriteArtists in body
     */
    @GetMapping("/favourite-artists")
    @Timed
    public List<FavouriteArtist> getAllFavouriteArtists() {
        log.debug("REST request to get all FavouriteArtists");
        return favouriteArtistRepository.findAll();
        }

    /**
     * GET  /favourite-artists/:id : get the "id" favouriteArtist.
     *
     * @param id the id of the favouriteArtist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the favouriteArtist, or with status 404 (Not Found)
     */
    @GetMapping("/favourite-artists/{id}")
    @Timed
    public ResponseEntity<FavouriteArtist> getFavouriteArtist(@PathVariable Long id) {
        log.debug("REST request to get FavouriteArtist : {}", id);
        FavouriteArtist favouriteArtist = favouriteArtistRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(favouriteArtist));
    }

    /**
     * DELETE  /favourite-artists/:id : delete the "id" favouriteArtist.
     *
     * @param id the id of the favouriteArtist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/favourite-artists/{id}")
    @Timed
    public ResponseEntity<Void> deleteFavouriteArtist(@PathVariable Long id) {
        log.debug("REST request to delete FavouriteArtist : {}", id);
        favouriteArtistRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
