import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SplashScreen,
    HomeScreen,
    LoginScreen,
    StudentScreen,
    ReviewScreen,
    TopicListScreen
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
                    name={Routes.LOGIN} component={LoginScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.HOME} component={HomeScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.STUDENT_LIST} component={StudentScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.REVIEW_LIST} component={ReviewScreen} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name={Routes.TOPIC_LIST} component={TopicListScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

