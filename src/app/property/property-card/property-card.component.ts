import { Component, Input } from '@angular/core';
import { Property } from 'src/app/interfaces/Property ';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css'],
})
export class PropertyCardComponent {
  @Input() Property: Property;
  @Input() hideIcons: boolean;
}
