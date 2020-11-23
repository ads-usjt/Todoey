import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertUtilService {

  constructor(private snackBar: MatSnackBar){}

  showAlert(message: string, isError = false): void {
    this.snackBar.open(message, 'X', {
      panelClass: isError ? 'error-alert' : 'info-alert',
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: window.innerWidth >= 468 ? 'top' : 'bottom',
    });
  }

  showErrorAlert(message: string): void {
    this.showAlert(message, true);
  }

}
