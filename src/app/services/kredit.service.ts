import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { KREDIT_URL } from '../app.constants';
import { kredit } from '../models/kredit';

@Injectable({
  providedIn: 'root'
})
export class KreditService {

  constructor(private httpClient:HttpClient) { }

  public getAllKrediti(): Observable <any> {

    return this.httpClient.get(`${KREDIT_URL}`);
}
  public addKredit(kredit:kredit):Observable <any> {

    kredit.id=355;
    return this.httpClient.post(`${KREDIT_URL}`,kredit);
}
  public updateKredit(kredit:kredit):Observable <any> {

  return this.httpClient.put(`${KREDIT_URL}`,kredit);
}
  public deleteKredit(id:number):Observable<any> {

  return this.httpClient.delete(`${KREDIT_URL}/${id}`);
}

}
