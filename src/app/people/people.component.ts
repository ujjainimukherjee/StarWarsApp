import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

import { PeopleService } from '../people.service';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass'],
})
export class PeopleComponent implements OnInit {
  people: Array<any>;
  totalCount: number;
  searchTerm$ = new Subject<string>();
  favCounter: number = 0;
  favPersons: Array<string> = [];

  constructor(
    private renderer: Renderer2,
    private peopleService: PeopleService,
    private favService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPeople();
    this.getSearchResults();
  }

  setFavoriteStatus(favorites) {
    for (let i = 0; i < favorites.length; i++) {
      let person = this.people.find((el) => el.name === favorites[i]);
      if (person){
        person.favState = true;
      }
    }
  }

  setFavorites(): void {
    const favorites = this.favService.favoriteList;
    this.favPersons = favorites;
    this.favCounter = favorites.length;
    this.setFavoriteStatus(favorites);
  }

  redirectToFavorites(): void {
    const navigationExtras: NavigationExtras = {
      state: { favorites: this.favPersons },
    };
    this.router.navigate(['Favorites'], navigationExtras);
  }

  /**
   * toggle Class when user clicks on thumbs up and thumbs down icon
   * @param event toggle
   * @param personName
   */
  toggleClass(event: any, personName: string): void {
    const tgt = event.target;
    const hasClass = tgt.classList.contains('fa-thumbs-up');
    let favorited;
    if (hasClass) {
      this.renderer.removeClass(tgt, 'fa-thumbs-up');
      this.renderer.addClass(tgt, 'fa-thumbs-down');
      this.favCounter--;
      this.favPersons = this.favPersons.filter((el) => el !== personName);
      favorited = false;
    } else {
      this.renderer.addClass(tgt, 'fa-thumbs-up');
      this.renderer.removeClass(tgt, 'fa-thumbs-down');
      this.favCounter++;
      this.favPersons.push(personName);
      favorited = true;
    }
    this.people = this.people.map((el) => {
      if (el.name === personName) {
        el.favState = favorited;
      }
      return el;
    });
    console.log('The current list of favorite persons is ', this.favPersons);
    this.favService.favoriteList = this.favPersons;
  }

  /**
   * formats the response and adds favorites fields
   * @param res
   */
  formatResponseData(res): void {
    const modResponse = res.persons.map((obj) => ({
      ...obj,
      favState: false,
    }));
    this.people = modResponse;
    this.totalCount = res.count;
    if (this.favService.favoriteList) {
      this.setFavorites();
    }
  }

  /**
   * get people on component init
   */
  getPeople(): void {
    this.peopleService.getPeople().subscribe((response) => {
     this.formatResponseData(response);
    });
  }

  /**
   * gets the list of persons based on page number
   * @param pageNum
   */
  getPageFromPeopleService(pageNum): void {
    this.peopleService.getPeople(pageNum).subscribe((response) => {
      this.formatResponseData(response);
    });
  }

  /**
   * get search results
   */
  getSearchResults(): void {
    this.peopleService.searchPeople(this.searchTerm$).subscribe((response) => {
      this.formatResponseData(response);
    });
  }
}
