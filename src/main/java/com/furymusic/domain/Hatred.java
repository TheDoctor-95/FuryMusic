package com.furymusic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Hatred.
 */
@Entity
@Table(name = "hatred")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hatred implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hated")
    private Boolean hated;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @ManyToOne
    private User user;

    @ManyToOne
    private Band band;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isHated() {
        return hated;
    }

    public Hatred hated(Boolean hated) {
        this.hated = hated;
        return this;
    }

    public void setHated(Boolean hated) {
        this.hated = hated;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Hatred date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public Hatred user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Band getBand() {
        return band;
    }

    public Hatred band(Band band) {
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
        Hatred hatred = (Hatred) o;
        if (hatred.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hatred.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hatred{" +
            "id=" + getId() +
            ", hated='" + isHated() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
