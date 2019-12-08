import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'soq-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss']
})
export class HomeFilterComponent implements OnInit {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() filterParams: any = [];

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'tags': new FormGroup({
        'tag1': new FormControl(true),
        'tag2': new FormControl(true),
        'noTags': new FormControl(true),
      }),
      'status': new FormGroup({
        'resolve': new FormControl(true),
        'notResolve': new FormControl(true),
      }),
      'dateFrom': new FormControl(0),
      'dateTo': new FormControl((new Date(+new Date() + 99999999))),
    });
    console.log('HomeFilterComponent ngOnInit ', this.filterParams)
    this.form.patchValue({
      'tags': {
        'tag1': !!(this.filterParams.tags.indexOf('tag1') + 1),
        'tag2': !!(this.filterParams.tags.indexOf('tag2') + 1),
        'noTags': !!(this.filterParams.tags.indexOf('noTags') + 1),
      },
      'status': {
        'resolve': !!(this.filterParams.status.indexOf('resolve') + 1),
        'notResolve': !!(this.filterParams.status.indexOf('notResolve') + 1),
      },
      'dateFrom': this.filterParams.dateFrom,
      'dateTo': this.filterParams.dateTo,
    });
    console.log('form.value', this.form.value);
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }
  onSubmit() {
    const filterParams = {
      tags: [],
      status: [],
      dateFrom: '',
      dateTo: '',
    };
    console.log('HomeFilterComponent onSubmit this.form.value', this.form.value);
    for (const key in this.form.value.tags) {
      if (this.form.value.tags[key] === true) {
           filterParams.tags.push(key);
      }
    }
    for (const key in this.form.value.status) {
      if (this.form.value.status[key] === true) {
        filterParams.status.push(key);
      }
    }
    filterParams.dateFrom = this.form.value.dateFrom;
    filterParams.dateTo = this.form.value.dateTo;

    console.log('HomeFilterComponent onSubmit filterParams=', filterParams);
    this.onFilterApply.emit(filterParams);
  }
}
