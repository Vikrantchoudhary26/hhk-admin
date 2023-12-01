import {applyMiddleware, createStore} from "redux";
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'persist-key',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);


export default store;
export {persistor}