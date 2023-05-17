import { StyleSheet, View } from "react-native";
import Input from "../components/Input";
import Logo from "../components/Logo";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";

export default function Login() {
  return (
    <View>
      <Logo />
      <Welcome />
      <Input />
      <SignUp />
    </View>
  );
}

