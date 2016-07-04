/**
 * Initializes map
 */
var mapComponentMap;
var mapComponentInfoBox;

function mapComponentInit() {
  mapComponentMap = new google.maps.Map(document.getElementById('mapcomponent'), {
    center: {lat: 20, lng: 0},
    zoom: 2
  });

  //load markers
  $(this).request('onDataLoad', {
    success: mapComponentAddMarkers
  });

  //init infobox
  mapComponentInfoBox = new google.maps.InfoWindow({
    content: ''
  });
}


/**
 * Adds markers to map
 * Markers are expected to be a JSON in data.result
 */
function mapComponentAddMarkers(data) {
  if (data.result == undefined) {
    return ;
  }

  var loadedData = $.parseJSON(data.result);
  for (var i=0; i < loadedData.markers.length; i++) {
    var marker = new google.maps.Marker({
      position: {
        lat: parseFloat(loadedData.markers[i].latitude),
        lng: parseFloat(loadedData.markers[i].longitude)
      },
      map: mapComponentMap,
      title: loadedData.markers[i].title,
      icon: loadedData.settings.image
    });
    marker.marker_id = loadedData.markers[i].id;
    //bind marker click to show info box
    marker.addListener('click', function () {
      var clickedMarker = this;
      $(this).request('onMarkerClicked', {
        data: {marker_id: clickedMarker.marker_id},
        success: function (data) {
          mapComponentInfoBox.setContent(data.result);
          mapComponentInfoBox.open(mapComponentMap, clickedMarker);
        }
      });
    });
  }
}
