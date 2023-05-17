import React, { useState } from 'react';
import { View, PanResponder, Animated, StyleSheet, LayoutAnimation } from 'react-native';


export default function StandOrder() {
    const containerWidth = 200;
    const containerHeight = 200;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const pan = useState(new Animated.ValueXY())[0];

    const panResponder = PanResponder.create({
        // onStartShouldSetPanResponder: () => true,
        // onPanResponderMove: Animated.event(
        //     [
        //         null,
        //         { dx: pan.x, dy: pan.y },
        //     ],
        //     { useNativeDriver: false }
        // ),
        // onPanResponderRelease: (e, gesture) => {
        //     const newPosition = {
        //         x: position.x + gesture.dx,
        //         y: position.y + gesture.dy,
        //     };
        //     setPosition(newPosition);
        //     pan.setValue({ x: position.x , y: position.y });
        // },
        // onStartShouldSetPanResponder: () => true,
        // onPanResponderMove: (e, gesture) => {
        //     let newX = position.x + gesture.dx;
        //     let newY = position.y + gesture.dy;

        //     // Limitar la posición dentro del contenedor
        //     if (newX < 0) {
        //         newX = 0;
        //     } else if (newX > containerWidth) {
        //         newX = containerWidth;
        //     }
        //     if (newY < 0) {
        //         newY = 0;
        //     } else if (newY > containerHeight) {
        //         newY = containerHeight;
        //     }

        //     setPosition({ x: newX, y: newY });
        //     pan.setValue({ x: newX, y: newY });
        // },
        // onPanResponderRelease: () => {
        //     // Restablecer el valor de pan a (0, 0) después de soltar
        //     Animated.spring(pan, {
        //         toValue: { x: 0, y: 0 },
        //         useNativeDriver: false,
        //     }).start();
        // },
    });

    const animatedStyle = {
        transform: pan.getTranslateTransform(),
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.draggableBox, animatedStyle]}
                {...panResponder.panHandlers}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    draggableBox: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
});