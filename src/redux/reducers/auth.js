import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';



export const staffSign = createAsyncThunk(
    'auth/staffSign',
    async (body) => {
        console.log("body", body);
        const result = await API.post("/staff/sign", body)
        console.log("staffSign", result.data);

        return { result: result.data };
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoader: false,
        dummy: "mani",
        isLoggedIn: false,
        staffData: {},
        staffSignInStatus: ""

    },
    reducers: {
        logout: (state, action) => {
            state.isLoggedIn = false;
        },
        emptySignInResult: (state, action) => {
            state.staffSignInStatus = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(staffSign.pending, (state) => {
            state.authLoader = true;
            state.staffSignInStatus = "";
        });
        builder.addCase(staffSign.fulfilled, (state, action) => {
            state.authLoader = false;
            if (action.payload.result.message == "Successfully signin") {
                state.staffSignInStatus = "success";
                state.staffData = action.payload.result.data;
                state.isLoggedIn = true;
            } else {
                state.staffSignInStatus = "failed";
            }
        });
        builder.addCase(staffSign.rejected, (state) => {
            state.authLoader = false;
        });




    }
});
export const { logout, emptySignInResult } = authSlice.actions;
export default authSlice.reducer;