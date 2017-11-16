/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConcertsDetailComponent } from '../../../../../../main/webapp/app/entities/concerts/concerts-detail.component';
import { ConcertsService } from '../../../../../../main/webapp/app/entities/concerts/concerts.service';
import { Concerts } from '../../../../../../main/webapp/app/entities/concerts/concerts.model';

describe('Component Tests', () => {

    describe('Concerts Management Detail Component', () => {
        let comp: ConcertsDetailComponent;
        let fixture: ComponentFixture<ConcertsDetailComponent>;
        let service: ConcertsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [ConcertsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConcertsService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConcertsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConcertsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConcertsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Concerts(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.concerts).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
