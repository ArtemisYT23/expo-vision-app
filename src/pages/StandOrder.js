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
    const [high, setHigh] = useState(0);
    const [large, setLarge] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const panResponders = {};


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

                    // Verificar límites del contenedor
                    const containerWidth = 390;
                    const containerHeight = 670;
                    const elementWidth = element.high; // Define el ancho del elemento
                    const elementHeight = element.large; // Define la altura del elemento

                    const minX = 0;
                    const minY = 0;
                    const maxX = containerWidth - elementWidth;
                    const maxY = containerHeight - elementHeight;

                    // Limitar la posición del elemento dentro del contenedor
                    const clampedX = Math.min(Math.max(newX, minX), maxX);
                    const clampedY = Math.min(Math.max(newY, minY), maxY);

                    // Verificar colisiones con otros elementos
                    const isColliding = prevElements.some(
                        otherElement =>
                            otherElement.id !== elementId &&
                            isCollidingWithElement(clampedX, clampedY, otherElement, elementWidth, elementHeight)
                    );

                    if (!isColliding) {
                        return {
                            ...element,
                            x: clampedX,
                            y: clampedY,
                        };
                    }
                }
                return element;
            });

            return updatedElements;
        });
    };

    const isCollidingWithElement = (x, y, element, Width, Height) => {
        const elementWidth = Width; // Ancho del elemento
        const elementHeight = Height; // Alto del elemento

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
        ) || (
                x === element.x &&
                y === elementBottom
            );
    };

    elements.forEach(element => {
        panResponders[element.id] = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) =>
                handlePanResponderMove(element.id, gestureState)

        });
    });

    const modalClick = (bool) => {
        setModalVisible(bool);
    }

    //validacion ancho
    const handleChangeHigh = (value) => {
        const numberValue = parseFloat(value);

        // Limitar el número máximo con el definido
        if (numberValue > ZoneSelected?.broad) {
            setHigh(0); // Establecer un valor máximo de la zona stand
            setErrorMessage("Valor excede el espacio designado")
        } else {
            setHigh(value);
            setErrorMessage(null);
        }
    }

    //validacion alto
    const handleChangeLarge = (value) => {
        const numberValue = parseFloat(value);

        // Limitar el número máximo con el definido
        if (numberValue > ZoneSelected?.height) {
            setLarge(1); // Establecer un valor máximo de la zona stand
            setErrorMessage("Valor excede el espacio designado")
        } else {
            setLarge(value);
            setErrorMessage(null);
        }
    }

    const handleSubmit = () => {

        const newX = Math.floor(Math.random() * ZoneSelected?.broad);
        const newY = Math.floor(Math.random() * ZoneSelected?.height);

        // Verificar límites del contenedor
        const containerWidth = 390;
        const containerHeight = 670;
        const elementWidth = parseInt(high); // Define el ancho del elemento
        const elementHeight = parseInt(large); // Define la altura del elemento

        const minX = 0;
        const minY = 0;
        const maxX = containerWidth - elementWidth;
        const maxY = containerHeight - elementHeight;

        // Limitar la posición del elemento dentro del contenedor
        const clampedX = Math.min(Math.max(newX, minX), maxX);
        const clampedY = Math.min(Math.max(newY, minY), maxY);

        // Verificar colisiones con otros elementos
        const isColliding = elements.some((otherElement) =>
            isCollidingWithElement(clampedX, clampedY, otherElement, elementWidth, elementHeight)
        );


        if (!isColliding) {
            const newObj = {
                id: uuid.v4(),
                name: nameStand,
                x: clampedX,
                y: clampedY,
                large: parseInt(large),
                high: parseInt(high),
            };
            setElements((prevObjects) => [...prevObjects, newObj]);
            setModalVisible(false);
            setNameStand(null);
            setLarge(0);
            setHigh(0);
            setErrorMessage(null);
        } else {
            // el nuevo elemento se superpone o colisiona con otros elementos existentes
            setErrorMessage("El Valor del elemento colisiona con otros existentes")
        }

    };

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
                                onChangeText={value => handleChangeHigh(value)}
                                value={high}
                                placeholder={`Ancho max(${ZoneSelected?.broad})`}
                                keyboardType="numeric"
                            />
                            {errorMessage != null && high == 0 ? (
                                <Text style={{ textAlign: 'center', fontSize: 12, color: 'red' }}>{errorMessage}</Text>
                            ) : <></>}
                        </SafeAreaView>

                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => handleChangeLarge(value)}
                                value={large}
                                placeholder={`Largo max(${ZoneSelected?.height})`}
                                keyboardType="numeric"
                            />
                            {errorMessage != null && large == 1 ? (
                                <Text style={{ textAlign: 'center', fontSize: 12, color: 'red' }}>{errorMessage}</Text>
                            ) : <></>}
                        </SafeAreaView>

                        {errorMessage != null ? (
                            <Text style={{ textAlign: 'center', fontSize: 12, color: 'red' }}>{errorMessage}</Text>
                        ) : <></>}

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
                                    width: element.high,
                                    height: element.large,
                                    borderColor: '#f68a20',
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
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
