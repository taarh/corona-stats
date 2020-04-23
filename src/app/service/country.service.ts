import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../entities/country';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private coronaUrl = 'http://api.coronastatistics.live/countries';  // URL to web api

  constructor(private http:HttpClient) { }

  /** GET heroes from the server */
  getCountries (): Observable< Country[]> {
   
    return this.http.get<Country[]>(`${this.coronaUrl}`)
  }
  
searchCountry(term: string): Observable<Country> {
 /* if (!term.trim()) {
    // if not search term, return empty hero array.
    return this.http.get<Country[]>(this.coronaUrl);
  }*/
  return this.http.get<Country>(`${this.coronaUrl}/${term}`);
}
}
