import { View, Pressable, Text, Modal, SafeAreaView, TextInput, Alert } from "react-native"
import { styled, modalStyle } from "../styles/standOrder.Style"
import { useDispatch, useSelector } from "react-redux";
import { setNewZoneStand, filterZoneSelected } from "../redux/States/Dimension";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { DataTable } from 'react-native-paper';
import { PublicRoute } from "../routes/routes";

export default function StandList() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { dimensionState } = useSelector((store) => store);
    const { ZoneStand, ZoneSelected } = dimensionState;
    const [modalVisible, setModalVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [nameZone, setNameZone] = useState(null);
    const [broad, setBroad] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (nameZone != null && broad != 0 && height != 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [nameZone, broad, height]);

    const modalClick = () => {
        setModalVisible(!modalVisible);
        setDisabled(true);

        const obj = {
            id: uuid.v4(),
            numeroFeria: 1111,
            name: nameZone,
            broad: broad,
            height: height
        }
        dispatch(setNewZoneStand(obj));
    }

    const handleModalOpen = () => {
        setModalVisible(true);
        setDisabled(true);
        setNameZone(null);
        setBroad(0);
        setHeight(0);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
        setDisabled(true);
        setNameZone(null);
        setBroad(0);
        setHeight(0);
    }

    const handleOpen = (index, path) => {
        dispatch(filterZoneSelected(index));
        navigation.navigate(path);
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
                        <Text style={modalStyle.modalText}>Medidas</Text>
                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setNameZone(value)}
                                value={nameZone}
                                placeholder="Nombre"
                                keyboardType="text"
                            />
                        </SafeAreaView>
                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setBroad(value)}
                                value={broad}
                                placeholder="Ancho M2"
                                keyboardType="numeric"
                            />
                        </SafeAreaView>

                        <SafeAreaView>
                            <TextInput
                                style={modalStyle.input}
                                onChangeText={value => setHeight(value)}
                                value={height}
                                placeholder="Altura M2"
                                keyboardType="numeric"
                            />
                        </SafeAreaView>

                        <Pressable
                            disabled={disabled}
                            style={[modalStyle.button, modalStyle.buttonClose, { backgroundColor: disabled ? '#f2b06f' : '#f68a20' }]}
                            onPress={() => modalClick()}
                        >
                            <Text style={modalStyle.textStyle}>Crear Tablero</Text>
                        </Pressable>

                        <Pressable
                            style={[modalStyle.button, modalStyle.buttonClose, { backgroundColor: 'white', borderColor: '#f68a20', borderWidth: 1 }]}
                            onPress={() => handleCloseModal()}
                        >
                            <Text style={{ color: '#f68a20', textAlign: 'center' }}>Volver</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <View style={styled.containerStand}>
                <Pressable
                    style={styled.buttonAdd}
                    onPress={() => handleModalOpen()}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 30 }}>+</Text>
                </Pressable>
            </View>
            <View style={styled.containerDimension}>
                <DataTable style={styled.container}>
                    <DataTable.Header style={styled.tableHeader}>

                        <DataTable.Title>N Feria</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Broad Food</DataTable.Title>
                        <DataTable.Title>Height</DataTable.Title>
                        <DataTable.Title>Order</DataTable.Title>
                    </DataTable.Header>
                    {ZoneStand ? (
                        ZoneStand.map((item, i) => (
                            <DataTable.Row>

                                <DataTable.Cell>{item.numeroFeria}</DataTable.Cell>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.broad}</DataTable.Cell>
                                <DataTable.Cell>{item.height}</DataTable.Cell>
                                <DataTable.Cell>
                                    <Pressable style={styled.buttonOpen} onPress={() => handleOpen(item.id, PublicRoute.standItem)}>
                                        <Text style={modalStyle.textStyle}>Abrir</Text>
                                    </Pressable>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    ) : (
                        <></>
                    )}
                </DataTable>

            </View>
        </View>
    )
}