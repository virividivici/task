var movieCarousel = {
 
    filterValue: "Action",
 
    // object literals can contain properties and methods.
    // e.g we can define a further object for module configuration:
    settings: {
        url : "http://lg-devtest.herokuapp.com/data.json" ,
        authorizationKey: "Bearer u12A8f3Zg",
        sort: {
                sorting : true,
                asc : false,
                des : true
            },
        
        column : 3, //number of 'cells' in a row
        current : 1,
        currentFocus: '',
        next : ''
    },
    // Method to update widget setting
    updateCongif: function(options){
        this.settings = {
            url : options.url,
            authorizationKey: options.authorizationKey,
            sort: {
                    sorting : options.sort.sorting,
                    asc : options.sort.asc,
                    des : options.sort.des
                },
            
            column : options.column, //number of 'cells' in a row
            current : options.current,
            currentFocus: options.currentFocus,
            next : ''
        }
    },
    displayCarousel: function(element, collection) {

        element.innerHTML = collection;
        //document.getElementById('c' + this.settings.current).focus();
    },

    getHtmlfor: function(items, filterId) {
        var output = '';
        var counter = 0;
        for(k=0; k<items.length; k++){
            counter++;
            var item = '<div class="film-container col-lg-4">'
                    + '<div class="film" id="' + filterId + '-' + counter + '" onClick="movieCarousel.setCurrent(this);" tabindex="' + counter + '">'
                    + '<div class="side"><img class="img-thumbnail" src="'+ items[k].img + '" alt="Jimmy Eat World">'
                    + '<h3>' + items[k].title +'</h3><span>Rating: ' + items[k].imdb + '</span></div>'
                    + '<div class="side back"><h2>' + items[k].title + '</h2><span>Rating: ' + items[k].imdb 
                    + '</span><p><b>Plot Summary: </b>'
                    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' 
                    +'</p></div>'
                    + '</div></div>';
            output += item;
        } 

        return output;
        
    },
 
    // a very basic method
    callAjax: function (callback) {
        var  xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', this.settings.url ,true);
        xmlhttp.setRequestHeader("Authorization", this.settings.authorizationKey);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            
            if (xmlhttp.readyState == 4) {
                if ( xmlhttp.status == 200) {                   
                    var reponseData = JSON.parse(xmlhttp.responseText);
                    var movies=[];
                    for(i=0;i< reponseData.data.length; i++){
           
                        var items = reponseData.data[i].assets; 
                        for (var key in items) {                    
                            movies.push(items[key]);
                        }
                    } 
                    callback(movies);
                }
            }
           
        }
   
    },
 
    classSelector: function(matchClass) {
        var elems = document.getElementsByTagName('*'), i;
        var selected = []
        for (i in elems) {
            if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                    > -1) {
               selected.push(elems[i]);

            }
        }
        return selected;

    },

    check: function(e){
        
        if (!e) var e = window.event;
            (e.keyCode) ? key = e.keyCode : key = e.which;
        
       //console.log(key);
        try{
            switch(key){
                case 37: next = movieCarousel.settings.current - 1; break;         //left
                case 38: next = movieCarousel.settings.current - col; break;       //up
                case 39: next = (1*movieCarousel.settings.current) + 1; break;     //right
                case 40: next = (1*movieCarousel.settings.current) + col; break;   //down
            }
           
            if (key==37|key==38|key==39|key==40){
                /* Submit etc.*/
                //console.log('code', code);
                //var code=document.getElementById("movies").elements['c' + current].value;
                //console.log('code', code);
                ///if(code!=""){alert(code);}
                            
                document.getElementById(movieCarousel.settings.currentFocus + '-' + next).focus();                
                var d = document.getElementById(movieCarousel.settings.currentFocus + '-' + next);
                d.className = d.className + " otherclass";

                movieCarousel.settings.current = next;
            }       
        }catch(Exception){}
    },

    setCurrent: function(element){
        
        var string = element.id;
        this.settings.currentFocus = string.slice(0,string.indexOf('-'));
        this.settings.current = string.slice(string.indexOf('-')+1,string.length);
    },
    // override the current configuration
    initialize: function() {

        document.onkeydown = this.check;

        this.callAjax(function(items){
            
            var carousels = movieCarousel.classSelector('carouselMovieCon');
                       
            for(i=0;i < carousels.length; i++){
                var movies = [];
                var filter = carousels[i].getAttribute('rel');
                //console.log(carousels[i].getAttribute('rel'));
                for (j=0;j< items.length; j++) {
                                 
                    if(items[j].genre == filter) {
                        movies.push(items[j]);
                    }
                }

                document.getElementById(carousels[i].getAttribute('id')).innerHTML = movieCarousel.getHtmlfor(movies, filter);
            }
            
        });
    }
};
 

var autorun = function() {
  try {
    movieCarousel.initialize();

    } finally {

        
        //var doc = document.querySelector('#' + conId ).childNodes;
        //var notes = null;
        //for (var i = 0; i < doc.length; i++) {
  
            //if ( i === 0) {

                movieCarousel.initialize();
            //}        
        //}
    }

};


if (document.addEventListener) 
  document.addEventListener("DOMContentLoaded", autorun(), false);
else 
  if (document.attachEvent) 
    document.attachEvent("onreadystatechange", autorun());
else 
  window.onload = autorun();


