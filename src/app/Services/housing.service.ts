import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../interfaces/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../interfaces/Property ';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>('http://localhost:5000/api/city/cities');
  }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<IPropertyBase> = [];

        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }
  addProperty(property: Property) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }
}
