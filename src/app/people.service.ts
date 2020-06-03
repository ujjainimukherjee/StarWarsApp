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
  getPeople(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<any>(this.peopleUrl, httpOptions).pipe(
      map((response: any) => {
        return response.results.map(
          ({ name, birth_year, homeworld }) => ({
            name,
            birth_year,
            homeworld
          })
        );
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
