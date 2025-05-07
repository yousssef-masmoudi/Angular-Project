import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from 'src/Services/reservation.service';
import { Salle } from 'src/Modeles/Salle';

@Component({
  selector: 'app-home-from',
  templateUrl: './home-from.component.html',
  styleUrls: ['./home-from.component.css']
})
export class HomeFromComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HomeFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { salle: Salle },
    private reservationService: ReservationService // Inject the reservation service
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Automatically set the salleId if salle data is provided
    if (this.data?.salle) {
      this.form.patchValue({ salleId: this.data.salle.id });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      dateDebut: new FormControl(null, [Validators.required]),
      dateFin: new FormControl(null, [Validators.required]),
      clientId: new FormControl(null, [Validators.required]),
      salleId: new FormControl(null, [Validators.required]) // Salle ID field
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Call the reservation service to save the reservation
      this.reservationService.ONSAVE(this.form.value).subscribe(
        (response) => {
          console.log('Reservation added successfully:', response);
          this.dialogRef.close(this.form.value); // Close the modal and pass the form data
        },
        (error) => {
          console.error('Error adding reservation:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the modal without saving
  }
}
