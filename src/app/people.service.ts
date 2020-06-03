import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleUrl = '/people/';

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


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
