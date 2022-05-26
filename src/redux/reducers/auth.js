import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { MEMBERSHIP_SERVICE } from '../../api';



// export const getDeliveryOptionList = createAsyncThunk(
//     'membership/getDeliveryOptionList',
//     async (cid) => {
//         const result = await MEMBERSHIP_SERVICE.getDeliveryOption(cid);
//         console.log("getMembershipList", result.data);

//         return { result: result.data.data };
//     }
// );



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authLoader: false,
        dummy: "mani"
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // builder.addCase(getDeliveryOptionList.pending, (state) => {
        //     state.membershipLoader = true;
        // });
        // builder.addCase(getDeliveryOptionList.fulfilled, (state, action) => {
        //     state.membershipLoader = false;
        //     state.membershipList = action.payload.result.deliveryType;
        //     state.customerMembership = action.payload.result.customerMembership;
        // });
        // builder.addCase(getDeliveryOptionList.rejected, (state) => {
        //     state.membershipLoader = false;
        // });




    }
});

export default authSlice.reducer;