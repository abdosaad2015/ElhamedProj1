import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  catCollection:AngularFirestoreCollection;
  catDoc: AngularFirestoreDocument<cat>;
  cats$: Observable<cat[]>;
  constructor(private afStor:AngularFirestore) {
    this.catCollection = this.afStor.collection('categories', ref => ref.orderBy('name'));
    this.cats$ = this.catCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as cat;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }
   getCats() {
     return this.cats$;
   }
}
export interface cat {
  id?:string;
  name?:string;
  cat?:string;
}
