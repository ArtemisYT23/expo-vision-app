const initialState = {
    emailUser: null,
    passwordUser: null,
    TockenUser: null,
};

export const GET_USER_VALIDATE_SESION = "GET_USER_VALIDATE_SESION";
export const EXIT_SESION_CLEAR_TOKEN = "EXIT_SESION_CLEAR_TOKEN";
export const GET_USEREMAIL_VALIDATE_SESION = "GET_USEREMAIL_VALIDATE_SESION";
export const GET_USERPASSWORD_VALIDATE_SESION = "GET_USERPASSWORD_VALIDATE_SESION";

export default function UserSesionReducer (state = initialState, action) {
    switch (action.type){
        case GET_USER_VALIDATE_SESION:
        case EXIT_SESION_CLEAR_TOKEN:
        case GET_USEREMAIL_VALIDATE_SESION:
        case GET_USERPASSWORD_VALIDATE_SESION:
            return action.payload;
        default:
            return state;
    }
}

//cambiar dato de usuario correo
export const getUserEmailSesion = (email) => async(dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: GET_USEREMAIL_VALIDATE_SESION,
        payload: { ...sesion, emailUser: email },
    })
}
//cambiar dato de usuario contraseña 
export const getUserPasswordSesion = (password) => async(dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: GET_USERPASSWORD_VALIDATE_SESION,
        payload: { ...sesion, passwordUser: password },
    })
}


//guardar token de usuario
export const getUserTockenSesion = (token) => async(dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: GET_USER_VALIDATE_SESION,
        payload: { ...sesion, TockenUser: token },
    })
}

//Eliminar token de usuario
export const clearSesionUserToken = () => async(dispatch, getState) => {
    const { sesion } = getState();
    dispatch({
        type: EXIT_SESION_CLEAR_TOKEN,
        payload: { ...sesion, TockenUser: null },
    })
}