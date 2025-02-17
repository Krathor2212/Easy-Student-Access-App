import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Portals from './Portals'; // Ensure this is the correct path to your Portals component
import AttendanceScreen from './AttendanceScreen'; // Ensure this is the correct path to your AttendanceScreen component
import CustomDrawerContent from './WipeData'; // Ensure this is the correct path to your CustomDrawerContent component
import WipeData from "./WipeData";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <Drawer.Navigator drawerContent={(props) => <WipeData {...props} />}>
        <Drawer.Screen name="Portals" component={Portals} />
        <Drawer.Screen name="Attendance Tracker" component={AttendanceScreen} />
      </Drawer.Navigator>
  );
};

export default App;