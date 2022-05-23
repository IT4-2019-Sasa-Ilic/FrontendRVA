import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KLIJENT_URL } from '../app.constants';
import { Klijent } from '../models/klijent';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  constructor(private httpClient:HttpClient) { }

public getAllKlijenti(): Observable <any> {

    return this.httpClient.get(`${KLIJENT_URL}`);
}

public addKlijent(klijent:Klijent):Observable <any> {

  klijent.id=355;
  return this.httpClient.post(`${KLIJENT_URL}`,klijent);
}
public updateKlijent(klijent:Klijent):Observable <any> {

return this.httpClient.put(`${KLIJENT_URL}`,klijent);
}
public deleteKlijent(id:number):Observable<any> {

return this.httpClient.delete(`${KLIJENT_URL}/${id}`);
}
}
