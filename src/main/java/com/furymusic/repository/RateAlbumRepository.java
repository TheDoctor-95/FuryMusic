package com.furymusic.repository;

import com.furymusic.domain.RateAlbum;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the RateAlbum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RateAlbumRepository extends JpaRepository<RateAlbum, Long> {

    @Query("select rate_album from RateAlbum rate_album where rate_album.user.login = ?#{principal.username}")
    List<RateAlbum> findByUserIsCurrentUser();

}
