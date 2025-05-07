import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClientService } from 'src/Services/client.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Client } from 'src/Modeles/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6'];
  dataSource = new MatTableDataSource<Client>([]);

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.GET().subscribe((clients) => {
      this.dataSource.data = clients;
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.ONDELETE(id).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openClientModal(client?: Client): void {
    const form = new FormGroup({
      name: new FormControl(client?.name || '', Validators.required),
      email: new FormControl(client?.email || '', Validators.required),
      password: new FormControl(client?.password || '', Validators.required),
      createdDate: new FormControl(client?.createdDate || new Date(), Validators.required)
    });

    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {
        title: client ? 'Modifier le Client' : 'Ajouter un Client',
        form,
        onSubmit: (formValue: any) => {
          if (client) {
            this.clientService.updateClient(client.id!, formValue).subscribe(() => this.loadClients());
          } else {
            this.clientService.ONSAVE(formValue).subscribe(() => this.loadClients());
          }
        }
      }
    });
  }
}
