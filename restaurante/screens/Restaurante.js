import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Linking, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../colors';
import { LinearGradient } from 'expo-linear-gradient';
const fondoBg = require('../assets/portada2.png');
const fondo = require('../assets/udi2.png');



export const Restaurante = ({ navigation }) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const handleOpenLink = (url) => {
        Linking.openURL(url);
    };
    const handleOpenWhatsApp = () => {
        const phoneNumber = '+59171399694'; // Número de WhatsApp
        const message = 'Hola, estoy interesado en realizar reserva.'; // Mensaje predefinido
        const encodedMessage = encodeURIComponent(message); // Codificar el mensaje para incluirlo en la URL
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        Linking.openURL(url);
      };

    const backBotton = () => navigation.navigate('Home')

    return (
        <Animated.ScrollView style={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
        >
            <View style={{ backgroundColor: Colors.light }}>
                <Animated.Image source={fondoBg} style={styles.image(scrollA)} />
                <TouchableOpacity style={styles.iconBack} onPress={backBotton}>
                    <Icon name="angle-left" size={40} color={Colors.colorText} />
                </TouchableOpacity>
                <View style={styles.date}>

                    <View style={{ flex: 1 }}>

                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 75, justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginRight: 12, marginLeft: 12 }}>
                            <Animated.Image source={fondo} style={{ tintColor: 'white' }} />

                        </View>
                    </View>


                </View>


            </View>
            <View style={styles.card}>
                <LinearGradient
                    colors={[Colors.primary, '#1C0202',Colors.primary, ]}>
                    <View style={styles.containerDescription}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.titleDescription, { fontSize: 30, }]}>Restaurante Escuela UDI</Text>
                            <Text style={[styles.titleDescription, { fontSize: 30 }]}>by Dossier</Text>
                            <Text style={[styles.titleDescription, { fontSize: 15, marginBottom: 15 }]}>udibolivia</Text>
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30 }}>
                            <Text style={[styles.titleDescription, { fontSize: 20 }]}>{'Acerca de Nosotros'}</Text>
                            <View style={styles.line} />
                            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 6 }]}>VISITA NUESTRA PAGINA WEB: </Text>
                            <TouchableOpacity onPress={()=>handleOpenLink('https://www.udi.edu.bo/Restaurante/Home/Index')}>
                                <Text style={[styles.titleDescription, { fontSize: 13, marginBottom: 6 ,textDecorationLine: 'underline',}]}>
                                    https://www.udi.edu.bo/Restaurante/Home/Index
                                </Text>
                            </TouchableOpacity>
                            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 6 }]}>HORARIOS DE INGRESO :</Text>
                            <Text style={[styles.titleDescription, { fontSize: 13, marginBottom: 6 }]}>12:00 PM - 12:30PM</Text>
                            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 6 }]}>ESTAMOS UBICADO :</Text>
                            <TouchableOpacity onPress={()=>handleOpenLink('https://www.google.com/maps/place/Restaurante+-+Escuela+UDI+by+Dossier/@-17.7341162,-63.1704667,17.99z/data=!4m14!1m7!3m6!1s0x93f1e7fc75639d23:0xf751312b5d1ecd04!2sRestaurante+-+Escuela+UDI+by+Dossier!8m2!3d-17.7341921!4d-63.1694159!16s%2Fg%2F11qbqn0prz!3m5!1s0x93f1e7fc75639d23:0xf751312b5d1ecd04!8m2!3d-17.7341921!4d-63.1694159!16s%2Fg%2F11qbqn0prz?hl=es-419&entry=ttu')}>
                            <Text style={[styles.titleDescription, { fontSize: 13, marginBottom: 3 ,textDecorationLine: 'underline'}]}><FontAwesome name="map-marker" size={24} color="white" />Av. Bánzer casi 6.º Anillo, en Santa Cruz Bolivia.
                            </Text>
                            </TouchableOpacity>
                            
                            <Text style={[styles.titleDescription, { fontSize: 20, marginTop: 40 }]}>{'Contactanos: '}</Text>
                            <View style={styles.line} />
                        </View>

                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10, marginBottom: 30, flexDirection: 'row', paddingHorizontal: 19 }}>

                        <TouchableOpacity style={[styles.btnReserva, { flex: 1 }]} onPress={()=>handleOpenLink('https://www.instagram.com/restaurante.escuela.udi/')}>
                            <FontAwesome name="instagram" size={24} color={Colors.light} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnReserva, { flex: 2 }]} onPress={handleOpenWhatsApp}>
                            <Text style={{ fontSize: 20, color: Colors.light, fontWeight: 'bold' }}><FontAwesome name="whatsapp" size={24} color={Colors.light} /> Whatsapp
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnReserva, { flex: 1 }]} onPress={()=>handleOpenLink('https://www.facebook.com/Restaurante.Escuela.UDI.by.Dossier')}>
                            <FontAwesome name="facebook" size={24} color={Colors.light} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

            </View>

        </Animated.ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,

    },
    image: scrollA => ({
        width: '100%',
        height: 450,
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-450, 0, 450, 450 + 1],
                    outputRange: [-450 / 2, 0, 450 * 0.75, 450 * 0.75]
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-450, 0, 450, 450 + 1],
                    outputRange: [2, 1, 1, 1]
                })
            }
        ]

    }),
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        height: 70,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginRight: 10
    },
    iconBack: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: Colors.primary
    },
    date: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    card: {
        height: '100%',
        backgroundColor: Colors.dark,
        //backgroundColor: 'rgba(0,0,0,0.6)',
    },
    containerDescription: {
        borderColor: 'black',
        backgroundColor: 'rgba(27, 1, 1, 0.5)',
        borderRadius: 20,
        margin: 20,
        padding: 5
    },
    titleDescription: {
        fontSize: 19,
        color: '#fff',
        fontWeight: 'bold'
    },
    btnReserva: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        marginHorizontal: 5,
        borderRadius: 20
    },
    DescriptionText: {
        fontSize: 16
    },
    paginationContainer: {
        justifyContent: 'center',

    },
    paginationDot: {
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
    }, line: {
        borderBottomWidth: 1,
        margin: 0,
        borderColor: 'white',
        width: '85%'
        , marginBottom: 15

    },
});

