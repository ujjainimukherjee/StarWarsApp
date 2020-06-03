import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent implements OnInit {
  people: Array<object>;
  totalCount: number;
  searchTerm$ = new Subject<string>();

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getPeople();
    this.getSearchResults();
  }

  /**
   * get search results
   */
  getSearchResults(): void {
    this.peopleService.searchPeople(this.searchTerm$).subscribe((response) => {
      this.people = response.persons;
      this.totalCount = response.count;
    });
  }


  /**
   * get people on component init
   */
  getPeople(): void {
    this.peopleService.getPeople().subscribe((response) => {
      this.people = response.persons;
      this.totalCount = response.count;
    });
  }

  /**
   * gets the list of persons based on page number
   * @param pageNum
   */
  getPageFromPeopleService(pageNum): void {
    this.peopleService.getPeople(pageNum).subscribe((response) => {
      this.people = response.persons;
      this.totalCount = response.count;
    });
  }
}
