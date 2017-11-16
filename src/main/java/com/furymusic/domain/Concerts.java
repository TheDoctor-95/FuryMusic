package com.furymusic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Concerts.
 */
@Entity
@Table(name = "concerts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Concerts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "place")
    private String place;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitud")
    private Double longitud;

    @Column(name = "url_google")
    private String urlGoogle;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    private Band band;

    @ManyToOne
    private Artist artist;

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

    public Concerts name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlace() {
        return place;
    }

    public Concerts place(String place) {
        this.place = place;
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Concerts latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitud() {
        return longitud;
    }

    public Concerts longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getUrlGoogle() {
        return urlGoogle;
    }

    public Concerts urlGoogle(String urlGoogle) {
        this.urlGoogle = urlGoogle;
        return this;
    }

    public void setUrlGoogle(String urlGoogle) {
        this.urlGoogle = urlGoogle;
    }

    public LocalDate getDate() {
        return date;
    }

    public Concerts date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Band getBand() {
        return band;
    }

    public Concerts band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public Artist getArtist() {
        return artist;
    }

    public Concerts artist(Artist artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
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
        Concerts concerts = (Concerts) o;
        if (concerts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), concerts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Concerts{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", place='" + getPlace() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", longitud='" + getLongitud() + "'" +
            ", urlGoogle='" + getUrlGoogle() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
