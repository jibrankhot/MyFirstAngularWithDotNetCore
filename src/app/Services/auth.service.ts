import { Injectable } from '@angular/core';
import { UserForLogin } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baserUrl = environment.BaseUrl

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {
    return this.http.post(this.baserUrl + '/account/login', user)
  }


  //old code used foe local storage
  // authUser(user: User) {
  //   let UserArray = [];
  //   if (localStorage.getItem('Users')) {
  //     UserArray = JSON.parse(localStorage.getItem('Users'));
  //     debugger;
  //   }
  //   return UserArray.find(
  //     (loginuser) =>
  //       loginuser.userName === user.userName &&
  //       loginuser.Password === user.Password
  //   );
  // }
}
