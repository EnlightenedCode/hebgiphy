import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiphysHomeComponent } from './giphys-home/giphys-home.component';
import { GiphysSavedComponent } from './giphys-saved/giphys-saved.component';

const routes: Routes = [
  { path: '', component: GiphysHomeComponent },
  { path: 'saved', component: GiphysSavedComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiphyRoutingModule { }

