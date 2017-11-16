/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FavouriteLabelDetailComponent } from '../../../../../../main/webapp/app/entities/favourite-label/favourite-label-detail.component';
import { FavouriteLabelService } from '../../../../../../main/webapp/app/entities/favourite-label/favourite-label.service';
import { FavouriteLabel } from '../../../../../../main/webapp/app/entities/favourite-label/favourite-label.model';

describe('Component Tests', () => {

    describe('FavouriteLabel Management Detail Component', () => {
        let comp: FavouriteLabelDetailComponent;
        let fixture: ComponentFixture<FavouriteLabelDetailComponent>;
        let service: FavouriteLabelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [FavouriteLabelDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FavouriteLabelService,
                    JhiEventManager
                ]
            }).overrideTemplate(FavouriteLabelDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FavouriteLabelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FavouriteLabelService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FavouriteLabel(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.favouriteLabel).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
