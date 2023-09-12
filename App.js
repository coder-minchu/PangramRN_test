import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./src/screens/Home/index"
import Login from "./src/screens/Login/index"
import ProductDetails from "./src/screens/ProductDetails/index"
import ShoppingCart from "./src/screens/ShoppingCart/index"

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{
          title: 'Login page',
          headerTitleAlign: 'center',
        }} component={Login} />
        <Stack.Screen name="Home" options={{
          header: () => null,
        }} component={Home} />
        <Stack.Screen name="ProductDetails"  options={{
          // title: 'Product Details',
          // headerTitleAlign: 'center',
          header: () => null,
        }}  component={ProductDetails} />
        <Stack.Screen name="ShoppingCart" options={{
          title: 'Shopping cart',
          headerTitleAlign: 'center',
        }} component={ShoppingCart} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
