import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { collection, Firestore, doc, setDoc } from '@angular/fire/firestore';
import { user } from 'rxfire/auth'
import { docData } from 'rxfire/firestore';
import { from, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private db: Firestore) { }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  signup(email: string, password: string, payload: User){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(tap(creds => {
      payload.uid = creds.user.uid

      const users = collection(this.db, 'users') // criando referencia para coleção users
      const userDoc = doc(users, payload.uid) // criando documento cuja chave é o id do usuario

      setDoc(userDoc, payload) // recebe um documento e define quais sao os dados (usa os dados da interface)
    }))
    }

    get user(){
      return user(this.auth).pipe(switchMap((user) => {
        if(user) {
          return this.getUserData(user.uid)
        }
        return of(undefined)
      }))
    }

    private getUserData(uid: string){
      const users = collection(this.db, 'users');
      const userDoc = doc(users, uid);

      return docData(userDoc).pipe(map((data) => data as User)); // mapeia e retorna um observable de user

    }
}
