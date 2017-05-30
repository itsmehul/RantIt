import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
constructor(
    private authService: AuthService,
    private router: Router){}

//ensures that manually typing the URL without auth redirects to login page
canActivate(){
    if(this.authService.loggedIn()){
        return true
    }else{
        this.router.navigate(['/login']);
        return false;
    }
}
}