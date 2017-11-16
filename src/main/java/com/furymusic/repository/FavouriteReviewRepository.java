package com.furymusic.repository;

import com.furymusic.domain.FavouriteReview;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FavouriteReview entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavouriteReviewRepository extends JpaRepository<FavouriteReview, Long> {

    @Query("select favourite_review from FavouriteReview favourite_review where favourite_review.user.login = ?#{principal.username}")
    List<FavouriteReview> findByUserIsCurrentUser();

}
