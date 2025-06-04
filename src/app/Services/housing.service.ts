import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../interfaces/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../interfaces/Property ';
import { City } from '../interfaces/city';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) { }
  baserUrl = environment.BaseUrl

  getAllCities(): Observable<City[]> {
    debugger
    return this.http.get<City[]>(this.baserUrl + 'api/city/cities');
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
