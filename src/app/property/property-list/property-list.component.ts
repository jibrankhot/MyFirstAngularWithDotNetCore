import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent {
  Property: any = [
    {
      Id: 1,
      Name: 'Birla House',
      Type: 'House',
      Price: 120000,
    },
    {
      Id: 2,
      Name: 'Erose Villa',
      Type: 'Villa',
      Price: 420000,
    },
    {
      Id: 3,
      Name: 'Macro Home',
      Type: 'House',
      Price: 220000,
    },
    {
      Id: 4,
      Name: 'Pearl White House',
      Type: 'House',
      Price: 360000,
    },
  ];
}
