import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from './user.model';

@Injectable()
export class UserProvider {

  public dummyUser = new User({
    username: "",
    password: "",
    phone: 0,
    email: ""
  });
  constructor() {
  }

}
