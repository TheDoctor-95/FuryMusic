package com.furymusic.repository;

import com.furymusic.domain.Collection;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Collection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

    @Query("select collection from Collection collection where collection.user.login = ?#{principal.username}")
    List<Collection> findByUserIsCurrentUser();
    @Query("select distinct collection from Collection collection left join fetch collection.songs")
    List<Collection> findAllWithEagerRelationships();

    @Query("select collection from Collection collection left join fetch collection.songs where collection.id =:id")
    Collection findOneWithEagerRelationships(@Param("id") Long id);

}
