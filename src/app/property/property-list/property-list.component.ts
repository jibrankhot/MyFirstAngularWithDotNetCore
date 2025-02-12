import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from 'src/app/interfaces/Property ';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<Property>;
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    } // means we are on rent-property url or else we are on base url
    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data: Property[]) => {
        console.log(data);
        console.log(this.route.snapshot.url.toString());
        this.properties = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
