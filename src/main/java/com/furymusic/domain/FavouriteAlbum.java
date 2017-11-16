package com.furymusic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A FavouriteAlbum.
 */
@Entity
@Table(name = "favourite_album")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FavouriteAlbum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "liked")
    private Boolean liked;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @ManyToOne
    private Album album;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isLiked() {
        return liked;
    }

    public FavouriteAlbum liked(Boolean liked) {
        this.liked = liked;
        return this;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public FavouriteAlbum date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Album getAlbum() {
        return album;
    }

    public FavouriteAlbum album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public User getUser() {
        return user;
    }

    public FavouriteAlbum user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        FavouriteAlbum favouriteAlbum = (FavouriteAlbum) o;
        if (favouriteAlbum.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), favouriteAlbum.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FavouriteAlbum{" +
            "id=" + getId() +
            ", liked='" + isLiked() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
