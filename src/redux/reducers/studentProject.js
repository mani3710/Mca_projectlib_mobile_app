import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';



export const getStudentProject = createAsyncThunk(
    'student/getStudentProject',
    async (studentid) => {

        const result = await API.get(`/student/get/project?studentid=${studentid}`)
        return { result: result.data };
    }
);

export const getStudentProjectReviewList = createAsyncThunk(
    'student/getStudentProjectReviewList',
    async (projectid) => {

        const result = await API.get(`/student/get/project/review?projectid=${projectid}`)
        return { result: result.data };
    }
);

export const getStudentProjectReviewMark = createAsyncThunk(
    'student/getStudentProjectReviewMark',
    async (data) => {

        const result = await API.get(`/student/get/project/review/mark?reviewid=${data.reviewid}&studentid=${data.studentid}`)
        //  const result = await API.get(`/student/get/project/review/mark?reviewid=e9510ef2-7786-4013-ba7b-e355d4c4bc30&studentid=9ec63154-c37c-11ec-9d64-0242ac120002`)
        console.log("getStudentProjectReviewMark", result.data)
        return { result: result.data };
    }
);


export const insertStudentProjectData = createAsyncThunk(
    'student/insertStudentProjectData',
    async (body) => {

        const result = await API.post(`/student/insert/project`, body)
        return { result: result.data };
    }
);


const studentSlice = createSlice({
    name: 'student',
    initialState: {
        studentLoader: false,
        studentProjectList: [],
        selectedProjectData: {},
        projectReviewList: [],
        reviewMark: {
            topicArray: [],
            markArray: []
        },
        selectedReview: {},
        projectUploadStatus: ""


    },
    reducers: {
        setSelectedProjectData: (state, action) => {
            state.selectedProjectData = action.payload;
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload;
        },
        emptyProjectUploadStatus: (state, action) => {
            state.projectUploadStatus = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStudentProject.pending, (state) => {
            state.studentLoader = true;
        });
        builder.addCase(getStudentProject.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.status == 200) {
                state.studentProjectList = action.payload.result.data;
            }
        });
        builder.addCase(getStudentProject.rejected, (state) => {
            state.studentLoader = false;
        });

        builder.addCase(getStudentProjectReviewList.pending, (state) => {
            state.studentLoader = true;
        });
        builder.addCase(getStudentProjectReviewList.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.status == 200) {
                state.projectReviewList = action.payload.result.data;
            }
        });
        builder.addCase(getStudentProjectReviewList.rejected, (state) => {
            state.studentLoader = false;
        });


        builder.addCase(getStudentProjectReviewMark.pending, (state) => {
            state.studentLoader = true;
        });
        builder.addCase(getStudentProjectReviewMark.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.status == 200) {
                state.reviewMark = action.payload.result.data;
            }
        });
        builder.addCase(getStudentProjectReviewMark.rejected, (state) => {
            state.studentLoader = false;
        });

        builder.addCase(insertStudentProjectData.pending, (state) => {
            state.studentLoader = true;
            state.projectUploadStatus = "";
        });
        builder.addCase(insertStudentProjectData.fulfilled, (state, action) => {
            state.studentLoader = false;
            if (action.payload.result.status == 200) {
                state.projectUploadStatus = "success";
            } else {
                state.projectUploadStatus = "failed";
            }
        });
        builder.addCase(insertStudentProjectData.rejected, (state) => {
            state.studentLoader = false;
            state.projectUploadStatus = "failed";
        });

    }
});
export const { setSelectedProjectData, setSelectedReview, emptyProjectUploadStatus } = studentSlice.actions;
export default studentSlice.reducer;