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
  selector: 'app-giphys-home',
  templateUrl: './giphys-home.component.html',
  styleUrls: ['./giphys-home.component.scss']
})
export class GiphysHomeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  searchedGiphys: Giphy[] = [];
  sub: Subscription;

  constructor(public giphyService: GiphyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
        search: ['', [Validators.required]],
        limit: ['30', [Validators.required]]
      });
  }

  get search() {
    return this.form.get('search');
  }

  get limit() {
    return this.form.get('limit');
  }

  onSubmit() {
      const searchValue = this.search.value;
      const limitValue = this.limit.value;
      this.searchedGiphys = [];
      const promises = zip(this.giphyService.getGiphysBySearch(searchValue, limitValue), 
      this.giphyService.getUserSavedGiphys());
      this.sub = promises.subscribe(([searchGiphys, savedGiphys]) => {
        searchGiphys.data.map((gif: any) => {
            const searchedGif: Giphy = {};
            searchedGif.gifId = gif.id;
            searchedGif.url = gif.images.original.url;
            searchedGif.title = gif.title;
            if (savedGiphys.map((item) => item.gifId).includes(gif.id)) {
                searchedGif.saved = true;
            }
            this.searchedGiphys.push(searchedGif);
        });
      });
  }

  saveGiphy(giphy: Giphy) {
      giphy.saved = true;
      giphy.categories = [];
      this.giphyService.saveGiphy(giphy);
  }

  ngOnDestroy() {
    if(this.sub) {
        this.sub.unsubscribe();
    }
  }
}
