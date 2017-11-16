package com.furymusic.repository;

import com.furymusic.domain.FavouriteLabel;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FavouriteLabel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavouriteLabelRepository extends JpaRepository<FavouriteLabel, Long> {

    @Query("select favourite_label from FavouriteLabel favourite_label where favourite_label.user.login = ?#{principal.username}")
    List<FavouriteLabel> findByUserIsCurrentUser();

}
