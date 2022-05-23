import { Component, Inject, OnInit } from '@angular/core';
import { Klijent } from 'src/app/models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { kredit } from 'src/app/models/kredit';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {


  public flag!:number;
  krediti!: kredit[];

  constructor(public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<KlijentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:Klijent,
    public klijentService:KlijentService,
    public kreditService:KreditService) { }



  ngOnInit(): void {

    this.kreditService.getAllKrediti().subscribe(kreditiIzBaze => {

      this.krediti =kreditiIzBaze;
    })
  }

  compareTo(a:any,b:any) {
    return a.id == b.id;

  }

  public add():void  {

    this.klijentService.addKlijent(this.data).subscribe(() => {

      this.snackBar.open('Uspešno dodat klijent ' + this.data.ime + ' '+ this.data.prezime,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom dodavanja tipa racuna','CLOSE',{duration:2500 })

    });
  }
  public update():void  {

    this.klijentService.updateKlijent(this.data).subscribe(() => {

      this.snackBar.open('Uspešno izmenjen klijent ' + this.data.ime + ' '+ this.data.prezime,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom izmene tipa racuna','CLOSE',{duration:2500 })

    });
  }
  public delete():void  {

    this.klijentService.deleteKlijent(this.data.id).subscribe(() => {

      this.snackBar.open('Uspešno obrisan tip računa' + this.data.ime + ' '+ this.data.prezime,'OK',{duration:2500 })
    },
    (error:Error)=> {
      this.snackBar.open('Doslo je do greske prilikom brisanja klijenta','CLOSE',{duration:2500 })

    });
  }

  public cancel():void {

    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene','OK',{duration:1000 });
  }

}
