import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity ,Dimensions} from 'react-native';
import { useAuth } from '../src/context/authProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../colors';
import { ItemMenuEleccion } from '../components'
import { LinearGradient } from 'expo-linear-gradient';

export const DetalleScreen = ({ navigation, route }) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const { fotoURL, titulo, fecha, bebidas, EntrantesEleccion, PostresEleccion, PrincipalEleccion, precio, cupos, descripcion } = route.params;
  const backBotton = () => navigation.navigate('Home')
  const { user } = useAuth();
  const onSubmitReservar = () => {
    if (!user) {
      return navigation.navigate('Auth', { screen: 'login' });
    }
    navigation.navigate('finalizarReserva',route.params);

  }

  return (
    <Animated.ScrollView style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollA } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <View style={{backgroundColor:Colors.light}}>
        <Animated.Image source={{ uri: fotoURL }} style={styles.image(scrollA)} />
        <TouchableOpacity style={styles.iconBack} onPress={backBotton}>
          <Icon name="angle-left" size={40} color={Colors.colorText} />
        </TouchableOpacity>
        <View style={styles.date}>
          <View style={{ marginLeft: 10, width: 70 }}>
            <View style={{ backgroundColor: 'red', height: 25, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 12, borderTopEndRadius: 12 }}>
              <Text style={{ color: Colors.colorText }}> {new Date(fecha).toLocaleDateString('default', { month: 'long' })} </Text>
            </View>
            <View style={{ backgroundColor: Colors.bgLight, height: 50, justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 12, borderBottomStartRadius: 12 }}>
              <Text style={{ fontSize: 24 }}>{new Date(fecha).getDate()}</Text>
            </View>
          </View>
          <View style={{ marginRight: 10, width: 70 }}>
            <View style={{ backgroundColor: 'red', height: 25, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 12, borderTopEndRadius: 12 }}>
              <Text style={{ color: Colors.colorText }}>Precio Bs</Text>
            </View>
            <View style={{ backgroundColor: Colors.bgLight, height: 50, justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 12, borderBottomStartRadius: 12 }}>
              <Text style={{ fontSize: 24 }}>{precio}</Text>
            </View>
          </View>

        </View>


      </View>
      <View style={styles.card}>
      <LinearGradient
        colors={[ Colors.primary,'#1C0202']}>
        <View style={styles.containerDescription}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.titleDescription, { fontSize: 30, }]}>{titulo}</Text>
            <Text style={[styles.titleDescription, { fontSize: 15, marginBottom: 15 }]}>{new Date(fecha).getDate()} de {new Date(fecha).toLocaleDateString('es', { month: 'long' })} </Text>
          </View>
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 40 }}>
            <Text style={[styles.titleDescription, { fontSize: 20}]}>{descripcion}</Text>
            <View style={styles.line} />
            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 3 }]}>ENTRANTES A ELECCION</Text>
            {EntrantesEleccion.map(item => (<ItemMenuEleccion key={item} titulo={item} />))}
            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 3 }]}>PRINCIPAL A ELECCION</Text>
            {PrincipalEleccion.map(item => (<ItemMenuEleccion key={item} titulo={item} />))}

            <Text style={[styles.titleDescription, { fontSize: 16, marginBottom: 3 }]}>POSTRE A ELECCION</Text>
            {PostresEleccion.map(item => (<ItemMenuEleccion key={item} titulo={item} />))}</View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' ,margin:15}}>
            <Text style={[styles.titleDescription, { fontSize: 15 }]}>{cupos === 0 ? 'No hay cupos' : 'Cupos limitados'} </Text>
            <Text style={[styles.titleDescription, { fontSize: 15 }]}>{bebidas}  </Text>
            <Text style={[styles.titleDescription, { fontSize: 15 }]}>Ingreso: 12:00 - 12:30</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10, marginBottom: 30 }}>
          <TouchableOpacity style={styles.btnReserva} onPress={onSubmitReservar}>
            <Text style={{ fontSize: 20, color: Colors.primary,fontWeight:'bold' }}>RESERVAR</Text>
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
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
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
  },line: {
    borderBottomWidth: 1,
    margin:0,
    borderColor: 'white',
    width:'85%'
    , marginBottom: 15 

  },
});

