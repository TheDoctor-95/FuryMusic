/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FavouriteBandDetailComponent } from '../../../../../../main/webapp/app/entities/favourite-band/favourite-band-detail.component';
import { FavouriteBandService } from '../../../../../../main/webapp/app/entities/favourite-band/favourite-band.service';
import { FavouriteBand } from '../../../../../../main/webapp/app/entities/favourite-band/favourite-band.model';

describe('Component Tests', () => {

    describe('FavouriteBand Management Detail Component', () => {
        let comp: FavouriteBandDetailComponent;
        let fixture: ComponentFixture<FavouriteBandDetailComponent>;
        let service: FavouriteBandService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [FavouriteBandDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FavouriteBandService,
                    JhiEventManager
                ]
            }).overrideTemplate(FavouriteBandDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FavouriteBandDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FavouriteBandService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FavouriteBand(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.favouriteBand).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
