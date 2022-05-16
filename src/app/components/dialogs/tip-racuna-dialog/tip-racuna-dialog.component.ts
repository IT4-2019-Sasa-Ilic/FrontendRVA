import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tip_racuna } from 'src/app/models/tip_racuna';
import { TipRacunaServices } from 'src/app/services/tip_racuna.services';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag!:number;

  constructor(public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<TipRacunaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:tip_racuna,
    public tipRacunaServices:TipRacunaServices ) { }

  ngOnInit(): void {
  }

  public add():void  {

    this.tipRacunaServices.addTipRacuna(this.data).subscribe(() => {

      this.snackBar.open('Uspešno dodat tip računa' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom dodavanja tipa racuna','CLOSE',{duration:2500 })

    });
  }
  public update():void  {

    this.tipRacunaServices.updateTipRacuna(this.data).subscribe(() => {

      this.snackBar.open('Uspešno izmenjen tip računa' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom izmene tipa racuna','CLOSE',{duration:2500 })

    });
  }
  public delete():void  {

    this.tipRacunaServices.deleteTipRacuna(this.data.id).subscribe(() => {

      this.snackBar.open('Uspešno obrisan tip računa' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom brisanja tipa racuna','CLOSE',{duration:2500 })

    });
  }

  public cancel():void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene','OK',{duration:1000 });
  }

}
