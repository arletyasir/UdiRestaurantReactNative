import { View, Text, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Colors } from '../colors/index';

export const ItemMenu = ({titulo,fecha,imagen,cantidad,onPress}) => {
  return (
   
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemContent}>
      <View style={styles.tituloFechaContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.fecha}>{new Date (fecha).toLocaleDateString()}</Text>
      </View>
      
      <Image source={{uri:imagen}} style={[styles.imagen]} />
     
    </View>
  </TouchableOpacity>
  
  )
}
const styles = StyleSheet.create({
    
    item: {
      flexDirection: 'column',
      margin: 8,
      backgroundColor: Colors.primary,
      borderRadius: 10,

        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    imagen: {
      marginBottom: 10,
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    fecha: {
      fontSize: 14,
      marginBottom: 5,
    },
    cantidad: {
      fontSize: 14,
      marginBottom: 10,
    },
    boton: {
      backgroundColor: '#00E68E',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    botonText: {
      color: 'black',
      fontWeight: 'bold',
    },
    itemContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tituloFechaContainer: {
      alignItems: 'center',
     
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#fff',

    },
    fecha: {
      fontSize: 14,
      marginBottom: 0,
      color: '#fff',

    },
    imagen: {
      width: '100%',
      height: 100,
    },
    cantidadBotonContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems:'center'
    },
    cantidad: {
      fontSize: 14,
      color: '#fff',
      marginRight: 10,
    },
    boton: {
      backgroundColor: '#007aff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    botonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
   
  });


  
/*export const ItemMenu = ({titulo,fecha,imagen,cantidad,onPress}) => {
  return (
   
    <View style={styles.item}>
    <View style={styles.itemContent}>
      <View style={styles.tituloFechaContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.fecha}>{fecha}</Text>
      </View>
      
      <Image source={{uri:imagen}} style={[styles.imagen,{width:372,height:400}]} />
      <View style={styles.cantidadBotonContainer}>
       
        <TouchableOpacity style={[styles.boton,{backgroundColor:Colors.colorBgBottom}]} onPress={onPress}>
          <Text style={styles.botonText}>Ver detalles</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  </View>
  
  )
}
const styles = StyleSheet.create({
    
    item: {
      flexDirection: 'column',
      margin: 10,
      backgroundColor: Colors.secondary,
      borderRadius: 10,

        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    imagen: {
    
      marginBottom: 10,
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    fecha: {
      fontSize: 14,
      marginBottom: 5,
    },
    cantidad: {
      fontSize: 14,
      marginBottom: 10,
    },
    boton: {
      backgroundColor: '#00E68E',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    botonText: {
      color: 'black',
      fontWeight: 'bold',
    },
    itemContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tituloFechaContainer: {
      alignItems: 'center',
     
    },
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#fff',

    },
    fecha: {
      fontSize: 14,
      marginBottom: 0,
      color: '#fff',

    },
    imagen: {
      width: 317,
      height: 370,
    },
    cantidadBotonContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems:'center'
    },
    cantidad: {
      fontSize: 14,
      color: '#fff',
      marginRight: 10,
    },
    boton: {
      backgroundColor: '#007aff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    botonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
   
  });
*/