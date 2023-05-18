import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Button } from "react-native";
import PostsScreen from "./app/screens/PostsScreen";
import PostsDetailScreen from "./app/screens/PostsDetailScreen";
import { PostProvider } from "./app/context/PostContext";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <PostProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="posts-screen"
              component={PostsScreen}
              options={{ title: "Posts" }}
            />
            <Stack.Screen
              name="posts-detail-screen"
              component={PostsDetailScreen}
              options={{ title: "Post Detail" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PostProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

