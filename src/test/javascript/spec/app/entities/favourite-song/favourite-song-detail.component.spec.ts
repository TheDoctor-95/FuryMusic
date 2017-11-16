/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { FuryMusicTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FavouriteSongDetailComponent } from '../../../../../../main/webapp/app/entities/favourite-song/favourite-song-detail.component';
import { FavouriteSongService } from '../../../../../../main/webapp/app/entities/favourite-song/favourite-song.service';
import { FavouriteSong } from '../../../../../../main/webapp/app/entities/favourite-song/favourite-song.model';

describe('Component Tests', () => {

    describe('FavouriteSong Management Detail Component', () => {
        let comp: FavouriteSongDetailComponent;
        let fixture: ComponentFixture<FavouriteSongDetailComponent>;
        let service: FavouriteSongService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FuryMusicTestModule],
                declarations: [FavouriteSongDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FavouriteSongService,
                    JhiEventManager
                ]
            }).overrideTemplate(FavouriteSongDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FavouriteSongDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FavouriteSongService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FavouriteSong(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.favouriteSong).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
