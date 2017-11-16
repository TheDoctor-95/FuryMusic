package com.furymusic.repository;

import com.furymusic.domain.FavouriteAlbum;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FavouriteAlbum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavouriteAlbumRepository extends JpaRepository<FavouriteAlbum, Long> {

    @Query("select favourite_album from FavouriteAlbum favourite_album where favourite_album.user.login = ?#{principal.username}")
    List<FavouriteAlbum> findByUserIsCurrentUser();

}
