
/* Guardian tab widget */
var generateTabs = function (conId, tabArr) {

  tabConfig = {};

  widgetcontainer = document.getElementById(conId);
  widgetcontainer.className = 'skin';
  addPlate(widgetcontainer);
  
  tabConfig.flexbox = document.querySelector('#' + conId + ' .distribute-tabs');
  tabConfig.panebox = document.querySelector('#' + conId + ' .distribute-panes');
  tabConfig.itemCount = tabConfig.flexbox.childElementCount;
  addTabs(tabArr);
  
 
  tabConfig.flexbox.addEventListener('click', function(e){ 
                                               //alert(e.target.getAttribute('id'));
                                               
                                               activateTabs(e.target, e.target.getAttribute('data-toggle-option'));
                                               
                                            },false);
};

var addPlate = function( con ) {
  
  var newTabSection = document.createElement("section");
  newTabSection.className = 'distribute-tabs';
  con.appendChild(newTabSection);

  var newPaneSection = document.createElement("section");
  newPaneSection.className = 'distribute-panes';
  con.appendChild(newPaneSection);
}

var addTabs = function (tabArr) {
  for(i=0;i<tabArr.length;i++){
    ++tabConfig.itemCount;
    var newItem = document.createElement("div");
    newItem.setAttribute('data-toggle-option', tabArr[i] );
    newItem.className = 'tab-skin';
    newItem.innerHTML = tabArr[i] ;    
    tabConfig.flexbox.appendChild(newItem);
    addPane(tabArr[i]);

  }
};

var addPane = function (tabArr) {
    
  var newItem = document.createElement("div");
  newItem.id = tabArr.toLowerCase().replace(' ', '-');
  newItem.className = 'pane-skin';
 // newItem.style.display = 'none';
  newItem.innerHTML = ' ';    
  tabConfig.panebox.appendChild(newItem);

};

var activateTabs = function (tab, topic) {
   
   var paneId = topic.toLowerCase().replace(' ', '-');   
   var tabs = document.querySelector('#guardian-tab-widget .distribute-tabs').childNodes;
   var nodes = document.querySelector('#guardian-tab-widget .distribute-panes').childNodes;
    for(var i=0; i<tabs.length; i++) {
        tabs[i].classList.remove('highlighted');
    }

    tab.classList.add('highlighted');
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
             nodes[i].style.display = 'none';
         }
    }
   document.getElementById(paneId).style.display = 'block';
   if(document.getElementById(paneId).innerHTML === ' ') {
    loadTab(paneId, topic);
   }
};

var loadTab = function (paneId,topic) {
  var url = "async!http://content.guardianapis.com/search?section=" + paneId ;
  require({
        waitSeconds : 120, //make sure it is enough to load all gmaps scripts
        paths : {

            async : 'lib/async' //alias to plugin
        }
    });
  
   //alert(url);
  require( [url],
            function(data){
                    var htmlOutput = "";
                        for(i=0; i < data.response.pageSize ; i++){
                            htmlOutput += '<li><a href="' + data.response.results[i].webUrl + '">' + data.response.results[i].webTitle + '</a></li>';
                        }
                     
                     var out = document.getElementById(paneId);
                    //data is parsed into an object
                    out.innerHTML += '<ol> '+ htmlOutput +'</ol>';
                }
            );
  };


var autorun = function(conId , tabs) {
  try {
  generateTabs(conId, tabs);

} finally {

  //var a = document.getElementById(conId).;
  var doc = document.querySelector('#' + conId + ' .distribute-tabs').childNodes;
  //var notes = null;
  for (var i = 0; i < doc.length; i++) {
  
      if ( i === 0) {

       activateTabs(doc[i], doc[i].getAttribute('data-toggle-option'));
      }        
  }
  }

};


// How you run this autorun('guardian-tab-widget', [ 'UK news','Sport','Travel']);

if (document.addEventListener) 
  document.addEventListener("DOMContentLoaded", autorun('guardian-tab-widget', [ 'UK news','Sport','Travel']), false);
else 
  if (document.attachEvent) 
    document.attachEvent("onreadystatechange", autorun('guardian-tab-widget', [ 'UK news','Sport','Travel']));
else 
  window.onload = autorun('guardian-tab-widget', [ 'UK news','Sport','Travel']);
