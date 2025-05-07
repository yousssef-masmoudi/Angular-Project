import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SalleComponent } from './salle/salle.component';
import { ContactComponent } from './contact/contact.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { SalleFormComponent } from './salle-form/salle-form.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { HomeFromComponent } from './home-from/home-from.component';
import { BoiteReceptionComponent } from './boite-reception/boite-reception.component';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';

const routes: Routes = [
  // Public routes
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'boite-reception', pathMatch: 'full', component: BoiteReceptionComponent },
  {path:'creation',pathMatch:'full',component:ContactComponent},
  { path: 'home-reservation/:salleId/:salleName', component: HomeFromComponent },
  { path: 'creation', pathMatch: "full", component: CreationCompteComponent },

  // Admin only routes
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'salle', 
    component: SalleComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'client', 
    component: ClientComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'reservation', 
    component: ReservationComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },

  // Protected form routes
  { 
    path: ':id/editReservation', 
    component: ReservationFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'createReservation', 
    component: ReservationFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: ':id/editSalle', 
    component: SalleFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'createSalle', 
    component: SalleFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: ':id/editClient', 
    component: ClientFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'createClient', 
    component: ClientFormComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },

  // Catch all route - redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
