/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HatredDetailComponent } from '../../../../../../main/webapp/app/entities/hatred/hatred-detail.component';
import { HatredService } from '../../../../../../main/webapp/app/entities/hatred/hatred.service';
import { Hatred } from '../../../../../../main/webapp/app/entities/hatred/hatred.model';

describe('Component Tests', () => {

    describe('Hatred Management Detail Component', () => {
        let comp: HatredDetailComponent;
        let fixture: ComponentFixture<HatredDetailComponent>;
        let service: HatredService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [HatredDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HatredService,
                    JhiEventManager
                ]
            }).overrideTemplate(HatredDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HatredDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HatredService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Hatred(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.hatred).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
