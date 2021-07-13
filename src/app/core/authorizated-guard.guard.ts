import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuardGuard implements CanActivate {

  constructor(private router: Router,
    private storageService: StorageService) { }

    canActivate() {
      console.log(this.storageService.isAuthenticated());
      if (this.storageService.isAuthenticated()) {
        // logged in so return true
        return true;
      }
  
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  
}
