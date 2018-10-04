import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreCollection ,AngularFirestoreDocument} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection:AngularFirestoreCollection<user>;
  userDoc:AngularFirestoreDocument<user>;
  users$:Observable<user[]>;
  constructor(private aFireStore: AngularFirestore) { 
    this.userCollection =this.aFireStore.collection('users');
    this.users$ = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as user;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  save(user: firebase.User) {
   this.aFireStore.doc(`users/`+user.uid).set({
     name:user.displayName,
     email:user.email,
     roles: {
      isAdmin:true,
    isStoreManager:true
    },
    operation: {
      canCreate:true,
      canUpdate:true,
      canRead:true,
      canDelete:true
    }
   });
  }
  getUser(uid :string):Observable<user> {
    return this.aFireStore.doc<user>('users/'+uid).valueChanges();
  }
}
export interface user {
  id?:string;
  name?:string;
  email?:string;
  roles?: {
    isAdmin:boolean;
  isStoreManager:boolean;
  }
  operation?: {
    canCreate:boolean,
    canUpdate:boolean,
    canRead:boolean,
    canDelete:boolean
  }
}
