import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/shared/services/map.service'
import { GeoJson, FeatureCollection } from '../map';


@Component({
  selector: 'app-map',
  providers:  [ MapService ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
  
})

export class MapComponent implements OnInit {
  //click function
  clickMessage = '';
  
  onClickMe() {
    this.clickMessage = '{phoneNumber}';
  }
  
  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/satellite-v9';
  lat = 46;
  lng = 6.5;
  name = '';
  support ='';
  color = '';
  phoneNumber ='';
  message = '';
  
  

  // data
  source: any;
  markers: any;
  
  
  constructor(private mapService: MapService) { } 
  
  ngOnInit() {
    this.markers = this.mapService.getMarkers()
    this.initializeMap()
  }
  
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());
    // Add geolocate control to the map.
    this.map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    })
    );
    
    //// Add Marker on Click
    this.map.on('click', (event) => {
  const coordinates = [event.lngLat.lng, event.lngLat.lat]
  const newMarker   = new GeoJson(coordinates, { message: this.message, name: this.name, phoneNumber: this.phoneNumber, support: this.support, color: this.color})
  this.mapService.createMarker(newMarker)
})
/// Add realtime firebase data on map load
this.map.on('load', (event) => {

  /// register source
  this.map.addSource('firebase', {
     type: 'geojson',
     data: {
       type: 'FeatureCollection',
       features: []
     }
  });
  /// get source
  this.source = this.map.getSource('firebase')

  /// subscribe to realtime database and set data source
  this.markers.subscribe(markers => {
      let data = new FeatureCollection(markers)
      this.source.setData(data)
  })
  
  /// create map layers with realtime data
  this.map.addLayer({
    id: 'firebase',
    source: 'firebase',
    type: 'symbol',
    layout: {
      'text-field': '{name} {support} {message} ',
      'text-size': 20,
      'text-transform': 'uppercase',
      'icon-image': 'swimming-15',
      'text-offset': [0, 1.5]
    },
    paint: {
      'text-color': '#FF0000',
      'text-halo-color': '#fff',
      'text-halo-width': 1
    }
  })
})

}

/// Helpers

removeMarker(marker) {
  this.mapService.removeMarker(marker.$key)
}

flyTo(data: GeoJson) {
  this.map.flyTo({
    center: data.geometry.coordinates
  })
}
}
