import { createSlice } from "@reduxjs/toolkit";

const JobsReducer = createSlice({
  name: "jobs",
  initialState: {
    isLoading: false,
    isSuccess: false,
    searchValue: "",
    employmentType: "",
    salaryType: 0,
    bioData: {
      loading: false,
      bio: "",
      errorMsg: "",
      isSuccess: false,
      successMsg: "",
    },
    jobsList: [],
    totalPages: 0,
    jobDetailsObject: {},
    activity: [],
    isActivityLoading: false,
  },
  reducers: {
    jobsStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    jobsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        jobsList: action.payload,
      };
    },

    nextPageJobs: (state, action) => {
      return {
        ...state,
        jobsList: [...state.jobsList, ...action.payload],
      };
    },

    totalPagesOfJobs: (state, action) => {
      return {
        ...state,
        totalPages: action.payload,
      };
    },

    jobsFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        jobsData: [],
      };
    },

    search: (state, action) => {
      return {
        ...state,
        searchValue: action.payload,
      };
    },

    employmentValue: (state, action) => {
      return {
        ...state,
        employmentType: action.payload,
      };
    },

    salaryValue: (state, action) => {
      return {
        ...state,
        salaryType: action.payload,
      };
    },

    addBioStarted: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: true,
        },
      };
    },

    addBioSuccess: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: false,
          bio: action.payload,
          isSuccess: true,
        },
      };
    },

    addBioFailed: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: false,
          errorMsg: action.payload,
          successMsg: "",
          isSuccess: false,
        },
      };
    },

    getBioStarted: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: true,
        },
      };
    },

    getBioSuccess: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: false,
          isSuccess: true,
          bio: action.payload,
        },
      };
    },

    getBioFailed: (state, action) => {
      return {
        ...state,
        bioData: {
          ...state.bioData,
          loading: false,
          isSuccess: false,
          bio: "",
        },
      };
    },

    jobStarted: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    jobSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        jobDetailsObject: action.payload,
      };
    },

    jobFailed: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        jobDetailsObject: {},
      };
    },

    activityStarted: (state, action) => {
      return {
        ...state,
        isActivityLoading: true,
      };
    },

    activitySuccess: (state, action) => {
      return {
        ...state,
        isActivityLoading: false,
        isSuccess: true,
        activity: action.payload,
      };
    },

    activityFailed: (state, action) => {
      return {
        ...state,
        isActivityLoading: false,
        isSuccess: false,
        activity: [],
      };
    },

    clearSearch: (state, action) => {
      return {
        ...state,
        searchValue: "",
      };
    },

    clearFilters: (state, action) => {
      return {
        ...state,
        searchValue: "",
        employmentType: "",
        salaryType: 0,
      };
    },

    clearJobData: (state, action) => {
      return {
        ...state,
        jobDetailsObject: {},
      };
    },

    clearJobsData: (state, action) => {
      return {
        ...state,
        jobsList: [],
      };
    },
  },
});

export const {
  jobsStarted,
  jobsSuccess,
  nextPageJobs,
  totalPagesOfJobs,
  jobsFailed,
  search,
  employmentValue,
  salaryValue,
  addBioStarted,
  addBioSuccess,
  addBioFailed,
  getBioStarted,
  getBioSuccess,
  getBioFailed,
  jobStarted,
  jobSuccess,
  jobFailed,
  activityStarted,
  activitySuccess,
  activityFailed,
  clearSearch,
  clearFilters,
  clearJobData,
  clearJobsData,
} = JobsReducer.actions;

export default JobsReducer.reducer;
