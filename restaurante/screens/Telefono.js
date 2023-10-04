import React, { useState } from 'react';
import { Colors } from '../colors/index'
import { Picker } from '@react-native-picker/picker';
import { ScrollView, View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity ,Modal} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useAuth } from '../src/context/authProvider';
import { useFormValidation } from '../hooks/inputValidate';
import { getFirestore, collection, doc, setDoc} from 'firebase/firestore';
import { app } from '../firebase/firebaseConfig';


const countryCodes = [
  { label: "🇦🇷", value: "+54" }, // Argentina
  { label: "🇧🇴", value: "+591" }, // Bolivia
  { label: "🇧🇷", value: "+55" }, // Brasil
  { label: "🇨🇱", value: "+56" }, // Chile
  { label: "🇨🇴", value: "+57" }, // Colombia
  { label: "🇨🇷", value: "+506" }, // Costa Rica
  { label: "🇨🇺", value: "+53" }, // Cuba
  { label: "🇪🇨", value: "+593" }, // Ecuador
  { label: "🇸🇻", value: "+503" }, // El Salvador
  { label: "🇬🇹", value: "+502" }, // Guatemala
  { label: "🇭🇳", value: "+504" }, // Honduras
  { label: "🇲🇽", value: "+52" }, // México
  { label: "🇳🇮", value: "+505" }, // Nicaragua
  { label: "🇵🇦", value: "+507" }, // Panamá
  { label: "🇵🇾", value: "+595" }, // Paraguay
  { label: "🇵🇪", value: "+51" }, // Perú
  { label: "🇺🇾", value: "+598" }, // Uruguay
  { label: "🇻🇪", value: "+58" }  // Venezuela
];

const initialState = {

  phoneNumber: '',

};
const validations = {

  phoneNumber: {
    required: true,
    minLength: 8,
  },

};


export const Telefono = ({ navigation }) => {
  const { user } = useAuth();
  const db = getFirestore(app);
  const [aceptado, setAceptado] = useState(false);
  const [countryCode, setCountryCode] = useState('+591');
  const [modalVisible, setModalVisible] = useState(false);

  const { formValues,
    formErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit, } = useFormValidation(
      initialState,
      validations,
    );
  const onSubmit = () => {
    console.log(handleSubmit(validations))
    if (!handleSubmit(validations)) {
      return;
    }
    if (!aceptado) {
      return alert('Debes aceptar los términos y condiciones para continuar');;
    }
    try {
      formValues.phoneNumber=countryCode+formValues.phoneNumber
      setDoc(doc(collection(db, 'users'), user.uid), formValues);
      navigation.navigate('Home');

    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <ScrollView
      style={{ backgroundColor: '#ffffff' }}
      showsVerticalScrollIndicator={false}>
      <View style={{ height: Dimensions.get('window').height / 3.5, backgroundColor: Colors.primary }}>
        <View style={styles.branView}>
          <View style={styles.viewCabecera}>
          </View>
          <Text style={styles.brandViewText}>Registrate tu telefono</Text>
          <Text style={{color:Colors.lightGray}}>Agrega tu telefono para que podamos contactarte y te demos mejor atencion</Text>
        </View>

      </View>
      <View style={styles.bottonView}>
        <View style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 40
        }}>
          
          <View style={styles.inputWrapper}>

            <TextInput
              style={styles.inputWithPicker}
              placeholder="phoneNumber"
              value={formValues.telefono}
              keyboardType="numeric"
              onChangeText={(value) => handleChange('phoneNumber', value, validations.phoneNumber)}
              onBlur={() => handleBlur('phoneNumber')}
            />
            <Picker
              selectedValue={countryCode}
              style={styles.picker}
              onValueChange={(itemValue) =>{
                setCountryCode(itemValue);
              }
              }>
              {countryCodes.map((country, index) => (
                <Picker.Item key={index} label={country.label} value={country.value} />
              ))}
            </Picker>

          </View>
          {touched.phoneNumber && formErrors.phoneNumber && <Text style={{ marginLeft: '10%', color: Colors.danger }}>{formErrors.phoneNumber}</Text>}
          <View style={[styles.contenedor,{marginBottom:15}]}>
            <CheckBox
              title='Acepto los términos y condiciones'
              checked={aceptado}
              onPress={() => setAceptado(!aceptado)}
              containerStyle={styles.checkBox}
              textStyle={styles.textoCheckBox}
              checkedColor='#000'
              uncheckedColor='#aaa'
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}><Text>Leer terminos y condiciones</Text></TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.bottomSend} onPress={onSubmit}>
            <Text style={{ color: Colors.colorText, fontSize: 16, }}>Registrar y continuar</Text>
          </TouchableOpacity>

        </View>
      </View>
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent1}>
           <Text style={{color:Colors.colorText,marginBottom:10}}>NUESTROS TERMINOS Y CONDICIONES</Text>
            <Text style={{color:Colors.colorText}}>
              Los Términos y Condiciones, también denominados como Condiciones Generales de Uso, son un documento diseñado para aquellas personas que van a crear o administrar una página o sitio web, en el cual se establecen las condiciones bajo las cuales los usuarios ingresarán y harán uso del sitio web.
              El documento se encuentra diseñado para sitios que sean operados o manejados por personas o empresas que tengan su domicilio en la República Mexicana o que estén destinados a personas que habitan en este país, no obstante, su contenido hace referencia a disposiciones civiles comunes en la mayoría de los países del mundo.
              Este documento es utilizado para regular las condiciones y reglas a las que se someten tanto los usuarios de un sitio web como su propietario y/o administrador, en lo referente al acceso y utilización del sitio web. De igual manera, hace referencia a las políticas de privacidad, protección de datos personales, enlaces, etc., que se tomarán para proteger la privacidad de los usuarios.
              Dichas reglas y principios aportan un mayor nivel de confianza y seguridad jurídica a los usuarios del sitio web así como a sus propietarios y/o administradores, puesto que también se establece el tipo de personas a las que va dirigido y las responsabilidades que estos adquieren al hacer uso del sitio o de los servicios que en él son ofrecidos.
              Existe además otro documento conocido generalmente como "Condiciones Generales de Venta" que se utiliza para regular la adquisición de productos o servicios a través de internet, no obstante, este último no debe ser confundido con el presente documento, puesto que el presente solo se limita a regular el acceso, funcionamiento e interacción del usuario con el sitio web, sin que se incluya las condiciones bajo las cuales se formalizará la adquisición de productos o servicios que tengan un costo o que requieran una licencia; y que se puedan obtener o adquirir a través del mismo sitio web.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    display:'flex',
    flexDirection: 'column',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
    height: 65,
  },
  picker: {
    flex: 2,
    color: '#000', // Ensure the text color is different from the background color
    height: '100%'
  },
  inputWithPicker: {
    flex: 4,
    height: '100%',
    fontSize: 16,
    color: '#000000',
    paddingLeft: 10

  },
  branView: {
    marginTop: '4%',
    justifyContent: 'center',
    marginLeft: 33,
    marginRight: 33
  },
  brandViewText: {
    color: Colors.colorText,
    fontSize: 30,
    fontWeight: 'bold'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
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
    color: '#000000'
  },
  bottomSend: {
    height: 65,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    marginLeft: 10,
    marginRight: 10

  },
  viewCabecera: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  text: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  checkBox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  textoCheckBox: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#000'
  },
  bottomSendGoogleFacebbok: {
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff'
    , margin: 10

  },
})