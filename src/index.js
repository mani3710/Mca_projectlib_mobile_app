import React from 'react';
import NavigationRoot from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { StateProvider } from './contexts';
import { StoreProvider } from './redux';
import Splash from './screen/splash'
const Root = () => {
    return (
        <StoreProvider>
            <NavigationRoot />
        </StoreProvider>


    );
}
export default Root;
