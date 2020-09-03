$("#modal-close").click(function() {
  $(".modal").removeClass("is-active");
});
$("#location-info").click(function() {
  $(".modal").addClass("is-active");  
});

let incrementButton = $(".increment-button");
let decrementButton = $(".decrement-button");
let index=-1;

let queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=MD&limit=5&api_key=C20X2gP148EDeslk7stqM8BU6u6WmOqbAdPeKG8C";
let npsResponse;

let fullName;
let contactEmail;
let contactPhone;
let directionInfo;
let directionURL;
let standardHoursMonday;
let standardHoursTuesday;
let standardHoursWednesday;
let standardHoursThursday;
let standardHoursFriday;
let standardHoursSaturday;
let standardHoursSunday;
let latitude;
let longitude;
let description;
let addressType1;
let addressType2;

let addressLine1;
let addressLine2;
let addressLine3;
let addressCity;
let addressZip;
let addressState;
let displayAddress;
let addressIndex;

// helper functions

// returns index of physical address - if first one is "physical", sets to 0, if second is "physical", sets to 1

function determinePhysical(addressType1,addressType2) {
  if (addressType1 == "Physical") {
      return addressIndex=0;
  } else {
      return addressIndex=1;
  }
}


incrementButton.on("click",function(){
  index++;
  $.ajax({ //
      url: queryURL, 
      method: "GET"
  }).then(function(response){
      console.log(response);
      npsResponse=response;
  

      fullName = response.data[index].fullName;
      contactEmail = response.data[index].contacts["emailAddresses"][0].emailAddress;
      contactPhone = response.data[index].contacts.phoneNumbers[0].phoneNumber;
      directionInfo=response.data[index].directionsInfo;
      directionURL=response.data[index].directionsUrl;
      standardHoursMonday=response.data[index].operatingHours[0].standardHours.monday;
      standardHoursTuesday=response.data[index].operatingHours[0].standardHours.tuesday;
      standardHoursWednesday=response.data[index].operatingHours[0].standardHours.wednesday;
      standardHoursThursday=response.data[index].operatingHours[0].standardHours.thursday;
      standardHoursFriday=response.data[index].operatingHours[0].standardHours.friday;
      standardHoursSaturday=response.data[index].operatingHours[0].standardHours.saturday;
      standardHoursSunday=response.data[index].operatingHours[0].standardHours.sunday;
      latitude=response.data[index].latitude;
      longitude=response.data[index].longitude;
      description = response.data[index].description;

      addressType1=response.data[index].addresses[0].type;
      addressType2=response.data[index].addresses[1].type;

      // determine these based on the result from determinePhysical -> use this as the index
      console.log(determinePhysical(addressType1,addressType2));
      addressLine1=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line1;
      addressLine2=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line2;
      addressLine3=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line3;
      addressCity=response.data[index].addresses[determinePhysical(addressType1,addressType2)].city;
      addressZip=response.data[index].addresses[determinePhysical(addressType1,addressType2)].postalCode;
      addressState=response.data[index].addresses[determinePhysical(addressType1,addressType2)].stateCode;
      
      console.log("fullname: " + fullName + "\nEmail: " + contactEmail + "\nPhone: " + contactPhone + "\nDirections: " + directionInfo + "\nLink to Directions: " + directionURL);
      console.log("latitude: " + latitude + "\nlongitude: " + longitude + "\nDescription: " + description);
      console.log("Monday hours " + standardHoursMonday + "\nTuesday hours " + standardHoursTuesday +"\nWednesday hours " + standardHoursWednesday + "\nThursday hours " + standardHoursThursday + "\nFriday hours " + standardHoursFriday +"\nSaturday hours " + standardHoursSaturday + "\nSunday Hours " + standardHoursSunday)
      console.log("Address: " + "\n" + addressLine1 +  "\n" + addressCity + " " + addressState + " " + addressZip);
  })
})

decrementButton.on("click",function(){
  index--;
  if (index < 0) {
      index = 0;
  }
  $.ajax({ //
      url: queryURL, 
      method: "GET"
  }).then(function(response){
      // console.log(response);
      npsResponse=response;
  
      fullName = response.data[index].fullName;
      contactEmail = response.data[index].contacts["emailAddresses"][0].emailAddress;
      contactPhone = response.data[index].contacts.phoneNumbers[0].phoneNumber;
      directionInfo=response.data[index].directionsInfo;
      directionURL=response.data[index].directionsUrl;
      standardHoursMonday=response.data[index].operatingHours[0].standardHours.monday;
      standardHoursTuesday=response.data[index].operatingHours[0].standardHours.tuesday;
      standardHoursWednesday=response.data[index].operatingHours[0].standardHours.wednesday;
      standardHoursThursday=response.data[index].operatingHours[0].standardHours.thursday;
      standardHoursFriday=response.data[index].operatingHours[0].standardHours.friday;
      standardHoursSaturday=response.data[index].operatingHours[0].standardHours.saturday;
      standardHoursSunday=response.data[index].operatingHours[0].standardHours.sunday;
      latitude=response.data[index].latitude;
      longitude=response.data[index].longitude;
      description = response.data[index].description;

      addressType1=response.data[index].addresses[0].type;
      addressType2=response.data[index].addresses[1].type;

      // determine these based on the result from determinePhysical -> use this as the index
      console.log(determinePhysical(addressType1,addressType2));
      addressLine1=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line1;
      addressLine2=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line2;
      addressLine3=response.data[index].addresses[determinePhysical(addressType1,addressType2)].line3;
      addressCity=response.data[index].addresses[determinePhysical(addressType1,addressType2)].city;
      addressZip=response.data[index].addresses[determinePhysical(addressType1,addressType2)].postalCode;
      addressState=response.data[index].addresses[determinePhysical(addressType1,addressType2)].stateCode;
      
      console.log("fullname: " + fullName + "\nEmail: " + contactEmail + "\nPhone: " + contactPhone + "\nDirections: " + directionInfo + "\nLink to Directions: " + directionURL);
      console.log("latitude: " + latitude + "\nlongitude: " + longitude + "\nDescription: " + description);
      console.log("Monday hours " + standardHoursMonday + "\nTuesday hours " + standardHoursTuesday +"\nWednesday hours " + standardHoursWednesday + "\nThursday hours " + standardHoursThursday + "\nFriday hours " + standardHoursFriday +"\nSaturday hours " + standardHoursSaturday + "\nSunday Hours " + standardHoursSunday)
      console.log("Address: " + addressLine1 + " " + addressLine2 + " " + addressLine3 + ", " + addressCity + ", " + addressState + " " + addressZip);
  })
  

})
// let parkButton = document.createElement("button");
// // $(parkButton).attr("class", "modal-button");
// // $(parkButton).attr("data-target", "modal-ter");
// // $(parkButton).attr("aria-haspopup","true");
// $(parkButton).attr("id", "location-info");
// $(parkButton).attr("class","button");
// $(parkButton).text(fullName);
// $("#location-title").text(fullName);
// $("#location-info").text(addressLine2);
// $("#location-info")
// $("#location-info").click(function() {
// $(".modal").addClass("is-active");  
// });

  // STRUCTURE OF FUNCTIONALITY POST ON-CLICK ACTIVITY ///////
  //// 1A. User is prompted for permission for location.
  //// 1B. User IP Address is reversed searched via https://IPAPI.CO API.
  //// 2.  Response from 1B. is plugged into https://NPS.Gov API to get state National Parks.
  //// 3.  Response from 1A. is plugged into MapQuest API to generate user Pin location.
  //// 4.  Response from 2. lat. & long. is plugged into MapQuest API to generate Park Locations.
  //// 5.  Response from 2. is appended to MQ Pin as a button to trigger a modal upon click.
  //// 6.  Park Lat. & Long. is measured against user Lat. & Long. to determine direct distance for general proximity.



  document.addEventListener("DOMContentLoaded", function (event) {
    $("#location-finder").on("click", function(event) {
        event.preventDefault();
/// HIDES HERO BANNER ///
    $(".hero").attr("style", "display: none;");
/// SHOWS THE MAP AREA ///
    $("#body").attr("style", "display: inline;");
/// PROMPTS FOR PERMISSION TO USE PERMISSION /////
    let locatorText = document.getElementById("mapperID");
      getLocation();
      function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        locatorText.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
//// GETS USER API & GETS STATE CODE RESPONSE FOR NPS API IF USER DOESN'T GIVE PERMISSION ///
      function showPosition(position) {
          locatorText.innerHTML = "Latitude: " + position.coords.latitude + 
          "<br>Longitude: " + position.coords.longitude;
          console.log("the position: " + position);
          if (position == null || position == false){
            $.get('https://ipapi.co/ip/', function(data){
                let ipFetched = data;
                console.log(ipFetched);
                let ipEmbed = "https://ipapi.co/" + ipFetched + "/json/";
            $.getJSON(ipEmbed, function(data){
                let ipTrace = data;
                console.log(ipTrace);
                position.coords.latitude = ipTrace.latitude;
                position.coords.longitude = ipTrace.longitude;
          })
        })}
/// GETS USER API & GETS STATE CODE RESPONSE FOR NPS API
          $.get('https://ipapi.co/ip/', function(data){
              let ipFetched = data;
              console.log("user IP: " + ipFetched);
              let ipEmbed = "https://ipapi.co/" + ipFetched + "/json/";
          $.getJSON(ipEmbed, function(data){
              let ipTrace = data;
              console.log(ipTrace);
              stateLocation = ipTrace.region_code;
              console.log("state location: "+ stateLocation);
/// SETS NPS API USING IPAPI.CO STATE IDENTIFICATION ///
      let limitResults = "&limit=50";
      let apiKey = "C20X2gP148EDeslk7stqM8BU6u6WmOqbAdPeKG8C";
/// NATIONAL PARKS API:
              /// TO CHANGE RESPONSE QTY: Modify "&limit=7" (min. 1 to max. 50)
      let queryURL = "https://developer.nps.gov/api/v1/parks?stateCode="+ stateLocation +"&limit=7&api_key=C20X2gP148EDeslk7stqM8BU6u6WmOqbAdPeKG8C";
//// GENERATES a mapquest map utilizing the lat & long of the user ///
      L.mapquest.key = 'm6r48gcKnaiZ5cS9fynPUC8mEcXnoOjO';
        let map = L.mapquest.map('map', {
        center: [position.coords.latitude, position.coords.longitude],
        layers: L.mapquest.tileLayer('dark'), /// CONTROLS MAP COLOR: 'light', 'dark', 'hybrid', 'satellite'
        zoom: 12, /// CONTROLS ZOOM; HIGHER #, THE MORE ZOOMED IN
        opacity: 0.7
        });
/// CREATES PIN FOR PHYSICAL LOCATION OF THE USER
        map.addControl(L.mapquest.locatorControl()); // <<< embed map icon (target), to get user's new location
      L.marker([position.coords.latitude, position.coords.longitude], {
        icon: L.mapquest.icons.marker(),
        draggable: false
        }).addTo(map);
/// CALLS NPS API 
      $.ajax({ //
        url: queryURL, 
        method: "GET"
      }).then(function(response){
        let npsResponse = response;
        console.log(npsResponse);
        for(entry=0; entry < 10; entry++){
    
/// NPS RESPONSE / INFORMATION FOR MAP MODAL POPULATION ///
            parkTitle = npsResponse.data[entry].fullName;
            parkDescription = npsResponse.data[entry].description;
            parkDirectionURL = npsResponse.data[entry].directionsUrl;
            parkBannerBackground = npsResponse.data[entry].images[0].url;
            standardHoursMonday= "Monday: " + npsResponse.data[entry].operatingHours[0].standardHours.monday;
            standardHoursTuesday="Tuesday: " + npsResponse.data[entry].operatingHours[0].standardHours.tuesday;
            standardHoursWednesday="Wednesday: " +npsResponse.data[entry].operatingHours[0].standardHours.wednesday;
            standardHoursThursday="Thursday: " +npsResponse.data[entry].operatingHours[0].standardHours.thursday;
            standardHoursFriday="Friday: " +npsResponse.data[entry].operatingHours[0].standardHours.friday;
            standardHoursSaturday="Saturday: " +npsResponse.data[entry].operatingHours[0].standardHours.saturday;
            standardHoursSunday="Sunday: " +npsResponse.data[entry].operatingHours[0].standardHours.sunday;
            parkFeeOne = npsResponse.data[entry].entranceFees[0];
            parkFeeTwo =  npsResponse.data[entry].entranceFees[1];
/// USES PARK LAT & LONG TO CREATE PARK PINS
            parkLatLong = (npsResponse.data[entry].latLong).replace("{", "").replace("}","");
            if(parkLatLong != ''){
            parkLatLong = parkLatLong.split(',');
            parkLat = (parkLatLong[0])
            let parkLatClean = parkLat.replace("lat:", "");
            parkLong = (parkLatLong[1])
            let parkLongClean = parkLong.replace("long:", "");
/// APPENDS BUTTON TO MAPQUEST API ///
            let parkButton = document.createElement("button");
//CALCULATES THE DISTANCE FROM THE USER'S LOCATION TO THAT OF THE NPS LOCATION USING LAT & LONG//
    function distanceMeasurement (){
      let radlat1 = Math.PI * (position.coords.latitude)/180;
      let radlat2 = Math.PI * parkLatClean/180;
      let theta =  position.coords.longitude - parkLongClean;
      let radtheta = Math.PI * theta/180;
          let distOne = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(distOne);
          distTwo = dist * 180/Math.PI;
      distUnitless = distTwo * 60 * 1.1515;
      
      distKM = distUnitless * 1.609344;
      distMiles = (distKM / 1.6093444);
      distMiles = distMiles.toFixed(1);
      console.log("the distance in miles: " + distMiles);
      return distMiles;
      
  }
  distanceMeasurement();

////// MODAL POPULATION////////
  let modalContainer = document.createElement("div");
      $(modalContainer).attr("class", "modal");
      $(modalContainer).attr("id", parkTitle);
    let modalBackground = document.createElement("div");
      $(modalBackground).attr("class", "modal-background");
      $(modalContainer).prepend(modalBackground);
    let modalCard = document.createElement("div");
      $(modalCard).attr("class", "modal-card");
      $(modalContainer).append(modalCard);
      let modalHead = document.createElement("head");
        $(modalHead).attr("class","modal-card-head");
        $(modalCard).append(modalHead);
        $(modalHead).text(parkTitle + ", only "+distMiles+"mi. away*");
      let modalClose = document.createElement("button");
        $(modalClose).attr("class", "modal-close is-large");
        $(modalClose).attr("aria-label", "close");
        $(modalClose).on("click", function(event) {
          event.preventDefault();
          $(modalContainer).attr("class","modal");
          })
          $(".modal-background").on("click", function(event) {
            event.preventDefault();
            $(modalContainer).attr("class","modal");
            })
        $(modalContainer).append(modalClose);
      let modalSection = document.createElement("section");
        $(modalSection).attr("class", "modal-card-body");
        $(modalSection).text(parkDescription);
/// modalsecion below contains modal image background URL & fallback color of orange (#f15025) in case image does not load. ///
        $(modalSection).attr("style","background-image:url('assets/images/northern-forest.jpg'); background-size: cover; color: #fff; background-repeat: no-repeat;background-color: #f15025;");
          descriptionHeading = document.createElement('H2');
          descriptionHeading.innerHTML = "<u>Why Visit</u>";
          parkWeeklyHours = document.createElement('ul');
          parkWeeklyHours.innerHTML = "<u>Hours</u>";
          dayofWeek = [standardHoursMonday, standardHoursTuesday, standardHoursWednesday, standardHoursThursday, standardHoursFriday, standardHoursSaturday, standardHoursSunday];
          for (let day=0; day< dayofWeek.length; day++){
              parkDailyHours =document.createElement('li');
              parkWeeklyHours.appendChild(parkDailyHours);
              parkDailyHours.innerHTML=parkDailyHours.innerHTML + dayofWeek[day];
          }
        $(modalSection).prepend(descriptionHeading);
        $(modalSection).append(parkWeeklyHours);
        parkDirectionURL = document.createElement('a');
          $(parkDirectionURL).attr("target", "_blank");
          $(parkDirectionURL).attr("href",directionURL);
          parkDirectionURL.innerHTML = "directions to " + parkTitle;
        $(modalSection).append(parkDirectionURL);
        $(modalCard).append(modalSection);
        $("#modalArea").append(modalContainer);
//// adds one park image per each location to 'directions' section ///
parkImageSection = document.createElement("img");
parkimageTitle = document.createElement("h2");
$(parkimageTitle).text(parkTitle);
$("#park-images").append(parkimageTitle);
$(parkImageSection).attr("style", "width: 100%;");
$(parkImageSection).attr("src", parkBannerBackground);
$(parkImageSection).attr("alt", parkTitle);
$("#park-images").append(parkImageSection);
/// adds marker to the map for 'X' AMOUNT OF LOCATIONS FROM NPS FOR THE STATE ///
    L.marker([parkLatClean, parkLongClean], {
              icon: L.mapquest.icons.marker({
                shadow: true,
                title: parkTitle,
                tooltip: parkTitle,
                primaryColor: '#f14025',
                secondaryColor: '#a4bab7'
              }),
              draggable: false
///APPENDS BUTTON CLASS TO MAP PIN ON-CLICK EVENT ///
            }).bindPopup(parkButton).addTo(map);
            $(parkButton).attr("id", parkLongClean);
            $(parkButton).attr("class","button is-light");
           $(parkButton).text(parkTitle);
           $(parkButton).attr("data-target", parkTitle);
           $(parkButton).on("click", function(event) {
            event.preventDefault();
            $(modalContainer).attr("class", "modal is-active");
           })
  $("#location-title").text(fullName);
  $("#location-info").text(addressLine2);
  console.log("parkTitle response: " + parkTitle+ ",distance in miles from current location: "+ distMiles);
              }
            }
      })
        })
        })
    
      }})

    })