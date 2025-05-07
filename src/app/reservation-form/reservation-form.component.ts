import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Client';
import { Salle } from 'src/Modeles/Salle';
import { Reservation } from 'src/Modeles/reservation';
import { ClientService } from 'src/Services/client.service';
import { ReservationService } from 'src/Services/reservation.service';
import { SalleService } from 'src/Services/salle.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  reservation: Reservation | null = null;
  form!: FormGroup;
  idcourant!: string;

  clients: Client[] = [];
  salles: Salle[] = [];

  constructor(
    private reservationService: ReservationService,
    private clientService: ClientService,
    private salleService: SalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    this.loadClients();
    this.loadSalles();

    if (!!this.idcourant) {
      this.reservationService.getReservationById(this.idcourant).subscribe((reservation) => {
        if (reservation) {
          this.reservation = reservation;
          this.initForm2(reservation);
        } else {
          // Gérer le cas où la réservation n'est pas trouvée
          console.log('Réservation non trouvée');
        }
      });
    } else {
      this.initForm();
    }
  }

  onsub(): void {
    if (!!this.idcourant) {
      this.reservationService.updateReservation(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['/reservation']);
      });
    } else {
      const reservationToSave = this.form.value;
      this.reservationService.ONSAVE(reservationToSave).subscribe(() => {
        this.router.navigate(['/reservation']);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      dateDebut: new FormControl(null, [Validators.required]),
      dateFin: new FormControl(null, [Validators.required]),
      clientId: new FormControl(null, [Validators.required]),
      salleId: new FormControl(null, [Validators.required])
    });
  }

  initForm2(reservation: Reservation): void {
    this.form = new FormGroup({
      dateDebut: new FormControl(reservation.dateDebut, [Validators.required]),
      dateFin: new FormControl(reservation.dateFin, [Validators.required]),
      clientId: new FormControl(reservation.clientId, [Validators.required]),
      salleId: new FormControl(reservation.salleId, [Validators.required])
    });
  }
  

  loadClients() {
    this.clientService.GET().subscribe((clients) => {
      this.clients = clients;
    });
  }

  loadSalles() {
    this.salleService.getAll().subscribe((salles) => {
      this.salles = salles;
    });
  }
}