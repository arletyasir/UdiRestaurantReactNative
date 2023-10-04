import React, { useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,Modal,ActivityIndicator,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {collection,addDoc,doc,updateDoc,getDoc} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../colors';
import { useAuth } from '../src/context/authProvider';

export const Reserva = ({ navigation, route }) => {
  const [conta, setConta] = useState(1);
  const { id, fotoURL, titulo, fecha } = route.params;
  const [comentario, setComentario] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar la modal
  const { user } = useAuth();
  const backBotton = () => navigation.goBack();

  const restaConta = () => {
    if (conta >= 2) setConta(conta - 1);
  };

  const sumaConta = () => {
    if (conta <= 19) setConta(conta + 1);
  };

  const onSubmitReservar = async () => {
    try {
      const fecha1 = new Date().getTime();
      const data = {
        userId: user.uid,
        menuId: id,
        comensales: conta,
        comentario: comentario,
        fechaReserva: fecha1,
        fechaMenu: fecha,
        imagen: fotoURL,
        titulo: titulo,
        total: conta * 60,
        estado: 1,
      };
      setIsLoading(true);
      const menu = doc(db, 'menus', route.params.id);
      const menu2 = await getDoc(menu);
      if (menu2.data().cupos > 0) {
        const docRef = await addDoc(collection(db, 'reservas'), data);
        await updateDoc(menu, {
          cupos: menu2.data().cupos - 1,
        });
        await addDoc(collection(db, 'notificacion'), {
          userUid: user.uid,
          reservaId: docRef.id,
          fecha: fecha1,
          leido: false,
          estado: 1,
        });
        setIsLoading(false);
        /*await updateDoc(menu, {
          estado:0,
        });*/
        navigation.navigate('user');
      } else {
        setIsLoading(false);
        setShowModal(true); // Mostrar la modal si no hay cupos disponibles
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Ocultar la modal al hacer clic en cualquier parte de la ventana
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, '#1C0202']}
        style={{ height: Dimensions.get('window').height }}
      >
        <TouchableOpacity style={styles.iconBack} onPress={backBotton}>
          <Icon name="angle-left" size={40} color="black" />
        </TouchableOpacity>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}>RESERVA</Text>
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.textStyle}>Numeros de Comensales</Text>
          <View style={styles.containerContador}>
            <TouchableOpacity style={styles.iconComensales} onPress={restaConta}>
              <Icon name="angle-left" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{conta}</Text>
            <TouchableOpacity style={styles.iconComensales} onPress={sumaConta}>
              <Icon name="angle-right" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
          <Text style={styles.textStyle}>Fecha y hora de entrada:</Text>
          <Text style={styles.textStyleSub}>
            {new Date(fecha).getDate()} {new Date(fecha).toLocaleDateString('default', { month: 'long' })} de 12:00 a
            12:30
          </Text>

          <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
          <Text style={styles.textStyle}>Menú del día:</Text>
          <Text style={styles.textStyleSub}>{titulo} </Text>

          <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
          <Text style={styles.textStyle}>Lugar:</Text>
          <Text style={styles.textStyleSub}>Avenida banzer, casi 6to anillo</Text>

          <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
          <Text style={styles.textStyle}>Comentario:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ejemplo: Cumpleaño de mi Mamá"
            placeholderTextColor="#A9A9A9"
            onChangeText={(text) => setComentario(text)}
          />
        </View>
        <View style={styles.containerCardEnd}>
          <View style={styles.containerTotal}>
            <Text style={[styles.textStyle, { marginBottom: 20 }]}>Total compra</Text>
            <Text style={styles.textTitle}>Bs.{conta * 60}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
          <TouchableOpacity style={styles.btnReserva} onPress={onSubmitReservar}>
            <Text style={{ fontSize: 15, color: Colors.primary }}>CONFIRMAR RESERVA</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de carga */}
        <Modal visible={isLoading} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.modalText}>Realizando reserva...</Text>
            </View>
          </View>
        </Modal>

        {/* Modal de cupos agotados */}
        <Modal visible={showModal} transparent>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>No se pudo realizar la reserva</Text>
                <Text style={styles.modalText}>Ya no tenemos cupos disponibles</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 30,
    color: Colors.colorText,
  },
  textStyle: {
    fontSize: 15,
    color: Colors.colorText,
  },
  textStyleSub: {
    fontSize: 15,
    color: '#A8A7A5',
  },
  iconComensales: {
    margin: 10,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  containerContador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 65,
    borderRadius: 20,
    borderColor: '#fff',
    paddingLeft: 35,
    paddingRight: 30,
    margin: 10,
    fontSize: 16,
    color: '#FFF',
    borderWidth: 1,
  },
  containerCardEnd: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTotal: {
    backgroundColor: 'red',
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1.9,
    borderRadius: 20,
    borderColor: '#fff',
  },
  iconBack: {
    margin: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  containerDescription: {
    backgroundColor: Colors.bgRGBprincipal,
    borderRadius: 15,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    margin: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnReserva: {
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    borderRadius: 20,
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalText: {
    marginLeft: 10,
    fontSize: 16,
    color:Colors.colorText
  },
});
