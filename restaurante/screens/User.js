import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native';
import { useAuth } from '../src/context/authProvider';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { db } from '../firebase/firebaseConfig';
import { collection, doc, getDoc } from "firebase/firestore";
import { Colors } from '../colors';
import SubmenuButton from '../components/buttonSubmenuActive';
const fondoBg = require('../assets/fondoComida.png');


export const UserScreen = ({ navigation }) => {
    const { user, logout, reservas, getData } = useAuth();
    const [userColeccion, setUserColeccion] = useState(null);
    const [reservas1, setReservas1] = useState([]);
    const [activeButton, setActiveButton] = useState('pendientes');
    const [color, setColor] = useState('#F87B21');

    const getUserCollection = async () => {
        if (user) {
            const docRef = doc(collection(db, 'users'), user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserColeccion(docSnap.data());
            } else {
                console.log("No such document!");
            }
        }
    };
    const cerrarSesion = async () => {
        await logout();
        navigation.navigate('Auth', { screen: 'login' });
    }
    const handlePendientesPress = () => {
        const pendientes = reservas.filter((item) => item.estado === 1);
        setReservas1(pendientes);
        setColor('rgba(0, 0, 0, 0.5)');
        setActiveButton('pendientes');
    };
    const handleTerminadasPress = () => {
        const terminadas = reservas.filter((item) => item.estado === 0);
        setReservas1(terminadas);
        setColor('#BF2B2B');
        setActiveButton('terminadas');
    };
    useEffect(() => {
        getUserCollection();
        getData();
        handlePendientesPress();
    }, [])

    const renderReservas = (reservas) => {
        if (reservas.length === 0) {
            return <Text style={{ color: Colors.colorText, marginTop: '40%',marginLeft: '30%', fontSize: 20 }} >Lista vacía</Text>; // Retorna un mensaje de lista vacía si no hay reservas
        }
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

        return reservas.map((reserva) => {
            const fechaMenu = new Date(reserva?.fechaMenu);

            return (
                <TouchableOpacity
                    onPress={()=>navigation.navigate('detallereserva',{reservaId:reserva?.id})}
                    key={reserva.id}
                    style={[
                        styles.reservaItem,
                        reserva.estado === 1 && activeButton === 'pendientes' && styles.activeReservaItem,
                        reserva.estado === 0 && activeButton === 'terminadas' && styles.activeReservaItem,
                        { backgroundColor: color }
                    ]}
                    activeOpacity={1}
                >
                    <View style={styles.reservaContent}>
                        <Image source={{ uri: reserva?.imagen }} style={styles.reservaImagen} />
                        <View style={styles.reservaDetails}>
                            <Text style={styles.reservaTitulo}>{reserva?.titulo}</Text>
                            <Text style={styles.reservaFecha}>{fechaMenu.getDate()} de {fechaMenu.toLocaleDateString('es', { month: 'long' })}</Text>
                            <Text style={styles.reservaCantidad}>
                                <MaterialIcons name="people" size={30} color={Colors.colorText} />x{reserva?.comensales} Comensales
                            </Text>
                            {reserva.estado === 1 && (
                                <Text style={styles.reservaCantidad}><Ionicons name="alarm-sharp" size={24} color="white" /> {calculateTimeDifference(fechaMenu)} </Text>
                            )}
                        </View>
                    </View>
                    {reserva.estado === 1 && (
                        <Text style={styles.pendienteText}>Pendiente</Text>
                    )}
                </TouchableOpacity>
            );
        });
    };

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={fondoBg} style={{ height: Dimensions.get('window').height,paddingTop:12 }}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <AntDesign name="arrowleft" size={28} color={Colors.colorText} />
                    </TouchableOpacity>
                    <Text style={styles.displayName}>{user?.displayName}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={{ uri: user?.photoURL || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' }} style={styles.profileImage} />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.userInfoText}>{userColeccion?.phoneNumber}</Text>
                    <Text style={styles.userInfoText}>{user?.email}</Text>
                    <TouchableOpacity onPress={cerrarSesion} style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Cerrar Sesion</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonsContainer}>
                    <SubmenuButton
                        styleObj={{
                            backgroundColor: '#F87B21',
                            borderTopLeftRadius: 12,
                            borderBottomLeftRadius: 12
                        }}
                        title="Pendientes"
                        onPress={handlePendientesPress}
                        isActive={activeButton === 'pendientes'}
                    />
                    <SubmenuButton
                        styleObj={{
                            backgroundColor: '#BF2B2B',
                            borderBottomRightRadius: 12,
                            borderTopRightRadius: 12
                        }}
                        title="Terminadas"
                        onPress={handleTerminadasPress}
                        isActive={activeButton === 'terminadas'}
                    />
                </View>
                <ScrollView style={styles.contentContainer} >
                    {renderReservas(reservas1)}
                </ScrollView>
            </ImageBackground>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark,
        minHeight: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        width: '100%',
    },
    displayName: {
        color: Colors.colorText,
        fontSize: 17,
        marginRight: 10,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginTop: 20,
    },
    userInfoText: {
        color: Colors.colorText,
        fontSize: 17,
        marginTop: 10,
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    logoutText: {
        color: Colors.colorText,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 14
    },
    button: {
        backgroundColor: Colors.secondary,
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: Colors.colorText,
    },
    contentContainer: {
        marginTop: 20,
        width: '100%',
        backgroundColor: Colors.contentBackground,
        paddingLeft:'5%'
    },
    reservaItem: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '95%',
    },
    reservaContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reservaImagen: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 10,
    },
    reservaDetails: {
        flex: 1,
    },
    reservaTitulo: {
        color: Colors.colorText,
        fontSize: 17,
        marginBottom: 5,
    },
    reservaFecha: {
        color: Colors.colorText,
        fontSize: 15,
        marginBottom: 5,
    },
    reservaCantidad: {
        color: Colors.colorText,
        fontSize: 15,
    },
    pendienteText: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: 'green',
        fontWeight: 'bold',
    },
    registerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: '80%'
    },
    registerText: {
        color: Colors.colorText,
        fontSize: 17,
        marginBottom: 20,
        textAlign: 'center',
    },
    registerButton: {
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        alignItems: 'center',
    },
    registerButtonText: {
        color: Colors.colorText,
    },
});