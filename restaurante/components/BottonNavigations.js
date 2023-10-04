import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Colors } from '../colors';
import { Badge } from 'react-native-elements';
import { useAuth } from '../src/context/authProvider';

export const BottonNavigations = ({ NavigateUser, navigateNotificacion, number, restaurante }) => {
  const { user } = useAuth();

  const navigateNotificacion2 = () => {
    if (user !== null) {
      navigateNotificacion();
    } else {
      return;
    }
  };

  return (
    <View style={styles.botonFlotanteContainer}>
      <View style={styles.botonFlotante}>
        <TouchableOpacity onPress={restaurante}>
          <View style={styles.iconContainer}>
            <Ionicons name="ios-restaurant" size={30} color="white" style={styles.icon} />
            <Text style={styles.iconText}>Restaurante</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={NavigateUser}>
          <View style={styles.iconContainer}>
            <FontAwesome name="user" size={30} color="white" style={styles.icon} />
            <Text style={styles.iconText}>Perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <FontAwesome name="home" size={30} color="white" style={styles.icon} />
            <Text style={styles.iconText}>Inicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateNotificacion2} style={styles.iconContainer}>
          {number > 0 && (
            <Badge
              value={number}
              containerStyle={{ position: 'absolute', top: -8, right: 10 }}
              badgeStyle={{ width: 23, height: 23, borderRadius: 11.5 }}
            />
          )}
          <Ionicons name="notifications-sharp" size={30} color={Colors.light} />
          <Text style={styles.iconText}>Notificationes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  botonFlotanteContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  botonFlotante: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5,
    flexDirection: 'row',
  },
  botonFlotanteTexto: {
    color: '#fff',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 20,
  },
  iconText: {
    color: 'white',
    fontSize: 12,
  },
});
