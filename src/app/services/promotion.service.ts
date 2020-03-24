import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getPromotions(): Observable<Promotion[]> {
  return this.http.get<Promotion[]>(baseURL + 'promotions');
   // return of(PROMOTIONS).pipe(delay(2000));
   
   // return new Promise( resolve => {

    //  setTimeout(() => resolve(PROMOTIONS), 2000);
   // });
    
  }

  getPromotion(id: string): Observable<Promotion> {
  return this.http.get<Promotion>(baseURL + 'promotions/'+ id);
   // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    //return new Promise( resolve => {

     // setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
   // });
  
    
    
  }

  getFeaturedPromotion(): Observable<Promotion> {

    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map(promotion => promotion[0]));
    //  return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
   // return new Promise( resolve => {

   //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
  //  });

  }
}
