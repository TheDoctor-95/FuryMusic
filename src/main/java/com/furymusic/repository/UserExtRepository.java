package com.furymusic.repository;

import com.furymusic.domain.UserExt;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserExt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtRepository extends JpaRepository<UserExt, Long> {

}
