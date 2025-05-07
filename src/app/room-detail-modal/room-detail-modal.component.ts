import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Salle } from 'src/Modeles/Salle';
import { HomeFromComponent } from '../home-from/home-from.component';

@Component({
  selector: 'app-room-detail-modal',
  templateUrl: './room-detail-modal.component.html',
  styleUrls: ['./room-detail-modal.component.css']
})
export class RoomDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RoomDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Salle,
    private dialog: MatDialog // Inject MatDialog to open the reservation modal
  ) {}

  close(): void {
    this.dialogRef.close(); // Close the room detail modal
  }

  openHomeFormModal(): void {
    const dialogRef = this.dialog.open(HomeFromComponent, {
      width: '500px',
      data: { salle: this.data } // Pass the current room (Salle) data to the reservation form
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reservation saved:', result);
        // Handle the saved reservation data here (e.g., refresh the list or show a success message)
      }
    });
  }
}
