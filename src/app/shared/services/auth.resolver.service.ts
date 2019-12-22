import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError, delay, map, take, tap} from "rxjs/operators";
import {UserData} from "../module/userData.model";
import {UserService} from "./user.service";

@Injectable()
export class AuthResovler implements Resolve<any> {

  constructor(
    public userService: UserService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    console.log('resolve');
    const id = this.userService.getUserId();
    if (id) {
      return this.userService.getUserDataByKey(id).pipe(
        delay(2000),
        take(1),
        map((data: any) => data)
      );
    } else {
      return EMPTY;
    }
  }
}
