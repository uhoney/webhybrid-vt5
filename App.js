import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Map from "./components/Map";
import * as Location from "expo-location";

export default function App() {
  // Alkukoordinaatit kun sovellus aukeaa
  const [location, setLocation] = useState({
    latitude: 65.0121,
    longitude: 25.4651,
    latitudeDelta: 0.0922, // "Zoomaus", Arvot suoraan docseista
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      // Kysytään lupa käyttää sijaintia
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // Haetaan sijainti
      let waitLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      // Asetetaan sijainti stateen spread-operaattorilla
      setLocation({
        ...location,
        latitude: waitLocation.coords.latitude,
        longitude: waitLocation.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView>
      <Map location={location} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
