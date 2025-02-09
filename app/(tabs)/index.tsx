import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Portals from './Portals'; // Ensure this is the correct path to your Portals component
import AttendanceScreen from './AttendanceScreen'; // Ensure this is the correct path to your AttendanceScreen component

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Portals" component={Portals} />
        <Drawer.Screen name="Attendance Tracker" component={AttendanceScreen} />
      </Drawer.Navigator>
  );
};

export default App;