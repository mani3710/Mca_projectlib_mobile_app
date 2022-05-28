import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../config/api';



export const projectListByStaff = createAsyncThunk(
    'project/projectListByStaff',
    async (staffid) => {
        console.log("body", staffid, `/staff/get/project?staffid=${staffid}`);
        const result = await API.get(`/staff/get/project?staffid=${staffid}`)
        console.log("projectListByStaff", result.data);

        return { result: result.data };
    }
);
export const getStudentDataListByStaffAndBatch = createAsyncThunk(
    'project/getStudentDataListByStaffAndBatch',
    async (data) => {
        console.log("body", data, `/staff/get/project/student?projectid=${data.projectid}&staffid=${data.staffid}`);
        const result = await API.get(`/staff/get/project/student?projectid=${data.projectid}&staffid=${data.staffid}`)
        console.log("projectListByStaff", result.data);

        return { result: result.data };
    }
);

export const getProjectReviewList = createAsyncThunk(
    'project/getProjectReviewList',
    async (projectid) => {
        console.log("body", projectid, `/staff/get/review?projectid=${projectid}`);
        const result = await API.get(`/staff/get/review?projectid=${projectid}`)
        console.log("getProjectReviewList", result.data);

        return { result: result.data };
    }
);

export const getReviewTopicList = createAsyncThunk(
    'project/getReviewTopicList',
    async (reviewid) => {
        console.log("body", reviewid, `/staff/get/review/topic?reviewid=${reviewid}`);
        const result = await API.get(`/staff/get/review/topic?reviewid=${reviewid}`)
        console.log("getReviewTopicList", result.data);

        return { result: result.data };
    }
);



const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectLoader: false,
        projectList: [],
        selectedProject: {},
        selectedBatchData: {
            uuid: "",
            title: "",
        },
        selectedBatchStudentList: [],
        reviewList: [],
        selectedStundent: {},
        selectedReview: {},
        topicList: []
    },
    reducers: {
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        setSelectedStundent: (state, action) => {
            state.selectedStundent = action.payload;
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload;
        },
        updateReviewMark: (state, action) => {
            state.topicList[action.payload.index].mark = action.payload.mark;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(projectListByStaff.pending, (state) => {
            state.projectLoader = true;

        });
        builder.addCase(projectListByStaff.fulfilled, (state, action) => {
            state.projectLoader = false;
            if (action.payload.result.status == 200) {
                state.projectList = action.payload.result.data;
            }
        });
        builder.addCase(projectListByStaff.rejected, (state) => {
            state.projectLoader = false;
        });

        builder.addCase(getStudentDataListByStaffAndBatch.pending, (state) => {
            state.projectLoader = true;
            state.selectedBatchStudentList = [];

        });
        builder.addCase(getStudentDataListByStaffAndBatch.fulfilled, (state, action) => {
            state.projectLoader = false;
            if (action.payload.result.status == 200) {
                state.selectedBatchData = action.payload.result.data.batchInfo;
                state.selectedBatchStudentList = action.payload.result.data.students;
            }
        });
        builder.addCase(getStudentDataListByStaffAndBatch.rejected, (state) => {
            state.projectLoader = false;
        });


        builder.addCase(getProjectReviewList.pending, (state) => {
            state.projectLoader = true;

        });
        builder.addCase(getProjectReviewList.fulfilled, (state, action) => {
            state.projectLoader = false;
            if (action.payload.result.status == 200) {
                state.reviewList = action.payload.result.data;
            }
        });
        builder.addCase(getProjectReviewList.rejected, (state) => {
            state.projectLoader = false;
        });


        builder.addCase(getReviewTopicList.pending, (state) => {
            state.projectLoader = true;

        });
        builder.addCase(getReviewTopicList.fulfilled, (state, action) => {
            state.projectLoader = false;
            if (action.payload.result.status == 200) {
                //  state.topicList = action.payload.result.data;
                let newArrayObj = []
                for (let obj of action.payload.result.data) {
                    newArrayObj.push({ ...obj, mark: "" });
                }
                state.topicList = newArrayObj;
            }
        });
        builder.addCase(getReviewTopicList.rejected, (state) => {
            state.projectLoader = false;
        });



    }
});
export const { setSelectedProject, setSelectedStundent, setSelectedReview, updateReviewMark } = projectSlice.actions;
export default projectSlice.reducer;