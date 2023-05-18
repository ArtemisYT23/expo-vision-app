import React, { useState, useEffect } from 'react';
import { View, PanResponder, Modal, Text, Pressable, SafeAreaView, Alert, TextInput } from 'react-native';
import { styled, modalStyle } from "../styles/standOrder.Style";
import { useSelector } from "react-redux";
import uuid from 'react-native-uuid';
import { setChangeStand } from "../redux/States/Dimension";
import { useDispatch } from 'react-redux';

export default function StandOrder() {
    const dispatch = useDispatch();
    const { dimensionState } = useSelector((store) => store);
    const { ZoneSelected, Stand } = dimensionState;
    const [modalVisible, setModalVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [elements, setElements] = useState([]);
    const [nameStand, setNameStand] = useState(null);
    const [large, setLarge] = useState(0);
    const [high, setHigh] = useState(0);

    useEffect(() => {
        if (nameStand != "" && large != 0 && high != 0) {
            setDisabled(false)
        } else {
            setDisabled(true);
        }
    }, [nameStand, large, high])

    useEffect(() => {
        dispatch(setChangeStand(elements));
    }, [elements]);

    const handlePanResponderMove = (elementId, gestureState) => {
        setElements(prevElements => {
            const updatedElements = prevElements.map(element => {
                if (element.id === elementId) {
                    const newX = element.x + gestureState.dx;
                    const newY = element.y + gestureState.dy;

                    // Verificar colisiones con otros elementos
                    const isColliding = prevElements.some(
                        otherElement => otherElement.id !== elementId && isCollidingWithElement(newX, newY, otherElement)
                    );

                    if (!isColliding) {
                        return {
                            ...element,
                            x: newX,
                            y: newY,
                        };
                    }
                }
                return element;
            });

            return updatedElements;
        });
    };

    const isCollidingWithElement = (x, y, element) => {
        const elementWidth = 100; // Ancho del elemento
        const elementHeight = 100; // Alto del elemento

        const elementRight = element.x + elementWidth;
        const elementBottom = element.y + elementHeight;

        const newElementRight = x + elementWidth;
        const newElementBottom = y + elementHeight;

        // Verificar colisión con el elemento
        return (
            x < elementRight &&
            newElementRight > element.x &&
            y < elementBottom &&
            newElementBottom > element.y
        );
    };

    const panResponders = {};

    elements.forEach(element => {
        panResponders[element.id] = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => handlePanResponderMove(element.id, gestureState),
        });
    });

    const modalClick = (bool) => {
        setModalVisible(bool);
    }

    const handleSubmit = () => {
        const obj = {
            id: uuid.v4(),
            name: nameStand,
            x: 0,
            y: 0,
        }
        elements.push(obj);
        setModalVisible(false);
        setNameStand(null);
        setLarge(0);
        setHigh(0);
    }

    return (
        <View style={styled.content}>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={modalStyle.centeredView}>
                    <View style={modalStyle.modalView}>
                        <Text style={modalStyle.modalText}>Agregar Stand en {ZoneSelected?.name}</Text>
                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setNameStand(value)}
                                value={nameStand}
                                placeholder="Nombre"
                                keyboardType="text"
                            />
                        </SafeAreaView>

                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setLarge(value)}
                                value={large}
                                placeholder="Largo M2"
                                keyboardType="numeric"
                            />
                        </SafeAreaView>

                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setHigh(value)}
                                value={high}
                                placeholder="Ancho M2"
                                keyboardType="numeric"
                            />
                        </SafeAreaView>

                        <Pressable
                            disabled={disabled}
                            style={[modalStyle.button, modalStyle.buttonClose, { backgroundColor: disabled ? '#f2b06f' : '#f68a20' }]}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={modalStyle.textStyle}>Crear Stand</Text>
                        </Pressable>

                        <Pressable
                            style={[modalStyle.button, modalStyle.buttonClose, { backgroundColor: 'white', borderColor: '#f68a20', borderWidth: 1 }]}
                            onPress={() => modalClick(false)}
                        >
                            <Text style={{ color: '#f68a20', textAlign: 'center' }}>Volver</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styled.containerStand}>
                <Pressable
                    style={styled.buttonAdd}
                    onPress={() => modalClick(true)}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 30 }}>+</Text>
                </Pressable>
            </View>
            <View style={styled.containerDimension}>

                <View style={styled.contenedor}>

                    <View style={{ flex: 1 }}>
                        {Stand?.map(element => (
                            <View
                                key={element.id}
                                style={{
                                    position: 'absolute',
                                    left: element.x,
                                    top: element.y,
                                    width: 100,
                                    height: 100,
                                    borderColor: '#f68a20',
                                    borderWidth: 1,
                                    borderRadius: 13,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                {...panResponders[element.id]?.panHandlers}
                            >
                                <Text>{element?.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};
