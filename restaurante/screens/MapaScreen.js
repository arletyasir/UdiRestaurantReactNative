import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../colors';
import * as Location from 'expo-location';

export const MapScreen = ({ route }) => {
    const [location, setLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
  
    // Ubicación predefinida
    const predefinedLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
  
    /*useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
  
        // Centrar el mapa en la ubicación predefinida
        setLocation(predefinedLocation);
      })();
    }, []);*/
    const showUserLocation = () => {
        setLocation(userLocation);
      };
      const initialRegion = location
      ? {
          latitude: predefinedLocation.latitude,
          longitude: predefinedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : null;
  
    return (
      <View style={styles.container}>
   
          <MapView style={styles.map} initialRegion={initialRegion}>
        
              <Marker
                coordinate={{
                  latitude: predefinedLocation.latitude,
                  longitude: predefinedLocation.longitude,
                }}
              >
                <FontAwesome name="map-pin" size={20} color={Colors.primary} />
              </Marker>

            {/*userLocation && (
              <View style={styles.buttonContainer}>
                <Button title="Mostrar mi ubicación" onPress={showUserLocation} />
              </View>
            )*/}
          </MapView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
  });
  
        