package com.furymusic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AlbumTypes.
 */
@Entity
@Table(name = "album_types")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlbumTypes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @OneToMany(mappedBy = "albumType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Album> albums = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public AlbumTypes type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public AlbumTypes albums(Set<Album> albums) {
        this.albums = albums;
        return this;
    }

    public AlbumTypes addAlbum(Album album) {
        this.albums.add(album);
        album.setAlbumType(this);
        return this;
    }

    public AlbumTypes removeAlbum(Album album) {
        this.albums.remove(album);
        album.setAlbumType(null);
        return this;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
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
        AlbumTypes albumTypes = (AlbumTypes) o;
        if (albumTypes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), albumTypes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlbumTypes{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
