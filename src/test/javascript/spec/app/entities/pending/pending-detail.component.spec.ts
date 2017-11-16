/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PendingDetailComponent } from '../../../../../../main/webapp/app/entities/pending/pending-detail.component';
import { PendingService } from '../../../../../../main/webapp/app/entities/pending/pending.service';
import { Pending } from '../../../../../../main/webapp/app/entities/pending/pending.model';

describe('Component Tests', () => {

    describe('Pending Management Detail Component', () => {
        let comp: PendingDetailComponent;
        let fixture: ComponentFixture<PendingDetailComponent>;
        let service: PendingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [PendingDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PendingService,
                    JhiEventManager
                ]
            }).overrideTemplate(PendingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PendingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PendingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pending(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pending).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
