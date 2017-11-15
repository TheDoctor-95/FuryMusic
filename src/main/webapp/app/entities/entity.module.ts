import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FuryMusicUserExtModule } from './user-ext/user-ext.module';
import { FuryMusicCountryModule } from './country/country.module';
import { FuryMusicGenreModule } from './genre/genre.module';
import { FuryMusicAlbumTypesModule } from './album-types/album-types.module';
import { FuryMusicAlbumModule } from './album/album.module';
import { FuryMusicLabelModule } from './label/label.module';
import { FuryMusicSongModule } from './song/song.module';
import { FuryMusicReviewModule } from './review/review.module';
import { FuryMusicArtistModule } from './artist/artist.module';
import { FuryMusicArtistBandStatusModule } from './artist-band-status/artist-band-status.module';
import { FuryMusicBandModule } from './band/band.module';
import { FuryMusicFavouriteBandModule } from './favourite-band/favourite-band.module';
import { FuryMusicFavouriteAlbumModule } from './favourite-album/favourite-album.module';
import { FuryMusicRateAlbumModule } from './rate-album/rate-album.module';
import { FuryMusicFavouriteArtistModule } from './favourite-artist/favourite-artist.module';
import { FuryMusicHatredModule } from './hatred/hatred.module';
import { FuryMusicFavouriteReviewModule } from './favourite-review/favourite-review.module';
import { FuryMusicFavouriteLabelModule } from './favourite-label/favourite-label.module';
import { FuryMusicFavouriteSongModule } from './favourite-song/favourite-song.module';
import { FuryMusicPendingModule } from './pending/pending.module';
import { FuryMusicCollectionModule } from './collection/collection.module';
import { FuryMusicConcertsModule } from './concerts/concerts.module';
import { FuryMusicSocialModule } from './social/social.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        FuryMusicUserExtModule,
        FuryMusicCountryModule,
        FuryMusicGenreModule,
        FuryMusicAlbumTypesModule,
        FuryMusicAlbumModule,
        FuryMusicLabelModule,
        FuryMusicSongModule,
        FuryMusicReviewModule,
        FuryMusicArtistModule,
        FuryMusicArtistBandStatusModule,
        FuryMusicBandModule,
        FuryMusicFavouriteBandModule,
        FuryMusicFavouriteAlbumModule,
        FuryMusicRateAlbumModule,
        FuryMusicFavouriteArtistModule,
        FuryMusicHatredModule,
        FuryMusicFavouriteReviewModule,
        FuryMusicFavouriteLabelModule,
        FuryMusicFavouriteSongModule,
        FuryMusicPendingModule,
        FuryMusicCollectionModule,
        FuryMusicConcertsModule,
        FuryMusicSocialModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuryMusicEntityModule {}
