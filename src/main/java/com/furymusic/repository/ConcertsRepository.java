package com.furymusic.repository;

import com.furymusic.domain.Concerts;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Concerts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConcertsRepository extends JpaRepository<Concerts, Long> {

}
