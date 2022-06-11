import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { tip_racuna } from 'src/app/models/tip_racuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit,OnDestroy,OnChanges {

  displayedColumns = ["id","naziv","oznaka","opis","tipRacuna","klijent","actions"];
  dataSource!:MatTableDataSource<Racun>;
  subscription!:Subscription;

  @ViewChild(MatSort,{static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  @Input() selektovanKlijent!:Klijent;
  constructor(private racunService:RacunService,
    private dialog:MatDialog ) { }

  ngOnChanges(): void {
    if(this.selektovanKlijent!=null)
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription=this.racunService.getRacunByKlijentID(this.selektovanKlijent.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    (error:Error) => {

      console.log(error.name + ' '+ error.message);
    });
  }

  public openDialog(flag:number,id?:number,naziv?:string,oznaka?: string, opis?:string,tipRacuna?:tip_racuna,klijent?:Klijent) { 
    const dialogRef = this.dialog.open(RacunDialogComponent,{data:{id,naziv,oznaka,opis,tipRacuna,klijent}});

    dialogRef.componentInstance.flag = flag;
    if(flag==1) {

      dialogRef.componentInstance.data.klijent = this.selektovanKlijent;
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result==1) {

        this.loadData();
      }

    })


  }

  applyFilter(filterValue:any ){
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
