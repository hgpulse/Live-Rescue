import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotsService } from 'src/app/shared/services/spots.service'

class item {
  constructor(public title) { }
}

@Component({
  selector: 'app-list',
  templateUrl: "list.component.html",
  styleUrls: ['list.component.css']
})
export class ListComponent {
  title = 'Live position Data'
  items: Observable<any[]>;
  spot: string;
  constructor(private spotsService: SpotsService) {
   
      this.items = this.spotsService.getSpots();
      
    
  
  }

}