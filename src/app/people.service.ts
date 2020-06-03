import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleUrl = '/people/';
  private searchUrl = '/people/?search=';

  constructor(private http: HttpClient) {}

  /**
   * get People from swapi backend
   */
  getPeople(pageNum?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const page_number = pageNum ? pageNum : 1
    const url = `${this.peopleUrl}?page=${page_number}`;
    return this.http.get<any>(url, httpOptions).pipe(
      map((response: any) => {
        let persons = response.results.map(
          ({ name, birth_year, homeworld }) => ({
            name,
            birth_year,
            homeworld: homeworld.replace(/localhost:4200/gi, 'swapi.dev'),
          })
        );
        return { count: response.count, persons };
      }),
      catchError(this.handleError<any>('fetch people data'))
    );
  }

  /**
   * search People after debounce for
   * @param terms
   */
  searchPeople(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term))
    )
  }

  /**
   * make call to swapi api to search based on person's name
   * @param term
   */
  searchEntries(term:string): Observable<any> {
    const url = `${this.searchUrl}${term}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        let persons = response.results.map(
          ({ name, birth_year, homeworld }) => ({
            name,
            birth_year,
            homeworld: homeworld.replace(/localhost:4200/gi, 'swapi.dev'),
          })
        );
        return { count: response.count, persons };
      }),
      catchError(this.handleError<any>('fetch people data'))
    );

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
