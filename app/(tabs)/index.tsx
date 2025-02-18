import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Portals from './Portals'; // Ensure this is the correct path to your Portals component
import AttendanceScreen from './AttendanceScreen'; // Ensure this is the correct path to your AttendanceScreen component
import CustomDrawerContent from './CustomDrawerContent'; // Ensure this is the correct path to your CustomDrawerContent component
import CGPACalculator from "./CGPACalculator";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="CGPA Calculator" component={CGPACalculator} />
        <Drawer.Screen name="Attendance Tracker" component={AttendanceScreen} />
        <Drawer.Screen name="Portals" component={Portals} />
        
        
      </Drawer.Navigator>
  );
};

export default App;