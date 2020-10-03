// STRUCTURE OF FUNCTIONALITY POST ON-CLICK ACTIVITY ///////
//// 1A. User is prompted for permission for location.
//// 1B. User IP Address is reversed searched via https://IPAPI.CO API.
//// 2.  Response from 1B. is plugged into https://NPS.Gov API to get state National Parks.
//// 3.  Response from 1A. is plugged into MapQuest API to generate user Pin location.
//// 4.  Response from 2. lat. & long. is plugged into MapQuest API to generate Park Locations.
//// 5.  Response from 2. is appended to MQ Pin as a button to trigger a modal upon click.
//// 6.  Park Lat. & Long. is measured against user Lat. & Long. to determine direct distance for general proximity.

document.addEventListener("DOMContentLoaded", function (event) {
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
      if (position == null || position == false){
        $.get('https://ipapi.co/ip/', function(data){
          let ipFetched = data;
          
          let ipEmbed = "https://ipapi.co/" + ipFetched + "/json/";
          $.getJSON(ipEmbed, function(data) {
            let ipTrace = data;
            position.coords.latitude = ipTrace.latitude;
            position.coords.longitude = ipTrace.longitude;
          })
        })
      }

    /// GETS USER API & GETS STATE CODE RESPONSE FOR NPS API
    $.get('https://ipapi.co/ip/', function(data){
      
      let ipFetched = data;
      let ipEmbed = "https://ipapi.co/" + ipFetched + "/json/";

      $.getJSON(ipEmbed, function(data){
        let ipTrace = data;
        stateLocation = ipTrace.region_code;

        /// SETS NPS API USING IPAPI.CO STATE IDENTIFICATION ///
        let limitResults = "&limit=10";
        let apiKey = "&api_key=C20X2gP148EDeslk7stqM8BU6u6WmOqbAdPeKG8C";
        /// NATIONAL PARKS API:
        
        /// TO CHANGE RESPONSE QTY: Modify "&limit=7" (min. 1 to max. 50)
        let queryURL = "https://developer.nps.gov/api/v1/parks?stateCode="+ stateLocation +limitResults+apiKey;
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
          // console.log(npsResponse)
          for(entry=0; entry < 10; entry++){
          /// NPS RESPONSE / INFORMATION FOR MAP MODAL POPULATION ///
          let parkTitle = npsResponse.data[entry].fullName;
          let parkDescription = npsResponse.data[entry].description;
          let parkDirectionURL = npsResponse.data[entry].directionsUrl;
          let standardHoursMonday= "Monday: " + npsResponse.data[entry].operatingHours[0].standardHours.monday;
          let standardHoursTuesday="Tuesday: " + npsResponse.data[entry].operatingHours[0].standardHours.tuesday;
          let standardHoursWednesday="Wednesday: " +npsResponse.data[entry].operatingHours[0].standardHours.wednesday;
          let standardHoursThursday="Thursday: " +npsResponse.data[entry].operatingHours[0].standardHours.thursday;
          let standardHoursFriday="Friday: " +npsResponse.data[entry].operatingHours[0].standardHours.friday;
          let standardHoursSaturday="Saturday: " +npsResponse.data[entry].operatingHours[0].standardHours.saturday;
          let standardHoursSunday="Sunday: " +npsResponse.data[entry].operatingHours[0].standardHours.sunday;

          /// USES PARK LAT & LONG TO CREATE PARK PINS
          let parkLatLong = (npsResponse.data[entry].latLong).replace("{", "").replace("}","");
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
            $(modalSection).attr("class", "modal-card-body")

            /// modalsecion below contains modal image background URL & fallback color of orange (#f15025) in case image does not load. ///
            // $(modalSection).attr("style","background-image:url(" +  parkBannerBackground +  "); ");

            descriptionHeading = document.createElement('h2');
            descriptionHeading.innerHTML = "Why Visit?";
            $(modalSection).prepend(descriptionHeading);

            let descriptionParagraph = document.createElement("p")
            descriptionParagraph.innerHTML = parkDescription
            $(modalSection).append(descriptionParagraph);

            parkWeeklyHours = document.createElement('ul');
            parkWeeklyHoursHeading = document.createElement('h2')
            parkWeeklyHoursHeading.innerHTML="Hours"

            dayofWeek = [standardHoursMonday, standardHoursTuesday, standardHoursWednesday, standardHoursThursday, standardHoursFriday, standardHoursSaturday, standardHoursSunday];
            for (let day=0; day< dayofWeek.length; day++){
              parkDailyHours =document.createElement('li');
              parkWeeklyHours.appendChild(parkDailyHours);
              parkDailyHours.innerHTML=parkDailyHours.innerHTML + dayofWeek[day];
            }

            $(modalSection).append(parkWeeklyHoursHeading);
            $(modalSection).append(parkWeeklyHours);

            parkDirectionURLAnchor = document.createElement('a');
            $(parkDirectionURLAnchor).attr("target", "_blank");
            $(parkDirectionURLAnchor).attr("href",parkDirectionURL);
            $(parkDirectionURLAnchor).attr("class","park-link");
            parkDirectionURLAnchor.innerHTML = "Click here for directions to the " + parkTitle;
            $(modalSection).append(parkDirectionURLAnchor);
            $(modalCard).append(modalSection);
            $("#modalArea").append(modalContainer);

            L.marker([parkLatClean, parkLongClean], {
              icon: L.mapquest.icons.marker({
              shadow: true,
              title: parkTitle,
              tooltip: parkTitle,
              primaryColor: '#f14025',
              secondaryColor: '#a4bab7'
              })
              , draggable: false
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
                $("#location-title").text(parkTitle);
              }
            }
          })
        })
      })
    }
})