import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/Services/housing.service';
import { Property } from 'src/app/interfaces/Property ';
import { IPropertyBase } from 'src/app/interfaces/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IPropertyBase[];
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString()) {
      if (this.route.snapshot.url.toString() == 'rent-property') { this.SellRent = 2; } else { this.SellRent = 1 }

    } // means we are on rent-property url or else we are on base url
    this.housingService.getAllProperties(this.SellRent).subscribe(
      (data) => {
        this.properties = data;
        const newProperty = JSON.parse(localStorage.getItem('newProp'));
        if (newProperty.SellRent == this.SellRent) { this.properties = [newProperty, ...this.properties] }
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}
