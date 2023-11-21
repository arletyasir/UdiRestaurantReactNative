import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,Image } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../colors';
//console.log('commit');

const calculateTimeDifference = (fechaMenu) => {
    const currentDate = new Date();
    const difference = fechaMenu - currentDate;

    // Calcula la diferencia en días, horas, minutos y segundos
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Construye el mensaje de diferencia de tiempo
    let message = '';

    if (days > 0) {
        message = `Faltan ${days} día${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        message = `Faltan ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        message = `Faltan ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else {
        message = `Faltan ${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }

    return message;
};

export const DetalleReserva = ({ navigation, route }) => {
    const [reserva, setReserva] = useState(null);
    const [loading, setLoading] = useState(true);
    const backBotton = () => navigation.goBack()


    const getDataReserva = async () => {
        const docRef = doc(db, "reservas", route.params.reservaId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setReserva(docSnap.data())
        } else {
            console.log("No such document!");
        }
        setLoading(false);
    }
    const renderPlaceholder = () => {
        return (
          <View style={styles.placeholderContainer}>
            <View style={styles.placeholderImage} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />
            <View style={styles.placeholderText} />
          </View>
        );
      };
      const obtenerTextoComentario=(comentario)=> {
        if (!comentario || comentario.trim() === '') {
          return 'Sin comentarios';
        } else {
          return comentario;
        }
      }
      
    useEffect(() => {
        getDataReserva();
    }, [])
    return (

        <ScrollView style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={[Colors.primary, '#1C0202']}
                style={{ height: Dimensions.get('window').height }}>

                <TouchableOpacity style={styles.iconBack} onPress={backBotton}>
                    <Icon name="angle-left" size={40} color="black" />
                </TouchableOpacity>


                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>DETALLES DE SU RESERVA</Text>
                </View>
                {loading ? (
          renderPlaceholder()
        ) : (
                <View style={styles.containerDescription}>
                <Text style={styles.textStyle}>{reserva.estado === 1 && (
                                <Text style={{fontSize:17}}><Ionicons name="alarm-sharp" size={24} color="white" /> {calculateTimeDifference(new Date(reserva?.fechaMenu))} </Text>
                            )}</Text>
                    <View style={styles.containerContador}>
                    <Image source={{ uri: reserva?.imagen }} style={styles.reservaImagen} />

                    </View>
                    <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>

                    <Text style={styles.textStyle}>Numeros de Comensales</Text>
                    <View style={styles.containerContador}>
                        <Text style={styles.textStyle}>{reserva?.comensales}</Text>
                    </View>
                    <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
                    <Text style={styles.textStyle}>Fecha y hora de entrada:</Text>
                    <Text style={styles.textStyleSub}>{new Date(reserva?.fechaMenu).getDate()} {new Date(reserva?.fechaMenu).toLocaleDateString('default', { month: 'long' })} de 12:00 a 12:30</Text>

                    <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
                    <Text style={styles.textStyle}>Menú del día:</Text>
                    <Text style={styles.textStyleSub}>{reserva?.titulo} </Text>

                    <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
                    <Text style={styles.textStyle}>Lugar:</Text>
                    <Text style={styles.textStyleSub}>Avenida banzer, casi 6to anillo</Text>

                    <View style={{ borderWidth: 0.2, margin: 10, borderColor: '#fff', width: '100%' }}></View>
                    <Text style={styles.textStyle}>Su Comentario:</Text>
                    <Text style={styles.textStyleSub}>{obtenerTextoComentario(reserva?.comentario)} </Text>

                </View>
)}

                <View style={styles.containerCardEnd}>
                    <View style={styles.containerTotal}>
                        <Text style={[styles.textStyle, { marginBottom: 20 }]}>Total reserva</Text>
                        <Text style={styles.textTitle}>Bs.{reserva?.total}</Text>
                    </View>
                    
                </View>


            </LinearGradient>

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    placeholderContainer: {
        padding: 20,
        alignItems: 'center',
      },
      placeholderImage: {
        width: '70%',
        height: 150,
        backgroundColor:'rgba(0,0,0,0.6)',
        marginBottom: 10,
        borderRadius: 5,
      },
      placeholderText: {
        width: '90%',
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 5,
        borderRadius: 5,
      },
    container: {
        backgroundColor: Colors.primary,

    },
    reservaImagen: {
        width: '70%',
        height: 150,
        borderRadius: 5,
        marginRight: 10,
    },
    containerTitle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: 25,
        color: Colors.colorText
    },
    textStyle: {
        fontSize: 15,
        color: Colors.colorText
    },
    textStyleSub: {
        fontSize: 15,
        color: '#A8A7A5'
    },
    iconComensales: {
        margin: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#FFF'
    },
    containerContador: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        borderWidth: 1
    },
    containerCardEnd: {
        alignItems: 'center',
        justifyContent: 'center'
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
        backgroundColor: '#FFF'
    },
    containerDescription: {
        backgroundColor: Colors.bgRGBprincipal,
        borderRadius: 15,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        margin: 20,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnReserva: {
        backgroundColor: Colors.light,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 20,
        marginTop: 50
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalText: {
        marginLeft: 10,
        fontSize: 16,
    },

});
