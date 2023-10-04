import React, { createContext, useState, useEffect, useContext } from 'react';
import 'expo-dev-client';
import { getFirestore, collection, doc, setDoc, getDoc,where,query,onSnapshot} from 'firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { app } from '../../firebase/firebaseConfig'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('No existe ningún provider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const db = getFirestore(app);
    const [reservas, setReservas] = useState([]);
      
    const getData = () => {
        if (user && user.uid) {
            const q = query(collection(db, 'reservas'), where('userId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const reservasTemp = [];
                querySnapshot.forEach((doc) => {
                    reservasTemp.push({ ...doc.data(), id: doc.id });
                });
                setReservas(reservasTemp);
              });

        }
    };
    useEffect(() => {
        const initialize = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log('Error getting user from SecureStore:', error);
            }

            const subscriber = auth().onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        await SecureStore.setItemAsync('user', JSON.stringify(user));
                    } catch (error) {
                        console.log('Error storing user in SecureStore:', error);
                    }
                }
                setUser(user);
                setInitializing(false); // Cambiado aquí
                getData();
            });
            return () => subscriber();
        };

        initialize();
    }, [initializing]); // Sin dependencias

    GoogleSignin.configure({
        webClientId: '1037067241397-e4j8irmmg6mjsq90v7uacd9mi2f52t1p.apps.googleusercontent.com',
    });


    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const { user } = await auth().signInWithCredential(googleCredential);
            setUser(user);
            await SecureStore.setItemAsync('user', JSON.stringify(user));
            const docRef = await doc(collection(db, 'users'), user.uid);
            const docSnap = await getDoc(docRef);
            const valor = await docSnap.exists()
            if (valor) {
                return true;

            } else {
                return false;
            }
        } catch (error) {
            console.log('Error in Google sign in:', error);
        }
    }
    const CrearUsuario = async (obj) => {
        try {
            const { user } = await auth().createUserWithEmailAndPassword(obj.email, obj.password);
            await user.updateProfile({
                displayName: obj.name,
            });
            setDoc(doc(collection(db, 'users'), user.uid), { phoneNumber: obj.telefono });
            await SecureStore.setItemAsync('user', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            return error
        }
    }

    const login = async (obj) => {
        try {
            const { user } = await auth().signInWithEmailAndPassword(obj.email, obj.password);
            setUser(user);
            await SecureStore.setItemAsync('user', JSON.stringify(user));
        } catch (error) {
            return error
        }
    }

    const logout = async () => {
        try {
            await auth().signOut();
            await GoogleSignin.signOut();
            await SecureStore.deleteItemAsync('user');
            setUser(null);
        } catch (error) {
            console.log('Failed to sign out user: ', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, onGoogleButtonPress, logout, login, CrearUsuario, initializing,getData,reservas }}>
            {children}
        </AuthContext.Provider>
    );
};

