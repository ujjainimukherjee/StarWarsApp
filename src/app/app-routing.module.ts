import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'Favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
