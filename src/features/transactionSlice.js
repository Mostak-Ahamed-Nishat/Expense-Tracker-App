import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransaction
} from './transactionApi'

//Initial State
const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    editing: {},
}

//Async Thunk for requesting api

//Get the transaction
export const fetchTransaction = createAsyncThunk('transactions/fetchTransaction', async () => {
    const transaction = await getTransaction('')
    return transaction
})

//Create the transaction
export const createTransaction = createAsyncThunk('transactions/createTransaction', async (data) => {
    const transaction = await addTransaction(data)
    return transaction
})

//edit the transaction
export const changeTransaction = createAsyncThunk('transactions/changeTransaction', async ({
    id,
    data
}) => {
    const transaction = await editTransaction({
        id,
        data
    })
    return transaction
})

//edit the transaction
export const removeTransaction = createAsyncThunk('transactions/removeTransaction', async (id) => {
    const transaction = await deleteTransaction(id)
    return transaction
})




const transactionReducer = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload
        },
        editInactive: (state) => {
            state.editing = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(fetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.transactions = action.payload
            }).addCase(fetchTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true;
                state.transactions = []
                state.error = action.error.message
            }).addCase(createTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                state.transactions.push(action.payload)
            }).addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(changeTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false;
                //Find the transaction id that we are want to update
                const indexToUpdate = state.transactions.findIndex(transaction => transaction.id === action.payload.id);
                state.transactions[indexToUpdate] = (action.payload)
            }).addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            }).addCase(removeTransaction.fulfilled, (state,action) => {
                console.log(action);
                state.isLoading = false
                state.isError = false;
                state.transactions=state.transactions.filter(transaction => transaction.id !== action.meta.arg)
            }).addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
    }
})

export default transactionReducer.reducer
export const {
    editActive,
    editInactive
} = transactionReducer.actions