import { Text, StyleSheet } from 'react-native';
import { Colors } from '../colors/index';
import { FontAwesome } from '@expo/vector-icons';
export const ItemMenuEleccion = ({ titulo, }) => {
  return (
          <Text style={styles.titulo}><FontAwesome name="circle" size={10} color="white" /> {titulo}</Text>
  )
}
const styles = StyleSheet.create({
  titulo: {
    fontSize: 16,
    color:Colors.colorText,
    fontWeight: 'bold',
    marginLeft:5,
    marginRight:14,
  },
  
});
