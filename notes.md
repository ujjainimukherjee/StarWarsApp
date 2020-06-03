# Fetch People data

The Url needed is https://swapi.dev/api/people 

Created a service 'people.service.ts' to fetch people data from swapi. To get rid of CORS issue while calling to the external Star Wars API, added  a 'proxy.conf.json' file and added it's reference in 'angular.json'.

# Add Pagination

Used Angular BootStrap Pagination component - https://ng-bootstrap.github.io/#/components/pagination/overview

A sample url to get persons list using a page number is - https://swapi.dev/api/people/?page=4
This url was used in 'people.service.ts'.

# Add Search Functionality

A sample url for search for a person named 'Walker' is - https://swapi.dev/api/people/?search=walker

This has been implemented in 'people.service.ts'.

For performance improvement in search- to prevent API calls everytime a user types something, 
3 'rxjs' operators have been used

- debounce to provide delay of 300 ms
- distinctUntilChanged  and switchMap

# Add a favorites Counter

Added a font awesome icon as a favorites indicator for each person. At the time of page load, all the icons show thumbs down because nothing has been added to favorites.
When someone clicks on thumbs down, it becomes thumbs up, the person is added to in memory Favorites list and counter increases by 1.
When someone clicks on thumbs up, it becomes thumbs down, the person is removed from in memory Favorites list and counter decreases by 1

The list of Favorite persons is stored in memory on client side in 'favPersons' array in people.component.ts
