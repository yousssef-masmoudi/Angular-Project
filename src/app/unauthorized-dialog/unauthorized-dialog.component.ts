import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized-dialog',
  template: `
    <h2 mat-dialog-title>Accès Non Autorisé</h2>
    <mat-dialog-content>
      <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
    }
    h2 {
      color: #f44336;
      margin: 0 0 16px;
    }
  `]
})
export class UnauthorizedDialogComponent {
  constructor(public dialogRef: MatDialogRef<UnauthorizedDialogComponent>) {}
}
