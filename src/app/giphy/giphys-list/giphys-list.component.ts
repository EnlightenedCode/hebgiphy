import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Giphy } from '../giphy.model';

@Component({
    selector: 'app-giphys-list',
    templateUrl: './giphys-list.component.html',
    styleUrls: ['./giphys-list.component.scss']
  })

export class GiphysListComponent {

    @Input()
    giphyList: Giphy[];

    @Input()
    savedView: boolean;
  
    @Output('saveGiphyList')
    giphyEmitter = new EventEmitter<Giphy>();

    @Output('updateGiphyList')
    giphyUpdateEmitter = new EventEmitter<Giphy>();

    @Output('removeGiphyList')
    giphyRemoveEmitter = new EventEmitter<Giphy>();

    saveGiphy(giphy:Giphy) {
        this.giphyEmitter.emit(giphy);
    }

    updateGiphy(giphy:Giphy) {
        this.giphyUpdateEmitter.emit(giphy);
    }

    removeGiphy(giphy:Giphy) {
        this.giphyRemoveEmitter.emit(giphy);
    }
  
  }