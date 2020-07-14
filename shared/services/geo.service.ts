import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {environment} from 'src/environments/environment'

import { GeoFire } from "geofire";
import { BehaviorSubject } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  
  dbRef: any;
  GeoFire: any;

  hits = new BehaviorSubject([])

  constructor(private db: AngularFireDatabase) { 
    /// Map API
    mapboxgl.accessToken = environment.mapbox.accessToken
    
    ///reference databse location for Geofire
    this.dbRef = this.db.list('/spotsPosition/kitefoil');
    this.GeoFire = new GeoFire(this.dbRef.$ref);

  }
  
  // write data
  setLocation(key:string, coords: Array<number>) {
    this.GeoFire.set(key, coords)
      .then(_=> console.log('location updated'))
      .catch(err => console.log(err))
  }
    //query database for nearby locations
    getLocations(radius: number, coords: Array<number>) {
      this.GeoFire.query({
        center: coords,
        radius: radius
      })
      .on('key_entered', (key, location, distance)=>{
        let hit = {
          location: location,
          distcance: distance
        }
        let currentHits = this.hits.value
        currentHits.push(hit)
        this.hits.next(currentHits)
      })
    }


}
