import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';
// import ProductInfoScreen from '../screens/ProductInfoScreen';
// import AddAddressScreen from '../screens/AddAddressScreen';
// import AddressScreen from '../screens/AddressScreen';
// import ConfirmationScreen from '../screens/ConfirmationScreen';
// import OrderScreen from '../screens/OrderScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
