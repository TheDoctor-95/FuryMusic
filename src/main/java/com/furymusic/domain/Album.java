package com.furymusic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @ManyToOne
    private AlbumTypes albumType;

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FavouriteAlbum> favouriteAlbums = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RateAlbum> rateAlbums = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pending> pendings = new HashSet<>();

    @ManyToMany(mappedBy = "albums")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Song> songs = new HashSet<>();

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

    public Album name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public Album releaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
        return this;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public Album description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImg() {
        return img;
    }

    public Album img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Album imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public AlbumTypes getAlbumType() {
        return albumType;
    }

    public Album albumType(AlbumTypes albumTypes) {
        this.albumType = albumTypes;
        return this;
    }

    public void setAlbumType(AlbumTypes albumTypes) {
        this.albumType = albumTypes;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Album reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Album addReview(Review review) {
        this.reviews.add(review);
        review.setAlbum(this);
        return this;
    }

    public Album removeReview(Review review) {
        this.reviews.remove(review);
        review.setAlbum(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<FavouriteAlbum> getFavouriteAlbums() {
        return favouriteAlbums;
    }

    public Album favouriteAlbums(Set<FavouriteAlbum> favouriteAlbums) {
        this.favouriteAlbums = favouriteAlbums;
        return this;
    }

    public Album addFavouriteAlbum(FavouriteAlbum favouriteAlbum) {
        this.favouriteAlbums.add(favouriteAlbum);
        favouriteAlbum.setAlbum(this);
        return this;
    }

    public Album removeFavouriteAlbum(FavouriteAlbum favouriteAlbum) {
        this.favouriteAlbums.remove(favouriteAlbum);
        favouriteAlbum.setAlbum(null);
        return this;
    }

    public void setFavouriteAlbums(Set<FavouriteAlbum> favouriteAlbums) {
        this.favouriteAlbums = favouriteAlbums;
    }

    public Set<RateAlbum> getRateAlbums() {
        return rateAlbums;
    }

    public Album rateAlbums(Set<RateAlbum> rateAlbums) {
        this.rateAlbums = rateAlbums;
        return this;
    }

    public Album addRateAlbum(RateAlbum rateAlbum) {
        this.rateAlbums.add(rateAlbum);
        rateAlbum.setAlbum(this);
        return this;
    }

    public Album removeRateAlbum(RateAlbum rateAlbum) {
        this.rateAlbums.remove(rateAlbum);
        rateAlbum.setAlbum(null);
        return this;
    }

    public void setRateAlbums(Set<RateAlbum> rateAlbums) {
        this.rateAlbums = rateAlbums;
    }

    public Set<Pending> getPendings() {
        return pendings;
    }

    public Album pendings(Set<Pending> pendings) {
        this.pendings = pendings;
        return this;
    }

    public Album addPending(Pending pending) {
        this.pendings.add(pending);
        pending.setAlbum(this);
        return this;
    }

    public Album removePending(Pending pending) {
        this.pendings.remove(pending);
        pending.setAlbum(null);
        return this;
    }

    public void setPendings(Set<Pending> pendings) {
        this.pendings = pendings;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public Album songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public Album addSong(Song song) {
        this.songs.add(song);
        song.getAlbums().add(this);
        return this;
    }

    public Album removeSong(Song song) {
        this.songs.remove(song);
        song.getAlbums().remove(this);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
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
        Album album = (Album) o;
        if (album.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), album.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + imgContentType + "'" +
            "}";
    }
}
