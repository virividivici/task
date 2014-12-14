movieCarousel
=============

  JavaScript movieCarousel
  Version 1.1
  Loads and filters set of items(movies) via ajax.
  
 
  Author: Zoe Azhdari Radkani
  Author email: zazhdari@yahoo.com
 
  Versy simple and easy to use. Works only by adding a few changes to the html
  and stylesheet. Perfect for when you have a list of long things to display.
  Add a class name of 'carouselMovieCon' to your movie container. Add filter 
  value the rel attribut of the container (i.e. rel="Action").
  Once you set the focus of window on the container you should be able to navigate
  through via keyboard arrow keys.
  As you move through the carousel over each movie , the movie card flips and you
  will see the plot summary of each movie. (Due to the descrition of each movie not 
  being avialable in json object I have populated this with dummy text now)
  
 
  Note: You can overrride the settings of the widget to load from another source 
  and change the sorting and set the focus automatically by calling this function 
  before the initiate function.
  
  See example for more details.
  ---------------------------------------------------------------------------
  
  EXAMPLES OF USE:
  
     <div id="Action" class="carouselMovieCon" rel="Action">
       <!-- Result goes in here--->
 		</div>
 
 
   To override settings: 
   movieCarousel.updateCongif ({
    url : "http://newurl.com/data.json" ,
       authorizationKey: "newValue",
       sort: {
               sorting : true/false,
               asc : true/false, 
               des : true/false
             },
        
       column : number, //number of 'cells' in a row
       current : number,
       currentFocus: '',
       next : ''
   
   })
  
 ------------------------------------------------------------------------------
  	       
 
