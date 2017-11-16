package com.furymusic.repository;

import com.furymusic.domain.AlbumTypes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AlbumTypes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlbumTypesRepository extends JpaRepository<AlbumTypes, Long> {

}
