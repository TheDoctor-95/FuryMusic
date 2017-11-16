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
 * A Song.
 */
@Entity
@Table(name = "song")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "duration")
    private Double duration;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "song_album",
               joinColumns = @JoinColumn(name="songs_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="albums_id", referencedColumnName="id"))
    private Set<Album> albums = new HashSet<>();

    @OneToMany(mappedBy = "song")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FavouriteSong> favouriteSongs = new HashSet<>();

    @ManyToMany(mappedBy = "songs")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Collection> collections = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Song name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getDuration() {
        return duration;
    }

    public Song duration(Double duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Set<Album> getAlbums() {
        return albums;
    }

    public Song albums(Set<Album> albums) {
        this.albums = albums;
        return this;
    }

    public Song addAlbum(Album album) {
        this.albums.add(album);
        album.getSongs().add(this);
        return this;
    }

    public Song removeAlbum(Album album) {
        this.albums.remove(album);
        album.getSongs().remove(this);
        return this;
    }

    public void setAlbums(Set<Album> albums) {
        this.albums = albums;
    }

    public Set<FavouriteSong> getFavouriteSongs() {
        return favouriteSongs;
    }

    public Song favouriteSongs(Set<FavouriteSong> favouriteSongs) {
        this.favouriteSongs = favouriteSongs;
        return this;
    }

    public Song addFavouriteSong(FavouriteSong favouriteSong) {
        this.favouriteSongs.add(favouriteSong);
        favouriteSong.setSong(this);
        return this;
    }

    public Song removeFavouriteSong(FavouriteSong favouriteSong) {
        this.favouriteSongs.remove(favouriteSong);
        favouriteSong.setSong(null);
        return this;
    }

    public void setFavouriteSongs(Set<FavouriteSong> favouriteSongs) {
        this.favouriteSongs = favouriteSongs;
    }

    public Set<Collection> getCollections() {
        return collections;
    }

    public Song collections(Set<Collection> collections) {
        this.collections = collections;
        return this;
    }

    public Song addCollection(Collection collection) {
        this.collections.add(collection);
        collection.getSongs().add(this);
        return this;
    }

    public Song removeCollection(Collection collection) {
        this.collections.remove(collection);
        collection.getSongs().remove(this);
        return this;
    }

    public void setCollections(Set<Collection> collections) {
        this.collections = collections;
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
        Song song = (Song) o;
        if (song.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), song.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", duration='" + getDuration() + "'" +
            "}";
    }
}
