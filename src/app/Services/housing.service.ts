// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
// import { BasePropertyInterface } from '../interfaces/property-Baseinterface';
// import { PropertyInterface } from '../interfaces/property-interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class HousingService {
//   constructor(private http: HttpClient) {}

//   getAllProperties(Purchaseable: number): Observable<BasePropertyInterface[]> {
//     return this.http.get<PropertyInterface>('data/properties.json').pipe(
//       map((data) => {
//         const propertiesArray: Array<PropertyInterface> = [];
//         for (const id in data) {
//           if (
//             data.hasOwnProperty(id) &&
//             +data[id].Purchaseable === Purchaseable
//           ) {
//             propertiesArray.push(data[id]);
//           }
//         }
//         return propertiesArray;
//       }),
//       return this.http.get<[PropertyInterface[]]>('data/properties.json');
//     );

//   }
//   addProperty(property: PropertyInterface) {
//     localStorage.setItem('newProp', JSON.stringify(property));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BasePropertyInterface } from '../interfaces/property-Baseinterface';
import { PropertyInterface } from '../interfaces/property-interface';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(Purchaseable: number): Observable<BasePropertyInterface[]> {
    return this.http
      .get<PropertyInterface[]>('data/properties.json')
      .pipe(
        map((data) =>
          data.filter((property) => +property.Purchaseable === Purchaseable)
        )
      );
  }

  addProperty(property: PropertyInterface) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }
}
