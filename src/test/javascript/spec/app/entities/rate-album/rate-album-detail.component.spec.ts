/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RateAlbumDetailComponent } from '../../../../../../main/webapp/app/entities/rate-album/rate-album-detail.component';
import { RateAlbumService } from '../../../../../../main/webapp/app/entities/rate-album/rate-album.service';
import { RateAlbum } from '../../../../../../main/webapp/app/entities/rate-album/rate-album.model';

describe('Component Tests', () => {

    describe('RateAlbum Management Detail Component', () => {
        let comp: RateAlbumDetailComponent;
        let fixture: ComponentFixture<RateAlbumDetailComponent>;
        let service: RateAlbumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [RateAlbumDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RateAlbumService,
                    JhiEventManager
                ]
            }).overrideTemplate(RateAlbumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateAlbumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateAlbumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RateAlbum(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rateAlbum).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
