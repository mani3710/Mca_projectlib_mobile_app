import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SplashScreen,
    HomeScreen
} from './screens';
import * as Routes from './routes';
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.SPLASH} component={SplashScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.HOME} component={HomeScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

