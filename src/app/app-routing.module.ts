import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'country/:name', component : CountryComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
