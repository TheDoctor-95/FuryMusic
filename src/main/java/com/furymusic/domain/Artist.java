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
 * A Artist.
 */
@Entity
@Table(name = "artist")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Artist implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name = "sex")
    private String sex;

    @Column(name = "alive")
    private Boolean alive;

    @Column(name = "deathdate")
    private LocalDate deathdate;

    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @ManyToOne
    private Country country;

    @OneToMany(mappedBy = "artist")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FavouriteArtist> favouriteArtists = new HashSet<>();

    @OneToMany(mappedBy = "artist")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Concerts> concerts = new HashSet<>();

    @OneToMany(mappedBy = "artist")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Social> socials = new HashSet<>();

    @OneToMany(mappedBy = "artist")
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

    public Artist name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Artist surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public Artist birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getSex() {
        return sex;
    }

    public Artist sex(String sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Boolean isAlive() {
        return alive;
    }

    public Artist alive(Boolean alive) {
        this.alive = alive;
        return this;
    }

    public void setAlive(Boolean alive) {
        this.alive = alive;
    }

    public LocalDate getDeathdate() {
        return deathdate;
    }

    public Artist deathdate(LocalDate deathdate) {
        this.deathdate = deathdate;
        return this;
    }

    public void setDeathdate(LocalDate deathdate) {
        this.deathdate = deathdate;
    }

    public byte[] getImg() {
        return img;
    }

    public Artist img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Artist imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public Country getCountry() {
        return country;
    }

    public Artist country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<FavouriteArtist> getFavouriteArtists() {
        return favouriteArtists;
    }

    public Artist favouriteArtists(Set<FavouriteArtist> favouriteArtists) {
        this.favouriteArtists = favouriteArtists;
        return this;
    }

    public Artist addFavouriteArtist(FavouriteArtist favouriteArtist) {
        this.favouriteArtists.add(favouriteArtist);
        favouriteArtist.setArtist(this);
        return this;
    }

    public Artist removeFavouriteArtist(FavouriteArtist favouriteArtist) {
        this.favouriteArtists.remove(favouriteArtist);
        favouriteArtist.setArtist(null);
        return this;
    }

    public void setFavouriteArtists(Set<FavouriteArtist> favouriteArtists) {
        this.favouriteArtists = favouriteArtists;
    }

    public Set<Concerts> getConcerts() {
        return concerts;
    }

    public Artist concerts(Set<Concerts> concerts) {
        this.concerts = concerts;
        return this;
    }

    public Artist addConcerts(Concerts concerts) {
        this.concerts.add(concerts);
        concerts.setArtist(this);
        return this;
    }

    public Artist removeConcerts(Concerts concerts) {
        this.concerts.remove(concerts);
        concerts.setArtist(null);
        return this;
    }

    public void setConcerts(Set<Concerts> concerts) {
        this.concerts = concerts;
    }

    public Set<Social> getSocials() {
        return socials;
    }

    public Artist socials(Set<Social> socials) {
        this.socials = socials;
        return this;
    }

    public Artist addSocial(Social social) {
        this.socials.add(social);
        social.setArtist(this);
        return this;
    }

    public Artist removeSocial(Social social) {
        this.socials.remove(social);
        social.setArtist(null);
        return this;
    }

    public void setSocials(Set<Social> socials) {
        this.socials = socials;
    }

    public Set<ArtistBandStatus> getArtistBandStatuses() {
        return artistBandStatuses;
    }

    public Artist artistBandStatuses(Set<ArtistBandStatus> artistBandStatuses) {
        this.artistBandStatuses = artistBandStatuses;
        return this;
    }

    public Artist addArtistBandStatus(ArtistBandStatus artistBandStatus) {
        this.artistBandStatuses.add(artistBandStatus);
        artistBandStatus.setArtist(this);
        return this;
    }

    public Artist removeArtistBandStatus(ArtistBandStatus artistBandStatus) {
        this.artistBandStatuses.remove(artistBandStatus);
        artistBandStatus.setArtist(null);
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
        Artist artist = (Artist) o;
        if (artist.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artist.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Artist{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", sex='" + getSex() + "'" +
            ", alive='" + isAlive() + "'" +
            ", deathdate='" + getDeathdate() + "'" +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + imgContentType + "'" +
            "}";
    }
}
