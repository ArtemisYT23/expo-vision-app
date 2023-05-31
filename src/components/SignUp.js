import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { PublicRoute } from "../routes/routes";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { Security } from "../config/axios";
import { getUserTockenSesion } from "../redux/States/Sesion";
import { useDispatch, useSelector } from "react-redux";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function SignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { sesion } = useSelector((store) => store);
  const { emailUser, passwordUser } = sesion;

  const scheduleNotificationEmpty = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Faltan Campos',
        body: 'Revise que los campos esten llenos',
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Error al Iniciar Sesion',
        body: 'Revise los credenciales de acceso',
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  const handleSubmit = () => {
    if (emailUser != null && passwordUser != null) {
      navigation.navigate(PublicRoute.menuOptions);
      //   const sesionStart = {
      //     userName: emailUser,
      //     password: passwordUser,
      //   };
      //   axios({
      //     url: `${Security}user/login`,
      //     method: "POST",
      //     data: sesionStart,
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   })
      //     .then(function (response) {
      //       console.log(response);
      //       if (response.status == 200) {
      //         dispatch(getUserTockenSesion(response.data.token));
      //         navigation.navigate(PublicRoute.menuOptions);
      //       }
      //     })
      //     .catch(function (error) {
      //       scheduleNotification()
      //     });
      // } else {
      //   scheduleNotificationEmpty()
      // }
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.signUp}
        onPress={handleSubmit}
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
