package com.furymusic.repository;

import com.furymusic.domain.Hatred;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Hatred entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HatredRepository extends JpaRepository<Hatred, Long> {

    @Query("select hatred from Hatred hatred where hatred.user.login = ?#{principal.username}")
    List<Hatred> findByUserIsCurrentUser();

}
