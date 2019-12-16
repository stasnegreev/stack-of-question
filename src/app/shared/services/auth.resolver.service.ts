import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {map, tap} from "rxjs/operators";
import {UserData} from "../module/userData.model";
import {UserService} from "./user.service";

@Injectable()
export class AuthResovler implements Resolve<any> {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    console.log('resolve');
    const id = this.userService.getUserId();
    if (id) {
      return this.userService.getUserDataByKey(id);
    } else {
      return EMPTY;
    }
  }
}
