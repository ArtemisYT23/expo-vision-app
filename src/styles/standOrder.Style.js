import { StyleSheet } from "react-native";

export const styled = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: 1000,
        height: '100%'
    },
    containerStand: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderColor: '#f68a20',
        borderBottomWidth: 1,
    },
    containerDimension: {
        width: '100%',
        height: '100%'
    },
    draggableBox: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
    buttonAdd: {
        backgroundColor: '#f68a20',
        width: 60,
        height: 60,
        justifyContent: "center",
        margin: 20,
        borderRadius: 13
    },
    container: {
        width: 400,
        padding: 15,
      },
      tableHeader: {
        backgroundColor: '#DCDCDC',
      },
      buttonOpen: {
        backgroundColor: "#f68a20",
        padding: 10,
      }
});

export const modalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: 320,
        height: 430,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10,
    },
    buttonClose: {
        width: 200,
        height: 40,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        width: 240,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 9,
        borderRadius: 13
    },
});
