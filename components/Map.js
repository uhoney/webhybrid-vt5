import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map({ location }) {
  const [markers, setMarkers] = useState([]);

  const showMarker = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate; // Käytetään tätä kun tuo backtick bugaa välillä
    const newMarker = {
      latlng: event.nativeEvent.coordinate,
      // Tämä bugaa välillä, backtickit ei toimi rivinvaihdon kanssa ja prettier formatoi sen omituisesti, vaikka rivipituus on 120
      // Jos toisella on lyhyempi rivipituus, niin se saattaa formatoida sen eri tavalla ja sitten tämä ei toimikkaan
      //   title: `${event.nativeEvent.coordinate.latitude.toFixed(4)},${event.nativeEvent.coordinate.longitude.toFixed(4)}`,
      title: latitude.toFixed(4) + "," + longitude.toFixed(4),
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <MapView
      style={styles.map}
      region={location}
      mapType="standard"
      onLongPress={showMarker}
    >
      {/* Suoraan otettu docseista => mäppää markers arrayn */}
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker.latlng} title={marker.title} />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
