import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Giphy } from './giphy.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private http: HttpClient) {}

  /**
   * Saves a new giphy for the current user
   */
  async saveGiphy(data: Giphy) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('giphys').add({
      ...data,
      uid: user.uid
    });
  }

  /**
   * Updates a giphy for the current user
   */
  async updateGiphy(data: Giphy) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('giphys').doc(data.id).update({
      ...data,
      uid: user.uid
    });
  }

  /**
   * Get all saved giphys owned by current user
   */
  getUserSavedGiphys() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Giphy>('giphys', ref =>
              ref.where('uid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
    );
  }

  /**
   * Delete Giphy
   */
  deleteGiphy(giphyId: string) {
    return this.db
      .collection('giphys')
      .doc(giphyId)
      .delete();
  }

  /**
   * Search GiphyAPI
   */
  getGiphysBySearch(search: string, limit: string) {
    let apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=FM0wBldKaV3TN9KoQKPBPkb3hgPqdNZB&q=' + search + '&limit=' + limit + '&offset=0&rating=G&lang=en';
    return this.http.get<IGifs>(apiUrl);
  }
}

interface IGifs {
    data: Array<object>;
}