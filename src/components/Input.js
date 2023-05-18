import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { getUserEmailSesion, getUserPasswordSesion } from "../redux/States/Sesion";


export default function Input() {
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView style={styles.inputGroup}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => dispatch(getUserEmailSesion(text))}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => dispatch(getUserPasswordSesion(text))}
          secureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    // backgroundColor: "tomato",
    width: "80%",
    padding: 5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#f07807',
    marginBottom: 5,
    fontSize: 18,
    borderRadius: 20,
  },
});
