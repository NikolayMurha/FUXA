import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'datetime-picker',
    templateUrl: './datetime-picker.component.html',
    styleUrls: ['./datetime-picker.component.css']
})
/**
 *
 * @class DatetimePickerComponent
 */
export class DatetimePickerComponent implements OnInit, OnChanges {
    @Input() date: Date = new Date();
    @Input() timestamp: number = 0;
    @Output() dateChange: EventEmitter<Date> = new EventEmitter();
    @Output() timestampChange: EventEmitter<Number> = new EventEmitter();

    public dateFormControl: FormControl = new FormControl();
    public hours = [];
    public minutes = [];

    constructor() {
       // console.log('DatetimePickerComponent::constructor')
    }

    public ngOnInit() {
        if (this.timestamp) {
            this.setByTimestamp(this.timestamp);
        }
        this.hours = Array.from(Array(25).keys());
        this.minutes = Array.from(Array(61).keys());
        this.dateFormControl = new FormControl(this.date);
    }

    public setHours(hours) {
        this.date.setHours(hours);
        this.changed();
    }

    public setMinutes(minutes) {
        this.date.setMinutes(minutes);
        this.changed();
    }

    public setDate(event) {
        event.value.setHours(this.date.getHours())
        event.value.setMinutes(this.date.getMinutes())
        this.date = event.value;
        this.changed();
    }

    protected setByTimestamp(timestamp) {
        this.date = new Date(this.timestamp);
    }

    protected changed() {
        console.log('datetime changed');
        this.dateChange.emit(this.date);
        this.timestampChange.emit(this.date.getTime());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.timestamp) {
            console.log('Handle changes');
            this.setByTimestamp(changes.timestamp.currentValue);
            this.dateFormControl.setValue(this.date);
        }
    }
}
