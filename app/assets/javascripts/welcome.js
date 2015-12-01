function initMap() {
  var styling = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#c4ccd6"},{"visibility":"on"}]}]
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 40.7411, lng: -73.9897},
    styles: styling
  });
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints()
  });
  heatmap.setMap(map);
  heatmap.set('radius', heatmap.get('radius') ? null : 25);
  setMarkers(map);
}

function getPoints() {
  var arr = [];
  gon.coords.forEach(function(c){
    arr.push(new google.maps.LatLng(c[0], c[1]));
  })
  return arr;
}

function setMarkers(map) {
  gon.stations.forEach(function(s) {
    var marker = new google.maps.Marker({
      position: {lat: s[0], lng: s[1]},
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3
      },
      title: s[2]
    });
    var infowindow = new google.maps.InfoWindow({
      content: "Available Bikes: " + marker.title
    });
    marker.addListener('mouseover', function() {
      infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function() {
      infowindow.close(map, marker);
    });
  }) 
}