# Use Cases

* To start the app type 'ng serve'
* http://localhost:4200/ is the home page. It shows the list of users from star wars API. It will show 10 records only.
* To see more records, use the Pagination component at the bottom which will fetch 10 records at a time from SWAPI
* You can also search using any user name. eg. as you type - 'Skywalker' you will see only 3 records which contain the name 'Skywalker'
* All records have a thumbs down icon beside them. If you click on any icon, the icon changes to thumbs up and 
  - the counter button has it's value incremented by 1.
  - the  person who has been favorited, is added to the favorites list
* The thumbs up/thumbs down icon may be clicked to toggle the states between favorite and not favorite
* If you click on the 'Counter' button, you will be redirected to the 'Favorites' page,  which shows the list of Favorite  people
* There is a 'Go Back' button which will take the user back to the first page. State is maintained between 2 pages.

# Fetch People data

The Url needed is https://swapi.dev/api/people 

Created a service 'people.service.ts' to fetch people data from swapi. To get rid of CORS issue while calling to the external Star Wars API, added  a 'proxy.conf.json' file and added it's reference in 'angular.json'.

# Add Pagination

Used Angular BootStrap Pagination component - https://ng-bootstrap.github.io/#/components/pagination/overview

A sample url to get persons list using a page number is - https://swapi.dev/api/people/?page=4
This url was used in 'people.service.ts' to fetch data.

# Add Search Functionality

A sample url for search for a person named 'Walker' is - https://swapi.dev/api/people/?search=walker
This functionality has been implemented in 'people.service.ts'.

For performance improvement in search-(i.e. to prevent API calls everytime a user types something), 
3 'rxjs' operators have been used

- debounce to provide delay of 300 ms
- distinctUntilChanged  and switchMap

# Add a favorites Counter

Added a 'font awesome' icon as a favorites indicator for each person. At the time of page load, all the icons show thumbs down because nothing has been added to favorites.
When someone clicks on thumbs down, it becomes thumbs up, the person is added to in memory Favorites list and counter increases by 1.
When someone clicks on thumbs up, it becomes thumbs down, the person is removed from in memory Favorites list and counter decreases by 1

The list of Favorite persons is stored in memory on client side in 'favPersons' array in 
'people.component.ts'

# Redirect to Favorites Page

For redirection, I have used Angular Router.
I have created a 'Favorites' Component.
'http://localhost:4200' takes user to first page
'http://localhost:4200/Favorites' takes user to Favorites page.
In the first page, I have added a counter button on the right. When user marks some user as favorite, the counter increases. When user clicks on the button, (s)he goes to 'Favorites' page. This page will show the list of Favorite people. The Favorites page also has a back button which will take the user to the previous page.
To maintain state between 2 components, I have used a service - 'favorites.service.ts'

# Items I could not finish

* Sort the favorites list with drag and drop
* Show a loading spinner when page loads


