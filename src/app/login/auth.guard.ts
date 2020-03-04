import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class AuthGuard implements CanActivate{
    constructor(private router: Router){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/'])
        return false;
    }

    public isLoggedIn(){
        let status = false;
        if(sessionStorage.getItem('isLoggedIn') == "true"){
            status = true;
        }
        return status;
    }
    
}