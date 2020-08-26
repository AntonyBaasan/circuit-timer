import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabExcerciseParamList,
} from "../types";
import ExerciseListScreen from "../screens/ExerciseListScreen";
import ExerciseScreen from "../screens/ExerciseScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Exercises"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Exercises"
        component={TabExerciseNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabExerciseStack = createStackNavigator<TabExcerciseParamList>();

function TabExerciseNavigator() {
  return (
    <TabExerciseStack.Navigator>
      <TabExerciseStack.Screen
        name="ExerciseListScreen"
        component={ExerciseListScreen}
        options={{ headerTitle: "Exercise List" }}
      />
      <TabExerciseStack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{ headerTitle: "Exercise" }}
      />
    </TabExerciseStack.Navigator>
  );
}
