import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SalleService } from 'src/Services/salle.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Salle } from 'src/Modeles/Salle';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  dataSource = new MatTableDataSource<Salle>([]);

  constructor(private salleService: SalleService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadSalles();
  }

  loadSalles() {
    this.salleService.getAll().subscribe((salles) => {
      this.dataSource.data = salles;
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salleService.ONDELETE(id).subscribe(() => {
          this.loadSalles();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSalleModal(salle?: Salle): void {
    const form = new FormGroup({
      name: new FormControl(salle?.name || '', Validators.required),
      capacite: new FormControl(salle?.capacite || '', Validators.required),
      prix: new FormControl(salle?.prix || '', Validators.required),
      description: new FormControl(salle?.description || '', Validators.required),
      image: new FormControl(salle?.image || '', Validators.required) // Simple string input for image
    });

    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {
        title: salle ? 'Modifier la Salle' : 'Ajouter une Salle',
        form,
        onSubmit: (formValue: any) => {
          if (salle) {
            this.salleService.updateSalle(salle.id!, formValue).subscribe(() => this.loadSalles());
          } else {
            this.salleService.ONSAVE(formValue).subscribe(() => this.loadSalles());
          }
        }
      }
    });
  }
}
