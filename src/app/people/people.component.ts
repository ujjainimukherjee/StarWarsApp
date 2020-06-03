import { Component, OnInit, Renderer2 } from '@angular/core';
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
  favCounter: number = 0;
  favPersons: Array<string> = [];

  constructor(
    private renderer: Renderer2,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    this.getPeople();
    this.getSearchResults();
  }

  /**
   * toggle Class when user clicks on thumbs up and thumbs down icon
   * @param event toggle
   * @param personName
   */
  toggleClass(event: any, personName: string): void {
    const tgt = event.target;
    const hasClass = tgt.classList.contains('fa-thumbs-up');
    if (hasClass) {
      this.renderer.removeClass(tgt, 'fa-thumbs-up');
      this.renderer.addClass(tgt, 'fa-thumbs-down');
      this.favCounter--;
      this.favPersons = this.favPersons.filter(el => el !== personName);
    } else {
      this.renderer.addClass(tgt, 'fa-thumbs-up');
      this.renderer.removeClass(tgt, 'fa-thumbs-down');
      this.favCounter++;
      this.favPersons.push(personName);
    }
    console.log('The current list of favorite persons is ', this.favPersons);
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
