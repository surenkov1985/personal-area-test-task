import {configureStore} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { apiData } from "./apiData"
import loginReducer from "./loginReducer"

export  const store = configureStore({
    reducer: {
        login: loginReducer,
        [apiData.reducerPath]: apiData.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiData.middleware), 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

