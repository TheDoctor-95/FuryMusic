package com.furymusic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Pending.
 */
@Entity
@Table(name = "pending")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pending implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pending")
    private Boolean pending;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @ManyToOne
    private User user;

    @ManyToOne
    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPending() {
        return pending;
    }

    public Pending pending(Boolean pending) {
        this.pending = pending;
        return this;
    }

    public void setPending(Boolean pending) {
        this.pending = pending;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Pending date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public Pending user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Album getAlbum() {
        return album;
    }

    public Pending album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
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
        Pending pending = (Pending) o;
        if (pending.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pending.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pending{" +
            "id=" + getId() +
            ", pending='" + isPending() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
