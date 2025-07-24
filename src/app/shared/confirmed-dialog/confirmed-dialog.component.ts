import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmed-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmed-dialog.component.html',
  styleUrl: './confirmed-dialog.component.css'
})
export class ConfirmedDialogComponent {
    constructor(
    public dialogRef: MatDialogRef<ConfirmedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

