import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertUtilService {

  constructor(private snackBar: MatSnackBar) { }

  showAlert(message: string): void {
    this.snackBar.open(message, 'X', {
      panelClass: 'info-alert',
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

  showErrorAlert(message: string): void {
    this.snackBar.open(message, 'X', {
      panelClass: 'error-alert',
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
    })
  }

}
