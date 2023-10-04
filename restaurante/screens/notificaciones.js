import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal,ImageBackground,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { obtenerTiempoTranscurrido, MarcarLeido, eliminar } from '../hooks/funciones';
import { Colors } from '../colors';
import { useAuth } from '../src/context/authProvider';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CardPlaceholder from '../components/cardTareaplaceholder';
const moment = require('moment');
const fondoBg = require('../assets/fondoComida.png');

const NotificacionesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [notificaciones, setNotificaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { user } = useAuth();
  const getData = () => {
    if (user && user.uid) {
      const q = query(collection(db, 'notificacion'), where('userUid', '==', user.uid), where("estado", "==", 1));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notificacionesTemp = [];
        querySnapshot.forEach((doc) => {
          notificacionesTemp.push({ ...doc.data(), id: doc.id });
        });
        notificacionesTemp.sort((a, b) => {
          if (a.leido === b.leido) return 0;
          if (a.leido === false) return -1;
          return 1;
        });
        setNotificaciones(notificacionesTemp);
        setLoading(false);
      });
    }
  };
  const navigateDetalle = (obj) => {
    setModalVisible(false);
    MarcarLeido(obj);
    navigation.navigate('detallereserva', obj);
  };
  const handleLongPress = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };
  const handleDelete = () => {
    if (selectedNotification) {
      try {
        eliminar(selectedNotification);

      } catch (error) {
        console.log(error)
      }
    }
    setModalVisible(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const renderNotificacionItem = (notification) => (
    <TouchableOpacity
      key={notification.id}
      style={styles.notificacionItem}
      onPress={() => navigateDetalle(notification)}
      onLongPress={() => handleLongPress(notification)}
      activeOpacity={0.8}
    >
      {!notification.leido && <View style={styles.indicador} />}
      <Text style={styles.notificacionMensaje}>realizaste una reserva. Toca para ver Detalles</Text>
      <Text style={styles.notificacionFecha}>
        Reserva para: {new Date(notification.fecha).getDate()} de{' '}
        {new Date(notification.fecha).toLocaleDateString('es', { month: 'long' })}
      </Text>
      <Text style={styles.notificacionHora}>
        {obtenerTiempoTranscurrido(moment(notification.fecha))}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={40} color="black" />
      </TouchableOpacity>
      {loading ? (
        <CardPlaceholder />
      ) : notificaciones.length === 0 ? (
        <View style={[styles.content, styles.loading]}>
          <Text style={{ color: Colors.colorText }}>No tienes ninguna notificación</Text>
        </View>
      ) : (
        <ImageBackground source={fondoBg} style={{ height: Dimensions.get('window').height,paddingTop:12 }}>
        <ScrollView contentContainerStyle={styles.notificacionesContainer}>
          {notificaciones.map((notificacion) => renderNotificacionItem(notificacion))}
        </ScrollView>
        </ImageBackground>
      )}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  iconBack: {
    marginTop: 10,
    marginLeft: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  notificacionesContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificacionItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.bgRGBprincipal,
    borderRadius: 10,
    position: 'relative',
  },
  indicador: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  notificacionMensaje: {
    color: Colors.colorText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificacionFecha: {
    color: Colors.colorText,
    fontSize: 16,
    marginTop: 5,
  },
  notificacionHora: {
    color: Colors.colorText,
    fontSize: 16,
    marginTop: 5,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
  },
});

export default NotificacionesScreen;
