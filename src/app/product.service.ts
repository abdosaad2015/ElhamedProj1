import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$:Observable<product[]>;
  productCollection:AngularFirestoreCollection;
  constructor(private afStore:AngularFirestore ) {
    this.products$ = this.afStore.collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }
   saveProduct(prod:product) {
     this.afStore.collection('products').add(prod);
   }
}
export interface product {
  id?:string;
  title?:string;
  price?:number;
  cat?:string;
  imageUrl?:string;
}
