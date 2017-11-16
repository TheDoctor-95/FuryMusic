/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AlbumTypesDetailComponent } from '../../../../../../main/webapp/app/entities/album-types/album-types-detail.component';
import { AlbumTypesService } from '../../../../../../main/webapp/app/entities/album-types/album-types.service';
import { AlbumTypes } from '../../../../../../main/webapp/app/entities/album-types/album-types.model';

describe('Component Tests', () => {

    describe('AlbumTypes Management Detail Component', () => {
        let comp: AlbumTypesDetailComponent;
        let fixture: ComponentFixture<AlbumTypesDetailComponent>;
        let service: AlbumTypesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [AlbumTypesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AlbumTypesService,
                    JhiEventManager
                ]
            }).overrideTemplate(AlbumTypesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlbumTypesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlbumTypesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AlbumTypes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.albumTypes).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
