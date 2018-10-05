import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<product[]>;
  constructor(private afStore: AngularFirestore) {
    this.products$ = this.afStore.collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  createProduct(product: product) {
    this.afStore.collection('products').add(product);
  }
  deletProduct(id: string) {
    this.afStore.doc('products/id').delete();
  }
  getProduct(id: string): Observable<product> {
    return this.afStore.doc('products/id').valueChanges();
  }
  getAllProduct(): Observable<product[]> {
    return this.products$;
  }
}
export interface product {
  id?: string;
  category?: string;
  imageUrl?: string;
  price?: number;
  title?: string;
}