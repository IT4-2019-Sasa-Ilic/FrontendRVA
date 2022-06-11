import { Klijent } from "./klijent";
import { tip_racuna } from "./tip_racuna";

export class Racun {
    id!:number;
    naziv!: string;
    oznaka!:string;
    opis!:string;
    klijent!:Klijent;
    tipRacuna!:tip_racuna;
}