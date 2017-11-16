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
 * A Band.
 */
@Entity
@Table(name = "band")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Band implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "active")
    private Boolean active;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @ManyToOne
    private Country country;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "band_genre",
               joinColumns = @JoinColumn(name="bands_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="genres_id", referencedColumnName="id"))
    private Set<Genre> genres = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FavouriteBand> favoriteBands = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Hatred> hatreds = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Concerts> concerts = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Social> socials = new HashSet<>();

    @OneToMany(mappedBy = "band")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ArtistBandStatus> artistBandStatuses = new HashSet<>();

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

    public Band name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Band creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean isActive() {
        return active;
    }

    public Band active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public byte[] getImg() {
        return img;
    }

    public Band img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Band imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Country getCountry() {
        return country;
    }

    public Band country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public Band genres(Set<Genre> genres) {
        this.genres = genres;
        return this;
    }

    public Band addGenre(Genre genre) {
        this.genres.add(genre);
        genre.getBands().add(this);
        return this;
    }

    public Band removeGenre(Genre genre) {
        this.genres.remove(genre);
        genre.getBands().remove(this);
        return this;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public Set<FavouriteBand> getFavoriteBands() {
        return favoriteBands;
    }

    public Band favoriteBands(Set<FavouriteBand> favouriteBands) {
        this.favoriteBands = favouriteBands;
        return this;
    }

    public Band addFavoriteBand(FavouriteBand favouriteBand) {
        this.favoriteBands.add(favouriteBand);
        favouriteBand.setBand(this);
        return this;
    }

    public Band removeFavoriteBand(FavouriteBand favouriteBand) {
        this.favoriteBands.remove(favouriteBand);
        favouriteBand.setBand(null);
        return this;
    }

    public void setFavoriteBands(Set<FavouriteBand> favouriteBands) {
        this.favoriteBands = favouriteBands;
    }

    public Set<Hatred> getHatreds() {
        return hatreds;
    }

    public Band hatreds(Set<Hatred> hatreds) {
        this.hatreds = hatreds;
        return this;
    }

    public Band addHatred(Hatred hatred) {
        this.hatreds.add(hatred);
        hatred.setBand(this);
        return this;
    }

    public Band removeHatred(Hatred hatred) {
        this.hatreds.remove(hatred);
        hatred.setBand(null);
        return this;
    }

    public void setHatreds(Set<Hatred> hatreds) {
        this.hatreds = hatreds;
    }

    public Set<Concerts> getConcerts() {
        return concerts;
    }

    public Band concerts(Set<Concerts> concerts) {
        this.concerts = concerts;
        return this;
    }

    public Band addConcerts(Concerts concerts) {
        this.concerts.add(concerts);
        concerts.setBand(this);
        return this;
    }

    public Band removeConcerts(Concerts concerts) {
        this.concerts.remove(concerts);
        concerts.setBand(null);
        return this;
    }

    public void setConcerts(Set<Concerts> concerts) {
        this.concerts = concerts;
    }

    public Set<Social> getSocials() {
        return socials;
    }

    public Band socials(Set<Social> socials) {
        this.socials = socials;
        return this;
    }

    public Band addSocial(Social social) {
        this.socials.add(social);
        social.setBand(this);
        return this;
    }

    public Band removeSocial(Social social) {
        this.socials.remove(social);
        social.setBand(null);
        return this;
    }

    public void setSocials(Set<Social> socials) {
        this.socials = socials;
    }

    public Set<ArtistBandStatus> getArtistBandStatuses() {
        return artistBandStatuses;
    }

    public Band artistBandStatuses(Set<ArtistBandStatus> artistBandStatuses) {
        this.artistBandStatuses = artistBandStatuses;
        return this;
    }

    public Band addArtistBandStatus(ArtistBandStatus artistBandStatus) {
        this.artistBandStatuses.add(artistBandStatus);
        artistBandStatus.setBand(this);
        return this;
    }

    public Band removeArtistBandStatus(ArtistBandStatus artistBandStatus) {
        this.artistBandStatuses.remove(artistBandStatus);
        artistBandStatus.setBand(null);
        return this;
    }

    public void setArtistBandStatuses(Set<ArtistBandStatus> artistBandStatuses) {
        this.artistBandStatuses = artistBandStatuses;
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
        Band band = (Band) o;
        if (band.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), band.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Band{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", active='" + isActive() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + imgContentType + "'" +
            "}";
    }
}
