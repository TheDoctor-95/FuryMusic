/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FavouriteReviewDetailComponent } from '../../../../../../main/webapp/app/entities/favourite-review/favourite-review-detail.component';
import { FavouriteReviewService } from '../../../../../../main/webapp/app/entities/favourite-review/favourite-review.service';
import { FavouriteReview } from '../../../../../../main/webapp/app/entities/favourite-review/favourite-review.model';

describe('Component Tests', () => {

    describe('FavouriteReview Management Detail Component', () => {
        let comp: FavouriteReviewDetailComponent;
        let fixture: ComponentFixture<FavouriteReviewDetailComponent>;
        let service: FavouriteReviewService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [FavouriteReviewDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FavouriteReviewService,
                    JhiEventManager
                ]
            }).overrideTemplate(FavouriteReviewDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FavouriteReviewDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FavouriteReviewService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FavouriteReview(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.favouriteReview).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
