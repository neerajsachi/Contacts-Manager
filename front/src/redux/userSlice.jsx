import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        token: null,
        loggedInUser: null
    },
    reducers: {
        getUser: (state, action) => {
            state.users = action.payload.map(user => ({
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                address: user.address,
                company: user.company,
                phone: user.phone
            }));
        },
        addUser: (state, action) => {
            const user = {
                id: action.payload._id,
                fname: action.payload.fname,
                lname: action.payload.lname,
                address: action.payload.address,
                company: action.payload.company,
                phone: action.payload.phone
            };
            state.users.push(user);
        },
        updateUser: (state, action) => {
            const { id, fname, lname, address, company, phone } = action.payload;
            const index = state.users.findIndex(user => user.id === id);
            if (index !== -1) {
                state.users[index] = {
                    ...state.users[index],
                    fname,
                    lname,
                    address,
                    company,
                    phone
                };
            }
        },
        deleteUser: (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter(u => u.id !== id);
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = null;
        },
        setLoggedInUser: (state, action) => { 
            state.loggedInUser = action.payload;
        },
        clearLoggedInUser: (state) => { 
            state.loggedInUser = null;
        }
    }
});

export const { getUser, addUser, updateUser, deleteUser, setToken, clearToken, setLoggedInUser, clearLoggedInUser} = userSlice.actions;
export default userSlice.reducer;
