import {UserData} from '../../shared/module/userData.model';


export class MockAuthService {
 public userData = new UserData('test_name', 'test_status', 'test_id');

  constructor() {}

}
