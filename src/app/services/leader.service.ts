import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader'
import { LEADERS } from '../shared/leader'
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
     
   // return of(LEADERS).pipe(delay(2000));
   return this.http.get<Leader[]>(baseURL+ 'leadership')
    
  }

  getLeader(id: string): Observable<Leader> {

     
  //  return of(LEADERS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
    
  }

  getFeaturedLeader(): Observable<Leader> {

  //  return of(LEADERS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
      return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));
  }
}
