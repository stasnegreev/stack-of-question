import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {AuthService} from '../../shared/services/auth.service';
import {UserData} from "../../shared/module/userData.model";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MockAuthService} from "./Mock.auth.service";


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have userData`, () => {
    expect(component.userData.name).toEqual('test_name');
  });
  it(`should have userData`, () => {
    expect(component.userData.status).toEqual('test_status');
  });
  it('should render title in a profile__name', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.profile__name').textContent)
      .toContain('test_name');
  });
});
