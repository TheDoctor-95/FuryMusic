/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ArtistBandStatusDetailComponent } from '../../../../../../main/webapp/app/entities/artist-band-status/artist-band-status-detail.component';
import { ArtistBandStatusService } from '../../../../../../main/webapp/app/entities/artist-band-status/artist-band-status.service';
import { ArtistBandStatus } from '../../../../../../main/webapp/app/entities/artist-band-status/artist-band-status.model';

describe('Component Tests', () => {

    describe('ArtistBandStatus Management Detail Component', () => {
        let comp: ArtistBandStatusDetailComponent;
        let fixture: ComponentFixture<ArtistBandStatusDetailComponent>;
        let service: ArtistBandStatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [ArtistBandStatusDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ArtistBandStatusService,
                    JhiEventManager
                ]
            }).overrideTemplate(ArtistBandStatusDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArtistBandStatusDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArtistBandStatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ArtistBandStatus(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.artistBandStatus).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
