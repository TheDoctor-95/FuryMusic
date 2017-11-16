/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CollectionDetailComponent } from '../../../../../../main/webapp/app/entities/collection/collection-detail.component';
import { CollectionService } from '../../../../../../main/webapp/app/entities/collection/collection.service';
import { Collection } from '../../../../../../main/webapp/app/entities/collection/collection.model';

describe('Component Tests', () => {

    describe('Collection Management Detail Component', () => {
        let comp: CollectionDetailComponent;
        let fixture: ComponentFixture<CollectionDetailComponent>;
        let service: CollectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [CollectionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CollectionService,
                    JhiEventManager
                ]
            }).overrideTemplate(CollectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CollectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CollectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Collection(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.collection).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
