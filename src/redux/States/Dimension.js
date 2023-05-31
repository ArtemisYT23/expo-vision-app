const initialState = {
    ZoneStand: [
        {
            id: '20ecc747-711f-4e39-896e-e856337ae678',
            name: 'Zone',
            numeroFeria: 111,
            broad: 200,
            height: 200
        }
    ],
    ZoneSelected: null,
    Stand: [],
    errorMessage: null,
};

const SET_CHANGE_STAND = "SET_CHANGE_STAND";
const SET_NEW_ZONE_STAND = "SET_NEW_ZONE_STAND";
const FILTER_SELECTED_ZONE = "FILTER_SELECTED_ZONE";

export default function DimensionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHANGE_STAND:
        case SET_NEW_ZONE_STAND:
        case FILTER_SELECTED_ZONE:
            return action.payload;
        default:
            return state;
    }
}

//agregar nuevo tablero
export const setNewZoneStand = (zone) => async (dispatch, getState) => {
    const { dimensionState } = getState();
    const { ZoneStand } = dimensionState;
    dispatch({
        type: SET_NEW_ZONE_STAND,
        payload: { ...dimensionState, ZoneStand: [...ZoneStand, zone] }
    })
}

//actualizar stanes todos
export const setChangeStand = (stands) => async (dispatch, getState) => {
    const { dimensionState } = getState();
    dispatch({
        type: SET_CHANGE_STAND,
        payload: { ...dimensionState, Stand: stands }
    })
}

//Filtrar Zona de stand Seleccionado
export const filterZoneSelected = (index) => async (dispatch, getState) => {
    const { dimensionState } = getState();
    const { ZoneStand } = dimensionState;
    const filterZone = ZoneStand.find((item) => item.id == index);

    dispatch({
        type: FILTER_SELECTED_ZONE,
        payload: { ...dimensionState, ZoneSelected: filterZone }
    })
}