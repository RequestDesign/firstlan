ymaps.ready(init);
function init() {
  // Первая карта (г. Москва, Челобитьевское ш, д. 10 к. 2)
  var myMap1 = new ymaps.Map("map1", {
    center: [55.913565, 37.553972],
    zoom: 14,
    controls: ["zoomControl", "typeSelector"],
  });
  var myPlacemark1 = new ymaps.Placemark(
    [55.913565, 37.553972],
    {
      hintContent: "Это метка на первой карте",
      balloonContent:
        "Здесь находится адрес: г. Москва, Челобитьевское ш, д. 10 к. 2",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "image/contacts/map-mark.png",
      iconImageSize: [60, 70],
      iconImageOffset: [-25, -72],
    }
  );
  myMap1.geoObjects.add(myPlacemark1);
}
