import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackbar:MatSnackBar
  ) { }

  opensnackbar(msg:string) {
    this.snackbar.open(msg,'close',{
      duration:3000,
      verticalPosition:'bottom',
      horizontalPosition:'center'
    })
  }


}
