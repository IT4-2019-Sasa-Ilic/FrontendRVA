import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';
import { KreditDialogComponent } from '../dialogs/kredit-dialog/kredit-dialog.component';

@Component({
  selector: 'app-kredit',
  templateUrl: './kredit.component.html',
  styleUrls: ['./kredit.component.css']
})
export class KreditComponent implements OnInit,OnDestroy {

  displayedColumns = ["id","naziv","oznaka","opis","actions"];
  dataSource!:MatTableDataSource<kredit>;
  subscription!:Subscription;

  constructor(private kreditService:KreditService,
    private dialog:MatDialog ) { }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    public loadData() {
      this.subscription=this.kreditService.getAllKrediti().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      },
      (error:Error) => {
  
        console.log(error.name + ' '+ error.message);
      });
    }

    public openDialog(flag:number,id?:number,naziv?: string, oznaka?:string,opis?:string) { 

      const dialogRef = this.dialog.open(KreditDialogComponent,{data:{id,naziv,oznaka,opis}});
  
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
        if(result==1) {
  
          this.loadData();
        }
  
      })
    }

  ngOnInit(): void {
    this.loadData();
  }

}
