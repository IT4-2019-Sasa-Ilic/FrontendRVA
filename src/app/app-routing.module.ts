import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AutorComponent } from './components/core/autor/autor.component';
import { HomeComponent } from './components/core/home/home.component';
import { KlijentComponent } from './components/klijent/klijent.component';
import { RacunComponent } from './components/racun/racun.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';

const routes: Routes = [
 { path: 'klijent', component: KlijentComponent },
 { path: 'racun', component: RacunComponent },
 { path: 'tipRacuna', component: TipRacunaComponent },
 { path: 'home', component: HomeComponent},
 { path: 'about', component: AboutComponent},
 { path: 'autor', component: AutorComponent},
 { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
