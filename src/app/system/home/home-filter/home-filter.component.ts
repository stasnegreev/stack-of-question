import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'soq-home-filter',
  templateUrl: './home-filter.component.html',
  styleUrls: ['./home-filter.component.scss']
})
export class HomeFilterComponent implements OnInit {
  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

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
        'answered': new FormControl(true),
        'notApproved': new FormControl(true),
      }),
      'dateFrom': new FormControl(0),
      'dateTo': new FormControl((new Date(+new Date() + 99999999))),
    });
    console.log('form.value', this.form.value);
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }
  apllyFilter() {
    const filterParams = {
      tags: [],
      status: [],
      dateFrom: '',
      dateTo: '',
    };
    console.log('this.form.value11', this.form.value);
    for (let key in this.form.value.tags) {
      if (this.form.value.tags[key] === true) {
           filterParams.tags.push(key);
      }
    }
    for (let key in this.form.value.status) {
      if (this.form.value.status[key] === true) {
        filterParams.status.push(key);
      }
    }
    filterParams.dateFrom = this.form.value.dateFrom;
    filterParams.dateTo = this.form.value.dateTo;
    console.log('filterParams11', filterParams);
    this.onFilterApply.emit(filterParams);
  }
}
