import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Klijent } from 'src/app/models/klijent';
import { KlijentService } from 'src/app/services/klijent.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { kredit } from 'src/app/models/kredit';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit,OnDestroy {

  displayedColumns = ["id","ime","prezime","broj_lk","kredit","actions"];
  dataSource!:MatTableDataSource<Klijent>;
  subscription!:Subscription;

  constructor(private klijentService:KlijentService,
    private dialog:MatDialog ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription=this.klijentService.getAllKlijenti().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
    (error:Error) => {

      console.log(error.name + ' '+ error.message);
    });
  }

  public openDialog(flag:number,id?:number,ime?: string, prezime?:string,broj_lk?:number,kredit?:kredit) { 

    const dialogRef = this.dialog.open(KlijentDialogComponent,{data:{id,ime,prezime,broj_lk,kredit}});

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if(result==1) {

        this.loadData();
      }

    })
  }
}
