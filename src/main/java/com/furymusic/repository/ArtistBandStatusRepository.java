package com.furymusic.repository;

import com.furymusic.domain.ArtistBandStatus;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ArtistBandStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtistBandStatusRepository extends JpaRepository<ArtistBandStatus, Long> {

}
