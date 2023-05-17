import { StyleSheet, Text, View, TouchableOpacity, Button  } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { PublicRoute } from "../routes/routes";



export default function SignUp() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.signUp}
        onPress={() => navigation.navigate(PublicRoute.standOrder)}
      >
        Login
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signUp: {
    fontSize: 22,
    backgroundColor: "black",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 20,
    color: "white"
  },
});
