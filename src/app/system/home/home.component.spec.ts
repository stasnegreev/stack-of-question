import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AuthService} from '../../shared/services/auth.service';
import {MockAuthService} from "./Mock.auth.service";
import {UserService} from "../../shared/services/user.service";
import {MockQuestionService} from "./MockQuestionService";
import {HomeComponent} from "./home.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FilterByDatePipe} from "../shared/pipes/filter-by-date.pipe";
import {QuestionService} from "../shared/services/question.service";


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const questions = [
      {
      author: 'paA69HIeEcbkI6fFt1elD7yB0053',
      date: 'Sat Dec 07 2019 11:14:26 GMT+0300 (Москва, стандартное время)',
      status: 'resolve',
      text: 'klvflkfdlkdfblkfdnblkfdn',
      title: 'Admin new',
    },
    {
      author: 'sHamf92GfsUr8SOlDhDjFqxS8Le2',
      date: 'Fri Dec 13 2019 10:09:57 GMT+0300 (Москва, стандартное время)',
      status: 'resolve',
      tags: ['tag1', 'tag2'],
      text: 'afdsa',
      title: 'Stas',
    }
    ]
  const filteredQuestions1 = [
    {
      author: 'sHamf92GfsUr8SOlDhDjFqxS8Le2',
      date: 'Fri Dec 13 2019 10:09:57 GMT+0300 (Москва, стандартное время)',
      status: 'resolve',
      tags: ['tag1', 'tag2'],
      text: 'afdsa',
      title: 'Stas',
    }
  ]
  const filterParams = {
    dateFrom: 'Fri Dec 12 2019 10:09:57 GMT+0300 (Москва, стандартное время)',
    dateTo: new Date(+new Date() + 99999999),
    status: ['resolve', 'notResolve'],
    tags: ['tag1', 'tag2', 'noTags'],
  };
 let questionService: QuestionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        FilterByDatePipe,
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: QuestionService,
          useClass: MockQuestionService,
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    questionService = fixture.debugElement.injector.get(QuestionService);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should called open', () => {
    const openSpy = spyOn(questionService, 'getAllQuestions').and.callThrough();
    fixture.detectChanges();
    expect(openSpy).toHaveBeenCalled();
  });
  it('should filter', () => {
    fixture.detectChanges();
    component.onFilterApply(filterParams);
    expect(component.filteredQuestion).toEqual(filteredQuestions1);
  });
});
