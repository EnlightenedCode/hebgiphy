import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Giphy } from '../giphy.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
export interface Fruit {
    name: string;
  }

@Component({
    selector: 'app-giphys-card',
    templateUrl: './giphys-card.component.html',
    styleUrls: ['./giphys-card.component.scss']
  })

export class GiphysCardComponent {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    @Input()
    giphy: Giphy;

    @Input()
    savedView: boolean;
  
    @Output('saveGiphy')
    giphyEmitter = new EventEmitter<Giphy>();

    @Output('updateGiphy')
    giphyUpdateEmitter = new EventEmitter<Giphy>();

    @Output('removeGiphy')
    giphyRemoveEmitter = new EventEmitter<Giphy>();

    addCategory(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    
        // Add our category
        console.log('adddddd');
        console.log(value.trim());
        console.log(this.giphy);
        if ((value || '').trim()) {
          this.giphy.categories.push(value.trim());
        }

        this.giphyUpdateEmitter.emit(this.giphy);
    
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
    
    removeCategory(category: string): void {
    const index = this.giphy.categories.indexOf(category);

    if (index >= 0) {
        this.giphy.categories.splice(index, 1);
    }

    this.giphyUpdateEmitter.emit(this.giphy);
    }

    saveGiphy(giphy:Giphy) {
        this.giphyEmitter.emit(giphy);
    }

    removeGiphy(giphy:Giphy) {
        this.giphyRemoveEmitter.emit(giphy);
    }
  
  }