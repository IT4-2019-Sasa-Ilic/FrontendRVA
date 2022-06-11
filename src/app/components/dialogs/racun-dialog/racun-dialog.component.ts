import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Racun } from 'src/app/models/racun';
import { tip_racuna } from 'src/app/models/tip_racuna';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaServices } from 'src/app/services/tip_racuna.services';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit,OnDestroy {

  flag!:number;
  tipoviRacuna!:tip_racuna[];
  subscription!:Subscription;

  constructor(public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<RacunDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:Racun,
    public racunService:RacunService,
    public tipRacunaService:TipRacunaServices) { }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.tipRacunaService.getAllTip_Racuna().subscribe(data => {
     this.tipoviRacuna = data;
  })
 
  }

  compareTo(a:any,b:any) {
    return a.id == b.id;

  }

  public add():void  {

    this.racunService.addRacun(this.data).subscribe(() => {

      this.snackBar.open('Uspešno dodat racun ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom dodavanja racuna','CLOSE',{duration:2500 })

    });
  }
  public update():void  {

    this.racunService.updateRacun(this.data).subscribe(() => {

      this.snackBar.open('Uspešno izmenjen racun ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom izmene racuna','CLOSE',{duration:2500 })

    });
  }
  public delete():void  {

    this.racunService.deleteRacun(this.data.id).subscribe(() => {

      this.snackBar.open('Uspešno obrisan racun ' + this.data.naziv,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom brisanja racuna','CLOSE',{duration:2500 })

    });
  }

  public cancel():void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene','OK',{duration:1000 });
  }


}
