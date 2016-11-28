import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute} from '@angular/router';
import { ConferenceComponent } from './conference.component';
import { t } from '../../../../../frameworks/test/index';
import { CoreModule } from '../../../../../frameworks/core/core.module';
import { SharedModule, ScheduleModule } from 'primeng/primeng';
import { MultilingualModule } from '../../../../../frameworks/i18n/multilingual.module';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment/moment';

export function main() {

    t.describe('Component: ConferenceComponent', () => {
        t.beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CoreModule, RouterTestingModule, MultilingualModule, SharedModule, ScheduleModule],
                declarations: [ConferenceComponent, TestComponent, RouterLinkStubDirective],
                schemas: [NO_ERRORS_SCHEMA],
                providers: [
                    { provide: Router, useClass: RouterStub },
                    { provide: ActivatedRoute, useValue:  { 'params': Observable.from([{ 'room': 1 }]) } }
                ]
            });
        });
        t.it('should have a defined component',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.e(fixture.nativeElement).toBeTruthy();
                        t.e(TestComponent).toBeDefined();
                    });
            }));
        t.it('should have initialize component',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        t.e(componentInstance.allEvents.length).toBe(8);
                        t.e(componentInstance.conferenceRooms.length).toBe(8);
                        t.e(TestComponent).toBeDefined();
                    });
            }));
        t.it('should call handleEventClicked method',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.handleEventClicked({calEvent:{start:new Date, end:new Date}});
                        t.e(componentInstance.selectedEvent.start).toBe(moment().format('DD/MM/YY hh:MM a'));
                        t.e(componentInstance.selectedEvent.end).toBe(moment().format('DD/MM/YY hh:MM a'));
                    });
            }));
        t.it('should call getEventByRooms method',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        let componentInstance = fixture.debugElement.children[0].componentInstance;
                        fixture.detectChanges();
                        componentInstance.getEventByRooms('Bahamas');
                        t.e(componentInstance.selectedRoom).toBe('Bahamas');
                    });
            }));
        t.it('TC_01: To check what is displayed on the Screen when conference booking is Selected',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        t.it('TC_02: To check what are the contents on the Page Conference booking',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(8);
                        t.expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('CONFERENCE_BTN_MANAGE_BOOKING');
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-month-button').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-agendaWeek-button').length).toBe(1);
                        t.expect(fixture.nativeElement.querySelectorAll('button.fc-agendaDay-button').length).toBe(1);
                    });
            }));
        t.it('TC_03: To check whether different conference Rooms are displayed or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(8);
                    });
            }));
        t.it('TC_04: To check whether each conference Rooms are having unique colors or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.color-list').length).toBe(8);
                    });
            }));
        t.it('TC_05:To check whether Day View is Displayed on the main page or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelectorAll('.fc-agendaDay-view').length).toBe(1);
                    });
            }));
        t.it('TC_06:To check whether current date is Present above the Day View or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelector('.fc-toolbar').innerHTML.search(moment().format('MMMM DD, YYYY'))).not.toBe(-1);
                    });
            }));
        t.it('TC_07:To check whether any option provided For booking conference room or not',
            t.async(() => {
                TestBed.compileComponents()
                    .then(() => {
                        let fixture = TestBed.createComponent(TestComponent);
                        fixture.detectChanges();
                        t.expect(fixture.nativeElement.querySelector('button.btn.btn-default').innerHTML).toBe('CONFERENCE_BTN_MANAGE_BOOKING');
                    });
            }));
    });
};


@Component({
    selector: 'test-cmp',
    template: '<conference-booking></conference-booking>'
})
class TestComponent { }

class RouterStub {
    navigate(url: any) { return url; }
}

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
}