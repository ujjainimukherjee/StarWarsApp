import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent implements OnInit {
  people: Array<object>;
  totalCount: number;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getPeople();
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
