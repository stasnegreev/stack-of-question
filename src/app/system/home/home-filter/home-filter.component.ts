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
        'tag1': new FormControl(''),
        'tag2': new FormControl(''),
      }),
      'status': new FormGroup({
        'answered': new FormControl(''),
        'noAnswered': new FormControl(''),
      }),
      'dateFrom': new FormControl(''),
      'dateTo': new FormControl(''),
    });
    console.log('form.value', this.form.value);
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }
  apllyFilter() {
    const filterParams = this.form.value;
    filterParams.tags = Object.keys(filterParams.tags);
    filterParams.status = Object.keys(filterParams.status);
    console.log(filterParams);
    this.onFilterApply.emit(filterParams);
  }
}
