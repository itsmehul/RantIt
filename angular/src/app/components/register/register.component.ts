import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


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
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

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

    //Register user
    this.authService.registerUser(user)
    //subscribe to get observable data
    .subscribe(
      //we call the data, data
      data => {
      if (data.success) {
        this.flashMessage.show('you are registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {

        this.flashMessage.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/home']);
      }
    });

  }
}
