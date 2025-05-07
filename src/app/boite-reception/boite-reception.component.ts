import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Email } from 'src/Modeles/Email';
import { BoiteReceptionService } from 'src/Services/boite-reception.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-boite-reception',
  templateUrl: './boite-reception.component.html',
  styleUrls: ['./boite-reception.component.css']
})
export class BoiteReceptionComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'objet', 'message', 'actions'];
  dataSource = new MatTableDataSource<Email>([]);

  constructor(private emailService: BoiteReceptionService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmails();
  }

  loadEmails() {
    this.emailService.getAllEmails().subscribe((emails) => {
      this.dataSource.data = emails;
    });
  }

  delete(id: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.emailService.deleteEmail(id).subscribe(() => {
          this.loadEmails();
        });
      }
    });
  }

}
