import axios from 'axios';
import Vuex from 'vuex';
import { TernoboWire } from './entry';
import { fireSharedataLoaded, fireUserloaded } from './events';

export default function (options = { state: {}, actions: {}, mutations: {} }) {
    let storeOptions = {
        ...options,
        state: {
            ...options.state,
            user: {},
            ternoboWireApp: null,
            shared: {},
        },
        actions: {
            ...options.actions,
            loadUser(context) {
                axios.post("/ternobo-wire/get-user").then((response) => {
                    context.commit("setUser", response.data.user);
                    fireUserloaded(response.data.user);
                });
            },
            loadShared(context) {
                axios.post("/ternobo-wire/get-shared").then((response) => {
                    context.commit("updateShared", response.data.shared);
                    fireSharedataLoaded(response.data.shared);
                });
            }
        },
        mutations: {
            ...options.mutations,
            setUser(state, payload) {
                state.user = payload;
            },
            setupApp(state, payload) {
                state.ternoboWireApp = new TernoboWire(payload.app, payload.component, payload.data);
            },
            updateShared(state, payload) {
                state.shared = payload
            }
        }
    };
    return new Vuex.Store(storeOptions);
}