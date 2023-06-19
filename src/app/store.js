import {
    configureStore
} from '@reduxjs/toolkit'

import transactionReducer from '../features/transactionSlice'

const store = configureStore({
    reducer: {
        transaction: transactionReducer
    }
})

export default store