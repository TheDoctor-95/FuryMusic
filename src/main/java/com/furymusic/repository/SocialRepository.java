package com.furymusic.repository;

import com.furymusic.domain.Social;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Social entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialRepository extends JpaRepository<Social, Long> {

    @Query("select social from Social social where social.user.login = ?#{principal.username}")
    List<Social> findByUserIsCurrentUser();

}
