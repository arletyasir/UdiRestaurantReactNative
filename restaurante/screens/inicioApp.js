import React,{useRef,useEffect} from 'react';
import {Colors} from '../colors/index'
const logo = require('../assets/logoinicio.png');
import {StyleSheet, View,Text,Animated,TouchableOpacity} from 'react-native';
import {RotateAndScaleAnimationImg,AnimationScaleText} from '../components/animation';
import { TitleText } from '../components/component';

export const InicioApp = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scale1 = useRef(new Animated.Value(5)).current;

  useEffect(()=>{
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }).start();
      Animated.timing(scale1, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }).start();

  },[])
  return (

    <View
      style={styles.container}>
      <View style={{flex: 2,
         backgroundColor: '#ffffff',
         alignItems:'center',
         justifyContent: 'center',
         }}>
          <TitleText title1={'RESTAURANTE ESCUELA'} size={25} colorParam={Colors.secondary} textShadowColorParam={Colors.primary}/>
          <RotateAndScaleAnimationImg img={logo}/>

      </View>
      <Animated.View style={{
        flex: 2, 
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 60,
        borderTopRightRadius:60,transform:[{scale:scale1}]}} >

      <View style={styles.cabezera}>
        <Animated.Text style={{color:Colors.light,fontSize: 36,fontWeight:'bold',opacity:fadeAnim}}>! Bienvenido !</Animated.Text>
          <AnimationScaleText color={Colors.light} durationSeg={4000} size={16} text={'Disfruta con tus amigos o familia de una exelente opcion para almorzar en el primer retaurante de escuela de Bolivia ¡Comencemos!'}/>
      </View>
      <View style={styles.containerBotton}>
        <TouchableOpacity style={styles.bottomSend} onPress={() => navigation.navigate('login')} >
          <Text style={{color:Colors.light,fontSize: 16,}}>Inicia Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomSend1} onPress={() => navigation.navigate('register')}>
          <Text style={{color:Colors.secondary,fontSize: 16,}}>Registrate</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.containerBottonInvitado}>
        
        <TouchableOpacity style={styles.bottomSendInvtado} onPress={() => navigation.navigate('Home')}>
          <Text style={{color:Colors.colorText,fontSize: 16,}}>Iniciar como invitado</Text>
        </TouchableOpacity>
        
      </View>
     
      </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  cabezera:{
    padding:35
  },
  containerBotton:{
    paddingRight:25,
    paddingLeft:25,
    flexDirection:'row',
  },
  containerBottonInvitado:{
    paddingRight:25,
    paddingLeft:25,
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center'
  }
  ,
  bottomSend: {
    height: 65,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    justifyContent:'center',
    alignItems:'center',
    width:'45%',
    margin: 10,

  },
  bottomSend1: {
    height: 65,
    borderRadius: 30,
    width:'45%',
    backgroundColor: '#ffffff',
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
  bottomSendInvtado: {
    height: 45,
    borderRadius: 30,
    backgroundColor: Colors.bgRGBprincipal,
    justifyContent:'center',
    alignItems:'center',
    width:'90%',
    margin: 10,

  },
  
});
