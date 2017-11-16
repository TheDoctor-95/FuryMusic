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
 * A Country.
 */
@Entity
@Table(name = "country")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url_google_maps")
    private String urlGoogleMaps;

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserExt> userExts = new HashSet<>();

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Artist> artists = new HashSet<>();

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Band> bands = new HashSet<>();

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Label> labels = new HashSet<>();

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

    public Country name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrlGoogleMaps() {
        return urlGoogleMaps;
    }

    public Country urlGoogleMaps(String urlGoogleMaps) {
        this.urlGoogleMaps = urlGoogleMaps;
        return this;
    }

    public void setUrlGoogleMaps(String urlGoogleMaps) {
        this.urlGoogleMaps = urlGoogleMaps;
    }

    public Set<UserExt> getUserExts() {
        return userExts;
    }

    public Country userExts(Set<UserExt> userExts) {
        this.userExts = userExts;
        return this;
    }

    public Country addUserExt(UserExt userExt) {
        this.userExts.add(userExt);
        userExt.setCountry(this);
        return this;
    }

    public Country removeUserExt(UserExt userExt) {
        this.userExts.remove(userExt);
        userExt.setCountry(null);
        return this;
    }

    public void setUserExts(Set<UserExt> userExts) {
        this.userExts = userExts;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public Country artists(Set<Artist> artists) {
        this.artists = artists;
        return this;
    }

    public Country addArtist(Artist artist) {
        this.artists.add(artist);
        artist.setCountry(this);
        return this;
    }

    public Country removeArtist(Artist artist) {
        this.artists.remove(artist);
        artist.setCountry(null);
        return this;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public Set<Band> getBands() {
        return bands;
    }

    public Country bands(Set<Band> bands) {
        this.bands = bands;
        return this;
    }

    public Country addBand(Band band) {
        this.bands.add(band);
        band.setCountry(this);
        return this;
    }

    public Country removeBand(Band band) {
        this.bands.remove(band);
        band.setCountry(null);
        return this;
    }

    public void setBands(Set<Band> bands) {
        this.bands = bands;
    }

    public Set<Label> getLabels() {
        return labels;
    }

    public Country labels(Set<Label> labels) {
        this.labels = labels;
        return this;
    }

    public Country addLabel(Label label) {
        this.labels.add(label);
        label.setCountry(this);
        return this;
    }

    public Country removeLabel(Label label) {
        this.labels.remove(label);
        label.setCountry(null);
        return this;
    }

    public void setLabels(Set<Label> labels) {
        this.labels = labels;
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
        Country country = (Country) o;
        if (country.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), country.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", urlGoogleMaps='" + getUrlGoogleMaps() + "'" +
            "}";
    }
}
