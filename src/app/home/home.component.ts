import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from 'src/Modeles/Salle';
import { SalleService } from 'src/Services/salle.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { RoomDetailModalComponent } from '../room-detail-modal/room-detail-modal.component';
import { HomeFromComponent } from '../home-from/home-from.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardHoverAnimation', [
      state('void', style({ transform: 'scale(1)', boxShadow: 'none' })),
      transition(':enter, :leave', []), // No animation on load
      transition('* => *', [
        style({ transform: 'scale(1)' }),
        animate('200ms ease-in', style({ transform: 'scale(1.03)' }))
      ])
    ])
  ]
})
export class HomeComponent {
  dataSource: Salle[] = [];
  expandedPanelIndex: number | null = null;

  constructor(private salleService: SalleService, public dialog: MatDialog) { } // Inject MatDialog

  ngOnInit() {
    this.loadSalles();
  }

  loadSalles() {
    this.salleService.getAll().subscribe((salles) => {
      this.dataSource = salles;
    });
  }

  togglePanel(index: number): void {
    this.expandedPanelIndex = this.expandedPanelIndex === index ? null : index;
  }

  openDetailsModal(salle: Salle): void {
    const dialogRef = this.dialog.open(RoomDetailModalComponent, {
      width: '600px', // Adjust the width as needed
      data: salle // Pass the salle object to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can perform actions after the modal is closed if needed
    });
  }
  openHomeFormModal(reservation?: any): void {
    const dialogRef = this.dialog.open(HomeFromComponent, {
      width: '500px',
      data: { reservation }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation saved:', result);
        // Handle the saved reservation data here
      }
    });
  }
}