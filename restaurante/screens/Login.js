import React, { useState,useEffect } from 'react';
import { Colors } from '../colors/index'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity , Modal, ActivityIndicator} from 'react-native';
import { useFormValidation } from '../hooks/inputValidate';
import { LineOr } from '../components/line';
import { useAuth } from '../src/context/authProvider'


const initialState = {
  email: '',
  password: '',
};
const validations = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
};
export const LoginScreen = ({ navigation }) => {
  const { onGoogleButtonPress, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el modal de carga

  const initGoogle = async () => {
    setIsLoading(true); // Mostrar el modal de carga
    const isSuccessful = await onGoogleButtonPress();
    setIsLoading(false); // Ocultar el modal de carga

    if (isSuccessful === false) {
      navigation.navigate('telefono');
    }
    if (isSuccessful === true) {
      navigation.navigate('Home');
    }
  };

  const { formValues, formErrors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation(
    initialState,
    validations
  );

  const onSubmit = () => {
    if (!handleSubmit(validations)) {
      return;
    }
    setIsLoading(true); // Mostrar el modal de carga
    login(formValues)
      .then((result) => {
        setIsLoading(false); // Ocultar el modal de carga
        if (result && result.code) {
          console.log(result.code);
          if (result.code === 'auth/user-not-found') {
            alert('El correo de usuario no existe');
          }
          if (result.code === 'auth/invalid-email') {
            alert('El email es incorrecto');
          }
          if (result.code === 'auth/wrong-password') {
            alert('Contraseña incorrecta');
          }
        } else {
          // Registro exitoso, redireccionar a la siguiente pantalla
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        setIsLoading(false); // Ocultar el modal de carga
        console.log('Error al iniciar sesión:', error);
      });
  };
  return (
    <ScrollView
      style={{ backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <View style={{ height: Dimensions.get('window').height / 2.5, backgroundColor: Colors.primary }}>


        <View style={styles.branView}>
          <View style={styles.viewCabecera}>
            <TouchableOpacity onPress={() => navigation.navigate('inicioapp')}>
              <AntDesign name="arrowleft" size={27} color={Colors.colorText} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={styles.text}>Registrate</Text>
            </TouchableOpacity>

          </View>
          <Text style={styles.brandViewText}>Iniciar Sesión</Text>
          <Text style={{color:Colors.lightGray}}>Ingresa con tu cuenta de usuario introducionde tu correo y contraseña</Text>
        </View>

      </View>
      <View style={styles.bottonView}>
        <View style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 40
        }}>

          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="#A9A9A9"
            value={formValues.email}
            onChangeText={(value) => handleChange('email', value, validations.email)}
            onBlur={() => handleBlur('email')}
          />
          {touched.email && formErrors.email && <Text style={{ marginLeft: '10%', color: Colors.danger }}>{formErrors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={true}
            value={formValues.password}
            onChangeText={(value) => handleChange('password', value, validations.password)}
            onBlur={() => handleBlur('password')}
          />
          {touched.password && formErrors.password && <Text style={{ marginLeft: '10%', color: Colors.danger }}>{formErrors.password}</Text>}
          <TouchableOpacity style={styles.bottomSend} onPress={onSubmit}>
            <Text style={{ color: '#ffff', fontSize: 16, }}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <LineOr />
          <TouchableOpacity style={[styles.bottomSendGoogleFacebbok, { backgroundColor: '#4285F4' }]} onPress={initGoogle}>
            <Text style={{ color: '#ffff', fontSize: 16 }}><AntDesign name="google" size={24} color="white" /> conectate Sesión con Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal de carga */}
      <Modal visible={isLoading} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.modalText}>Iniciando sesión...</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  branView: {
    marginTop: '4%',
    justifyContent: 'center',
    marginRight: 33,
    marginLeft: 33,
  },
  brandViewText: {
    color: Colors.colorText,
    fontSize: 30,
    fontWeight: 'bold'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: '#fff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60
  },
  input: {
    height: 65,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    paddingLeft: 35,
    paddingRight: 30,
    margin: 10,
    fontSize: 16,
    color: '#000000',
    
  },
  bottomSend: {
    height: 65,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    margin: 10,
    color: '#fff'

  },
  viewCabecera: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between'
  },
  text: {
    color: Colors.colorText,
    fontSize: 17,
    fontWeight: 'bold'
  },
  bottomSendGoogleFacebbok: {
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
    , margin: 10

  },
  modalContainer: {
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
})

