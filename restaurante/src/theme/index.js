import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

const ColorsLight = {
    textPrimary: '#000',
    background: '#fff',
    button: '#FFA32D',
    buttonText: '#fff',
    secondary: '#2D2B24',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    lightGray: '#D3D3D3',
};

const ColorsDark = {
    textPrimary: '#fff',
    background: '#000',
    button: '#FFA32D',
    buttonText: '#fff',
    secondary: '#2D2B24',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    lightGray: '#D3D3D3',
};

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('No existe ningún provider');
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [color, setColor] = useState(ColorsLight);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        (async () => {
            try {
                const storedTheme = await SecureStore.getItemAsync('theme');
                if (storedTheme) {
                    setTheme(storedTheme);
                    setColor(storedTheme === 'light' ? ColorsLight : ColorsDark);
                }
            } catch (error) {
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                await SecureStore.setItemAsync('theme', theme);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [theme]);
    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            setColor(ColorsDark);
        } else {
            setTheme('light');
            setColor(ColorsLight);
        }
    };

    return (
        <ThemeContext.Provider value={{ color, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
