import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.favorites = history.state.favorites;
  }

  goBack(): void {
    this.location.back();
  }
}
