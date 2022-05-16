import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { tip_racuna } from 'src/app/models/tip_racuna';
import { TipRacunaServices } from 'src/app/services/tip_racuna.services';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit,OnDestroy {

  displayedColumns = ["id","naziv","oznaka","opis","actions"];
  dataSource!:MatTableDataSource<tip_racuna>;
  subscription!:Subscription;

  constructor(private tipRacunaService:TipRacunaServices,
    private dialog:MatDialog) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription=this.tipRacunaService.getAllTip_Racuna().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
    (error:Error) => {

      console.log(error.name + ' '+ error.message);
    });
  }
//znak ? posle id govori o tome da je id opcioni parametar
  public openDialog(flag:number,id?:number,naziv?: string, oznaka?:string,opis?:string) { 

    const dialogRef = this.dialog.open(TipRacunaDialogComponent,{data:{id,naziv,oznaka,opis}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result==1) {

        this.loadData();
      }

    })
  }

}

