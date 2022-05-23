import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {

  public flag!:number;

  constructor(public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<KreditDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:kredit,
    public kreditService:KreditService ) { }


  ngOnInit(): void {
  }

  public add():void  {

    this.kreditService.addKredit(this.data).subscribe(() => {

      this.snackBar.open('Uspešno dodat kredit ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom dodavanja kredita','CLOSE',{duration:2500 })

    });
  }

  public update():void  {

    this.kreditService.updateKredit(this.data).subscribe(() => {

      this.snackBar.open('Uspešno izmenjen kredit ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom izmene kredita','CLOSE',{duration:2500 })

    });
  }
  public delete():void  {

    this.kreditService.deleteKredit(this.data.id).subscribe(() => {

      this.snackBar.open('Uspešno obrisan kredit ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom brisanja kredita','CLOSE',{duration:2500 })

    });
  }

  public cancel():void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene','OK',{duration:1000 });
  }
}
