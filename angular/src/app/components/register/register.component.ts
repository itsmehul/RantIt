import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(
    private flashMessage: FlashMessagesService,
    private validateService: ValidateService) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Req fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('pls fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //Req fields
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('pls use valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
  }
}
