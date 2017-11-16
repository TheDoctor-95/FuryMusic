package com.furymusic.service.dto;

import com.furymusic.domain.Album;

public class AvgRateAlbumDTO {

    private Album album;

    private Double avg;

    public AvgRateAlbumDTO(Album album, Double avg) {
        this.album = album;
        this.avg = avg;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Double getAvg() {
        return avg;
    }

    public void setAvg(Double avg) {
        this.avg = avg;
    }


}
