import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class SpotsService {
  constructor(private db: AngularFireDatabase) { }
  getSpots(){
    return  this.db.list('/spotsPosition/kitefoil').valueChanges();
    //this.items = db.list('/spotsPosition').valueChanges();
  }
}
