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


export const studentSign = createAsyncThunk(
    'auth/studentSign',
    async (body) => {
        console.log("body", body);
        const result = await API.post("/student/sign", body)
        console.log("studentSign", result.data); studentSign
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
        staffSignInStatus: "",
        studentSignInStatus: "",
        studentData: {},
        isStudentSign: false

    },
    reducers: {
        logout: (state, action) => {
            state.isLoggedIn = false;
        },
        emptySignInResult: (state, action) => {
            state.staffSignInStatus = "";
        },
        emptyStudentSignInStatus: (state, action) => {
            state.studentSignInStatus = "";
        },
        setIsStudentSign: (state, action) => {
            state.isStudentSign = action.payload;
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

        builder.addCase(studentSign.pending, (state) => {
            state.authLoader = true;
            state.staffSignInStatus = "";
        });
        builder.addCase(studentSign.fulfilled, (state, action) => {
            state.authLoader = false;
            if (action.payload.result.message == "Successfully signin") {
                state.studentSignInStatus = "success";
                state.studentData = action.payload.result.data;
                state.isLoggedIn = true;
            } else {
                state.studentSignInStatus = "failed";
            }
        });
        builder.addCase(studentSign.rejected, (state) => {
            state.authLoader = false;
        });



    }
});
export const { logout, emptySignInResult, emptyStudentSignInStatus, setIsStudentSign } = authSlice.actions;
export default authSlice.reducer;