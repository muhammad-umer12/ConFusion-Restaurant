import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
   

  constructor(private http: HttpClient,private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishIds(): Observable<number[] | any> {
   // return of(DISHES.map(dish => dish.id ));
   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
   .pipe(catchError(error => error));
  }
  getDishes(): Observable<Dish[]> {
    
    //Promise return
  //  return new Promise(resolve => {
      // Simulate server latency with 2 second delay
        
   // });

   //Observable to promise
   return this.http.get<Dish[]>(baseURL + 'dishes')
   .pipe(catchError(this.processHTTPMsgService.handleError))
   // of(DISHES).pipe(delay(2000));
  }

  getDish(id: any): Observable<Dish> {
  //  return new Promise(resolve => {
      // Simulate server latency with 2 second delay
   //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    //});
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(DISHES.filter((dish) => (dish.id === id))[0]);
      
    
  }

  getFeaturedDish(): Observable<Dish>{ 
  //  return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
    //    setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
   // });

   //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));

   return this.http.get<Dish[]>(baseURL + 'dishs?featured=true').pipe(map(dishes => dishes[0]))
   .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
