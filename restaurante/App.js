import { ThemeProvider } from './src/theme';
import { AuthProvider } from './src/context/authProvider';
import { RouteScreen } from './src/routeScreens/routesScreen';
export default function App() {
 
  return (
    <AuthProvider>
      <ThemeProvider><RouteScreen/></ThemeProvider>
    </AuthProvider>
    
    
  );
}


