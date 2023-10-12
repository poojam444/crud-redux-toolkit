import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    users: [],
    isError: null,
    searchUser: []
}

// create action..........
export const createUser = createAsyncThunk(
    "createUser",
    async (data, { rejectWithValue }) => {
        console.log("data", data);
        const response = await fetch(
            "https://6523c77fea560a22a4e8d3c4.mockapi.io/crud",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        try {
            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// Read action.....

export const showUser = createAsyncThunk(
    "showUser",
    async (args, { rejectWithValue }) => {
        const response = await fetch(
            "https://6523c77fea560a22a4e8d3c4.mockapi.io/crud",
        );

        try {
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Delete action.....

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    const response = await fetch(`https://6523c77fea560a22a4e8d3c4.mockapi.io/crud/${id}`, {
        method: "DELETE"
    })
    try {
        const result = response.json()
        return result
    } catch (error) {
        rejectWithValue(error)
    }
})
// Update action

export const updateUser = createAsyncThunk('updateUser', async (data, { rejectWithValue }) => {
    console.log(data, "updatedData")
    const response = await fetch(`https://6523c77fea560a22a4e8d3c4.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const result = await response.json()
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
const userDetailSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            console.log(action.payload, "pooja")
            state.searchUser = action.payload
        }
    },
    extraReducers: {
        [createUser.pending]: (state) => {
            state.isLoading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users.push(action.payload);
        },
        [createUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload.message;
        },
        [showUser.pending]: (state) => {
            state.isLoading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [showUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
        [deleteUser.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload, "action")
            const { id } = action.payload
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id)
            }
            console.log("action1", action.payload)
        },
        [deleteUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = state.users.map((ele) => (
                ele.id === action.payload.id ? action.payload : ele
            ))
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload.message;
        },
    }
})

export default userDetailSlice.reducer;
export const { searchUser } = userDetailSlice.actions