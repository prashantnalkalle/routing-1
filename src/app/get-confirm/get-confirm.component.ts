import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-get-confirm',
  templateUrl: './get-confirm.component.html',
  styleUrls: ['./get-confirm.component.scss']
})
export class GetConfirmComponent implements OnInit {
 msg!:string
  constructor(
    private matdialogref:MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data:string
  ) { 

    
      this.msg = data
    

  }

  ngOnInit(): void {
  }

  onclose(flag:boolean){
    this.matdialogref.close(flag)
  }

}
