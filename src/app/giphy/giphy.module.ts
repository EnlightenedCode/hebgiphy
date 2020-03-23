import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiphyRoutingModule } from './giphy-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GiphysHomeComponent } from './giphys-home/giphys-home.component';
import { GiphysCardComponent } from './giphys-card/giphys-card.component';
import { GiphysListComponent } from './giphys-list/giphys-list.component';
import { GiphysSavedComponent } from './giphys-saved/giphys-saved.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    GiphysHomeComponent,
    GiphysCardComponent,
    GiphysSavedComponent,
    GiphysListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    GiphyRoutingModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: []
})
export class GiphyModule {}
