import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Cadastro from '../components/Cadastro';
import Alterar from '../components/Alterar';
import SplashScreen from '../components/SplashScreen';

const Stack = createStackNavigator();

export default function Rotas() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen 
					name="Splash" 
					component={SplashScreen} 
					options={{ headerShown: false }} />
				<Stack.Screen 
					name="Home" 
					component={Home} />
				<Stack.Screen 
					name="Cadastro" 
					component={Cadastro} />
				<Stack.Screen 
					name="Alterar" 
					component={Alterar} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}