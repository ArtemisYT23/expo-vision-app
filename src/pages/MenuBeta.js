import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { useState } from "react";
import { PublicRoute } from "../routes/routes";
import { useNavigation } from '@react-navigation/native';


export default function MenuBeta() {
    const navigation = useNavigation();
    const [dataButton, setDataButton] = useState([
        {
            id: 1,
            name: "Scan Qr",
            path: `${PublicRoute.scanQr}`
        },
        {
            id: 2,
            name: "Managment",
            path: `${PublicRoute.login}`
        },
        {
            id: 3,
            name: "Stand Order",
            path: `${PublicRoute.standOrder}`
        }
    ]);


    const handleClick = (path) => {
        navigation.navigate(path);
    }

    return (
        <View style={styles.container}>
            {dataButton ? (
                dataButton.map((data, i) => (
                    <View key={i} style={styles.button}>
                        <TouchableOpacity>
                            <Text onPress={() => handleClick(data.path)} style={styles.textStyle}>
                                {data.name}
                            </Text>
                        </TouchableOpacity >
                    </View>
                ))
            ) : (
                <>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        margin: 15,
        backgroundColor: "#f7a224",
        width: "75%",
        height: "6%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 13,
    },
    textStyle: {
        color: "white",
        fontSize: 18,
    },
    input: {
        width: 240,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 9,
        borderRadius: 13
    },
})
