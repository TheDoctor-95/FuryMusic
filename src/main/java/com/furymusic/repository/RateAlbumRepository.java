package com.furymusic.repository;

import com.furymusic.domain.Album;
import com.furymusic.domain.RateAlbum;
import com.furymusic.service.dto.AlbumRateStats;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the RateAlbum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RateAlbumRepository extends JpaRepository<RateAlbum, Long> {

    @Query("select rate_album from RateAlbum rate_album where rate_album.user.login = ?#{principal.username}")
    List<RateAlbum> findByUserIsCurrentUser();


    @Query("select new org.furymusic.service.dto.AlbumRateStats(rateAlbum.album, avg(rateAlbum.rate), max(rateAlbum.rate), min(rateAlbum.rate)) " +
        "from RateAlbum rateAlbum where rateAlbum.album.id = :albumId")
    AlbumRateStats findAlbumStats(@Param("albumId") Long id);

    //@Query("select rateAlbum from RateAlbum where rateAlbum.user.login = :userLogin and rateAlbum.album = :album")
    Optional<RateAlbum> findByAlbumAndUserLogin(Album album, String login);


}
