/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FavouriteAlbumDetailComponent } from '../../../../../../main/webapp/app/entities/favourite-album/favourite-album-detail.component';
import { FavouriteAlbumService } from '../../../../../../main/webapp/app/entities/favourite-album/favourite-album.service';
import { FavouriteAlbum } from '../../../../../../main/webapp/app/entities/favourite-album/favourite-album.model';

describe('Component Tests', () => {

    describe('FavouriteAlbum Management Detail Component', () => {
        let comp: FavouriteAlbumDetailComponent;
        let fixture: ComponentFixture<FavouriteAlbumDetailComponent>;
        let service: FavouriteAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [FavouriteAlbumDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FavouriteAlbumService,
                    JhiEventManager
                ]
            }).overrideTemplate(FavouriteAlbumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FavouriteAlbumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FavouriteAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FavouriteAlbum(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.favouriteAlbum).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
