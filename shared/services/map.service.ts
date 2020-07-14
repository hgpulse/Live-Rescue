import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment'
import { AngularFireDatabase } from '@angular/fire/database';


//init map API key
import { GeoJson } from 'src/app/map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {
  constructor(private db: AngularFireDatabase) {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }


  getMarkers(){
    
    return this.db.list('/Rescue/zone0/connectedUser').valueChanges();
  }
  
  createMarker(data: GeoJson) {
    return this.db.list('/Rescue/zone0/connectedUser')
                  .push(data)
  }

  removeMarker($key: string) {
    return this.db.object('/Rescue/zone0/connectedUser' + $key).remove()
  }

}