import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TIP_RACUNA_URL } from "../app.constants";
import { tip_racuna } from "../models/tip_racuna";

@Injectable ({
providedIn: "root"
})

export class TipRacunaServices  {

    constructor(private httpClient:HttpClient) { }

    public getAllTip_Racuna(): Observable <any> {

        return this.httpClient.get(`${TIP_RACUNA_URL}`);
    }
    public addTipRacuna(tip_racuna:tip_racuna):Observable <any> {

        tip_racuna.id=355;
        return this.httpClient.post(`${TIP_RACUNA_URL}`,tip_racuna);
    }
    public updateTipRacuna(tip_racuna:tip_racuna):Observable <any> {

        return this.httpClient.put(`${TIP_RACUNA_URL}`,tip_racuna);
    }
    public deleteTipRacuna(id:number):Observable<any> {

        return this.httpClient.delete(`${TIP_RACUNA_URL}/${id}`);
    }
}

