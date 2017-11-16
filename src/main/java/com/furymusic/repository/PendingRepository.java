package com.furymusic.repository;

import com.furymusic.domain.Pending;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Pending entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PendingRepository extends JpaRepository<Pending, Long> {

    @Query("select pending from Pending pending where pending.user.login = ?#{principal.username}")
    List<Pending> findByUserIsCurrentUser();

}
