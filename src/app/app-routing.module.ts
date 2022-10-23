import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      {
        path: 'business',
        component: DetailPageComponent,
      }])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
