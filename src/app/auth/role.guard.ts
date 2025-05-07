import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/AuthService (2)';
import { UnauthorizedDialogComponent } from '../unauthorized-dialog/unauthorized-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getRole().pipe(
      take(1),
      map(role => {
        const expectedRole = route.data['role'];
        
        if (role === expectedRole) {
          return true;
        }

        // Show unauthorized dialog and redirect to /home
        this.dialog.open(UnauthorizedDialogComponent, {
          width: '400px',
          disableClose: true
        }).afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });

        return false;
      })
    );
  }
}
