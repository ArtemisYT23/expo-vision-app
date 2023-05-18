import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import DimensionReducer from "./States/Dimension";
import UserSesionReducer from "./States/Sesion";

const rootReducer = combineReducers({
    dimensionState: DimensionReducer,
    sesion: UserSesionReducer,
});

export default function generateStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}