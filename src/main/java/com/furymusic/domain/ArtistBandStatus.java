package com.furymusic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ArtistBandStatus.
 */
@Entity
@Table(name = "artist_band_status")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ArtistBandStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "incorporation_date")
    private LocalDate incorporationDate;

    @Column(name = "leaving_date")
    private LocalDate leavingDate;

    @ManyToOne
    private Artist artist;

    @ManyToOne
    private Band band;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getIncorporationDate() {
        return incorporationDate;
    }

    public ArtistBandStatus incorporationDate(LocalDate incorporationDate) {
        this.incorporationDate = incorporationDate;
        return this;
    }

    public void setIncorporationDate(LocalDate incorporationDate) {
        this.incorporationDate = incorporationDate;
    }

    public LocalDate getLeavingDate() {
        return leavingDate;
    }

    public ArtistBandStatus leavingDate(LocalDate leavingDate) {
        this.leavingDate = leavingDate;
        return this;
    }

    public void setLeavingDate(LocalDate leavingDate) {
        this.leavingDate = leavingDate;
    }

    public Artist getArtist() {
        return artist;
    }

    public ArtistBandStatus artist(Artist artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Band getBand() {
        return band;
    }

    public ArtistBandStatus band(Band band) {
        this.band = band;
        return this;
    }

    public void setBand(Band band) {
        this.band = band;
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
        ArtistBandStatus artistBandStatus = (ArtistBandStatus) o;
        if (artistBandStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artistBandStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArtistBandStatus{" +
            "id=" + getId() +
            ", incorporationDate='" + getIncorporationDate() + "'" +
            ", leavingDate='" + getLeavingDate() + "'" +
            "}";
    }
}
