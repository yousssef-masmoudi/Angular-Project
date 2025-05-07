import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from 'src/Modeles/reservation';
import { ClientService } from 'src/Services/client.service';
import { ReservationService } from 'src/Services/reservation.service';
import { SalleService } from 'src/Services/salle.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { Salle } from 'src/Modeles/Salle';
import { HttpClient } from '@angular/common/http';
import { Client } from 'src/Modeles/Client';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6'];
  dataSource!: MatTableDataSource<Reservation>;

  clients: Client[] = [];
  salles: Salle[] = [];

  constructor(
    private reservationService: ReservationService,
    private clientService: ClientService,
    private salleService: SalleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
    this.loadClients();
    this.loadSalles();
  }

  loadReservations() {
    this.reservationService.getAll().subscribe((reservations) => {
      this.dataSource = new MatTableDataSource(reservations);
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

  getClientName(clientId: string): string {
    const client = this.clients.find((c) => c.id === clientId);
    return client ? client.name : 'N/A';
  }

  getSalleName(salleId: string): string {
    const salle = this.salles.find((s) => s.id === salleId);
    return salle ? salle.name : 'N/A';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    // 2. attendre le résultat de l'utilisateur
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reservationService.ONDELETE(id).subscribe(() => {
          this.loadReservations();
        });
      }
    });
  }
 
  }
  



