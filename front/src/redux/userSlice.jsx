import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: "users",
    initialState: {
        users:[]
    },
    reducers:{
        getUser : (state, action)=>{
            state.users= action.payload.map(user=>{
                return {id: user._id, name: user.name, email: user.email, phone: user.phone}
            })
            
        },
        addUser :(state,action)=>{
            state.users.push(action.payload)
        },
        updateUser :(state,action)=>{
            const index= state.users.findIndex(x=>x.id===action.payload.id)
            state.users[index]={
                id:action.payload.id,
                name:action.payload.name,
                email:action.payload.email,
                phone:action.payload.phone
            }

        },
        deleteUser:(state,action)=>{
            const id=action.payload.id;
            state.users=state.users.filter(u=>u.id !==id)
        }
    }
})

export const{getUser, addUser,updateUser,deleteUser}=userSlice.actions;
export default userSlice.reducer;