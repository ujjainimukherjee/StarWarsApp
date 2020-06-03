# Fetch People data
The Url needed is https://swapi.dev/api/people 

Created a service 'people.service.ts' to fetch people data from swapi. To get rid of CORS issue while calling to the external Star Wars API, added  a 'proxy.conf.json' file and added it's reference in 'angular.json'.

# Add Pagination

Used Angular BootStrap Pagination component - https://ng-bootstrap.github.io/#/components/pagination/overview

A sample url to get persons list using a page number is - https://swapi.dev/api/people/?page=4
This url was used in 'people.service.ts'.

