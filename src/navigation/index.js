import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    SplashScreen,
    HomeScreen,
    LoginScreen,
    StudentScreen,
    ReviewScreen,
    TopicListScreen,
    ProjectScreen
} from './screens';
import { Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Routes from './routes';
import IMAGES from '../assest/images';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// const HomeStack = () => {

//     return (

//         <Stack.Navigator >
//             <Stack.Screen
//                 options={{
//                     headerShown: false,
//                 }}
//                 name={Routes.HOME} component={HomeScreen}
//             />
//         </Stack.Navigator>

//     );
// };
const MainBottomNav = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {

                    backgroundColor: "#fff",
                    elevation: 20,
                    // height: Mixins.verticalScaleSize(60),
                },
                activeTintColor: "#56121D",
                labelStyle: {
                    fontSize: 8,
                    color: "#000",
                    marginBottom: 10,
                    fontWeight: '700',


                }

            }}>
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={IMAGES.homeIcon} />
                    ),

                }}
                name={Routes.PROJECT_SCREEN} component={ProjectScreen}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Image style={{ width: 20, height: 20 }} source={IMAGES.personIcon} />
                    ),

                }}
                name={Routes.HOME} component={HomeScreen}
            />


            {/* <Tab.Screen
                options={{
                    tabBarLabel: "Cart",
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name="cart-outline"
                            color={color}
                            type='ionicon'
                            size={20}
                        />
                    ),
                }}
                name={Routes.CART_SCREEN}
                component={Cart}
            /> */}

        </Tab.Navigator>

    );
};

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
                    name={Routes.MAIN_BOTTOM_NAV} component={MainBottomNav} />
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

