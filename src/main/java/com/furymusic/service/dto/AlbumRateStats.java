package com.furymusic.service.dto;

import com.furymusic.domain.Album;

public class AlbumRateStats {

    private Album album;
    private Double avg;
    private Integer max;
    private Integer min;

    public AlbumRateStats(Album album, Double avg, Integer max, Integer min) {
        this.album = album;
        this.avg = avg;
        this.max = max;
        this.min = min;
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

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }
}
