import { View, Text, StyleSheet, Animated, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useRef, useState, useEffect } from 'react';
import { Colors } from '../colors/index';
import { ItemMenu, BottonNavigations } from '../components/index'
import { FontAwesome } from '@expo/vector-icons';
import { TitleText } from '../components/component';
import { useAuth } from '../src/context/authProvider';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs,onSnapshot } from 'firebase/firestore';
const fondoBgHome = require('../assets/fondoHome.jpg');

export const HomeScreen = ({ navigation }) => {
  const [menuList, setMenuList] = useState([]);
  const [number, setNumber] = useState(0);

  const [loading, setLoading] = useState(true);
  const animatedHeader = useRef(new Animated.Value(0)).current;
  const botonFlotanteRef = useRef();
  const { user } = useAuth();
  const navigateDetalle = (menu) => { navigation.navigate('Detalle', menu); }
  const navigateMapa = () => navigation.navigate('mapa');
  const Restaurante = () => navigation.navigate('restaurante');

  const navigateNotificaciones = () => navigation.navigate('notificaciones');
  const navigateUser = () => {
    if (user === null) {
      navigation.navigate('Auth', { screen: 'login' });
    }
    else {
      navigation.navigate('user');

    }
  }
  const getData = () => {
    const today = new Date().getTime();
    
    const q = query(collection(db, 'menus'), where('fecha', '>=', today));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const menus = [];
      querySnapshot.forEach((doc) => {
        menus.push({ ...doc.data(), id: doc.id });
      });
        setMenuList(menus);
        setLoading(false);
    });
    /*getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          menus.push({ ...doc.data(), id: doc.id });
        });
        setMenuList(menus);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
        setLoading(false);
      });*/

  }
  useEffect(() => {
    getData();
    getNotificationes();

  }, []);
  const getNotificationes = () => {
    if (user !== null) {
      const q = query(collection(db, "notificacion"),
        where('userUid', '==', user.uid),
        where("leido", "==", false));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notificaciones = [];
        querySnapshot.forEach((doc) => {
          notificaciones.push(doc.data());
        });
        setNumber(notificaciones.length)
      });
    }
  }
  const headerAnimate = {
    transform: [
      {
        scaleX: animatedHeader.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        })
      },
      {
        translateX: animatedHeader.interpolate({
          inputRange: [0, 25],
          outputRange: [0, -100],
          extrapolate: 'clamp',
        })
      }
    ],
    opacity: animatedHeader.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    }),
  };
  const AnimateText = Animated.createAnimatedComponent(Text);

  const onScroll = () => botonFlotanteRef.current.slideInUp(300);
  const onScroll2 = () => botonFlotanteRef.current.slideOutDown(1500);

  const CustomHeader = () => {
    return (
      <SafeAreaView>
        <View style={styles.upperHeader}>
          <TouchableOpacity>
            <FontAwesome name="map" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
          <AnimateText style={[headerAnimate, { fontSize: 25, color: '#fff', marginStart: 8, fontStyle: 'italic' }]}>¡Bienvenido!</AnimateText>
        </View>
      </SafeAreaView>

    );
  };



  return (
    <View style={styles.container}>
      <ImageBackground source={fondoBgHome} resizeMode="cover" style={{ height: '100%' }}>
        <StatusBar />
        <CustomHeader />
        <ScrollView style={{ paddingBottom: 100 }}


          onScroll={e => {
            const offsety = e.nativeEvent.contentOffset.y;
            animatedHeader.setValue(offsety);
          }}
          onScrollBeginDrag={onScroll2}
          onMomentumScrollEnd={onScroll} // Asigna la función de manejo de desplazamiento al evento onScroll
          scrollEventThrottle={20} // Ajusta la velocidad de manejo del evento de desplazamiento
        >
          <View style={styles2.container}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginVertical: 22 }}>
              <TitleText title1={'RESTAURANTE ESCUELA'} size={25} colorParam={Colors.light} textShadowColorParam={Colors.dark} />
            </View>


            {loading ? (
              <View style={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <Text style={{ color: Colors.colorText }}>Caragando menus...</Text>
              </View>

            ) : (
              // Render the menu items once the data is loaded
              Array.from(Array(Math.ceil(menuList.length / 2)), (item, rowIndex) => (
                <View style={styles2.row} key={rowIndex}>
                  {menuList.slice(rowIndex * 2, rowIndex * 2 + 2).map((item) => (
                    <View style={styles2.itemContainer} key={item.id}>
                      <ItemMenu
                        imagen={item.fotoURL}
                        titulo={item.titulo}
                        onPress={() => navigateDetalle(item)}
                        fecha={item.fecha}
                      />
                    </View>
                  ))}
                </View>
              ))
            )}
          </View>


        </ScrollView>
        <Animatable.View
          ref={botonFlotanteRef}
          style={styles.botonFlotanteContainer}
          animation="slideInUp" // Inicializa la animación de entrada en la posición normal
        >
          <BottonNavigations 
            NavigateUser={navigateUser} 
            navigateNotificacion={navigateNotificaciones} 
            number={user?number:0}
            restaurante={Restaurante}
             />

        </Animatable.View>
      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({

  cabecera: {
    marginHorizontal: 2

  },
  cabeceraTexto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#810202',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },

  upperHeader: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: Colors.primary,
    paddingTop: 10
  },
  lowerHeader: {
    height: 96,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
  }, flatListContainer: {
    flex: 1,
    paddingBottom: 50, // Agrega el margen inferior deseado
  },



});
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espacio vertical entre las filas
  },
  itemContainer: {
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Ocupa el 45% del ancho para mostrar dos elementos en cada fila

  },
});




const Lista1 = [
  {
    id: 1,
    imagen: 'https://www.tapasmagazine.es/wp-content/uploads/2015/02/gtres_a00618498_636.jpg',
    titulo: 'Cocina española',
    fecha: 'Marte 23 de Mayo',
    cantidad: 5,
  },
  {
    id: 2,
    imagen: 'https://static.wixstatic.com/media/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg/v1/fill/w_591,h_441,al_c,lg_1,q_80,enc_auto/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg',
    titulo: 'Cocina Andina',
    fecha: 'Miércoles 24 de Mayo',
    cantidad: 10,
  },
  {
    id: 3,
    imagen: 'https://estag.fimagenes.com/imagenesred/2431056_0.jpg?1',
    titulo: 'Cocina Española',
    fecha: 'Jueves 24 de Mayo',
    cantidad: 3,
  },
  {
    id: 4,
    imagen: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/15658/production/_92304678_thinkstockphotos-511364262.jpg',
    titulo: 'Cocina Peruana',
    fecha: 'Viernes 25 de Mayo',
    cantidad: 5,
  },
  {
    id: 5,
    imagen: 'https://static.wixstatic.com/media/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg/v1/fill/w_591,h_441,al_c,lg_1,q_80,enc_auto/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg',
    titulo: 'Cocina Andina',
    fecha: 'Miércoles 24 de Mayo',
    cantidad: 10,
  },
  {
    id: 6,
    imagen: 'https://estag.fimagenes.com/imagenesred/2431056_0.jpg?1',
    titulo: 'Cocina Española',
    fecha: 'Jueves 24 de Mayo',
    cantidad: 3,
  },
  {
    id: 7,
    imagen: 'https://static.wixstatic.com/media/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg/v1/fill/w_591,h_441,al_c,lg_1,q_80,enc_auto/25148c_44de70910d8347f584e6d23696ad56ff~mv2.jpg',
    titulo: 'Cocina Andina',
    fecha: 'Miércoles 24 de Mayo',
    cantidad: 10,
  },
  {
    id: 8,
    imagen: 'https://estag.fimagenes.com/imagenesred/2431056_0.jpg?1',
    titulo: 'Cocina Española',
    fecha: 'Jueves 24 de Mayo',
    cantidad: 3,
  },
];

