# ForestR:
The goal for this project was to develop an application that would allow a user to find national parks based on current location. This project uses the Bulma framework, National Parks Service API (https://www.nps.gov/subjects/developer/index.htm), Mapquest API (https://developer.mapquest.com/), and IPAPI (https://ipapi.co/). Background image by Marvin Laput Tenepre, 2020.

The User Story for this project was as follows: 

```
AS A person who wants to get out of hte house
I WANT TO find the closest park near me
SO THAT I can plan a day trip
```

The acceptance criteria were as follows: 

```
GIVEN I am looking for a park to go to
WHEN I open the app
THEN I AM presented with the five closest parks near me
WHEN I click on a park location on a map
THEN I get more information about the park presented on a modal
```

## APIs to be used

The National Parks Service API  was used for information on parks based on state. 

The MapQuest API was used to find things that can be done nearby based on search criteria.

The IP API was used for geolocation based on IP.

## Issues

The first API we tried to use, the Government Recreation API, provided more features than the National Parks API but had a CORS issue. This required us to change the focus of the project from looking for campsites for a vacation to looking for a park for a day trip. This also required us to update the user story and acceptance criteria.

The National Parks Service API provides less details about parks than the Government Recreation API and only allows for searching by State. IP API was used to provide the user's state based on their geolocation.

## Future Developments

Future developments for this project include adding more information from the NPS API to the park modal; using more APIs from the National Park Service for Visitor Centers and Places of Interest; and using dropdowns in the right column for instructions and favorite parks

## Breakdown of Tasks
 
Ricardo - Logo, splash screen, IP API and Mapquest API<br/> 			
Victoria - Modals, color palette, front end layout<br/>
Alex - Front end layout, National Park Service API, managed the project board<br/>
