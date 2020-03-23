import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, zip } from 'rxjs';
import {
    FormBuilder,
    FormGroup,
    Validators
  } from '@angular/forms';
import { Giphy } from '../giphy.model';
import { GiphyService } from '../giphy.service';
import { GiphyModule } from '../giphy.module';

@Component({
  selector: 'app-giphys-saved',
  templateUrl: './giphys-saved.component.html',
  styleUrls: ['./giphys-saved.component.scss']
})
export class GiphysSavedComponent implements OnInit, OnDestroy {
  form: FormGroup;
  savedGiphys: Giphy[] = [];
  filteredGiphys: Giphy[] = [];
  categories: string[] = [];
  sub: Subscription;

  constructor(public giphyService: GiphyService) {}

  ngOnInit() {
    this.sub = this.giphyService.getUserSavedGiphys().subscribe((giphys) => {
        this.savedGiphys = giphys;
        this.filteredGiphys = giphys;
        this.categories = giphys.map(item => item.categories).reduce((a, b) => Array.from(new Set(a.concat(b)))).filter(cat => cat !== undefined);
        this.categories.push('All');
    });
  }

  filterSavedList(category: any) {
    if(category === 'All') {
      this.filteredGiphys = [...this.savedGiphys];
    } else {
      this.filteredGiphys = this.savedGiphys.filter((giphy) => giphy.categories.includes(category));
    }
  }

  updateGiphy(giphy: Giphy) {
      this.giphyService.updateGiphy(giphy);
  }

  removeGiphy(giphy: Giphy) {
    this.giphyService.deleteGiphy(giphy.id);
}

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
