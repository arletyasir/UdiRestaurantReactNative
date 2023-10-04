import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../../screens/Login';
import { InicioApp } from '../../screens/inicioApp';
import { RegisterScreen } from '../../screens/Register';
import { HomeScreen } from '../../screens/HomeScreen';
import { DetalleScreen } from '../../screens/DetalleScreen';
import { MapScreen } from '../../screens/MapaScreen';
import { useAuth } from '../context/authProvider';
import { UserScreen } from '../../screens/User';
import { Telefono } from '../../screens/Telefono';
import { Reserva } from '../../screens/FinalizarReserva';
import NotificacionesScreen from '../../screens/notificaciones';
import { ActivityIndicator,View } from 'react-native';
import { Colors } from '../../colors';
import { DetalleReserva } from '../../screens/DetalleReserva';
import { Restaurante } from '../../screens/Restaurante';

const Stack = createNativeStackNavigator();
const AuthTab = createMaterialTopTabNavigator();

const AuthScreens = () => {

    return (
        <AuthTab.Navigator tabBar={() => null} initialRouteName="inicioapp">
            <AuthTab.Screen name="login" component={LoginScreen} />
            <AuthTab.Screen name="inicioapp" component={InicioApp} />
            <AuthTab.Screen name="register" component={RegisterScreen} />
        </AuthTab.Navigator>
    );
}

export const RouteScreen = () => {
    const { user, initializing } = useAuth();
    if (initializing) {
        return (
                <View style={{backgroundColor:Colors.primary,height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <View style={{backgroundColor:Colors.primary}}>
                        <ActivityIndicator size="large" color={Colors.secondary} />
                    </View>
                </View>
        )
    }
    if (user !== null) {
        return <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false,
                }}>

                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Detalle" component={DetalleScreen} />
                <Stack.Screen name="mapa" component={MapScreen} />
                <Stack.Screen name="user" component={UserScreen} />
                <Stack.Screen name="telefono" component={Telefono} />
                <Stack.Screen name="finalizarReserva" component={Reserva} />
                <Stack.Screen name="notificaciones" component={NotificacionesScreen} />
                <Stack.Screen name="detallereserva" component={DetalleReserva} />
                <Stack.Screen name="restaurante" component={Restaurante} />

            </Stack.Navigator>
        </NavigationContainer>
    }

    if (user === null) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={'Auth'}
                    screenOptions={{
                        headerShown: false,
                    }}>
                    {<Stack.Screen name="Auth" component={AuthScreens} />}
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Detalle" component={DetalleScreen} />
                    <Stack.Screen name="mapa" component={MapScreen} />
                    <Stack.Screen name="user" component={UserScreen} />
                    <Stack.Screen name="telefono" component={Telefono} />
                    <Stack.Screen name="finalizarReserva" component={Reserva} />
                    <Stack.Screen name="notificaciones" component={NotificacionesScreen} />
                    <Stack.Screen name="restaurante" component={Restaurante} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
};
