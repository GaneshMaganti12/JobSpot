import axios from "axios";
import {
  activityFailed,
  activityStarted,
  activitySuccess,
  addBioFailed,
  addBioStarted,
  addBioSuccess,
  clearFilters,
  clearJobData,
  clearJobsData,
  clearSearch,
  employmentValue,
  getBioFailed,
  getBioStarted,
  getBioSuccess,
  jobFailed,
  jobStarted,
  jobSuccess,
  jobsFailed,
  jobsStarted,
  jobsSuccess,
  nextPageJobs,
  salaryValue,
  search,
  totalPagesOfJobs,
} from "../Reducer/JobsReducer";
import {
  calculateActivityData,
  calculateJobData,
  calculateJobsData,
} from "../../Utils/Utils";

const apiUrl = "https://jobspot-bwnq.onrender.com";

export const dispatchJobs = (
  pageNum = 1,
  employment = "",
  salary = 0,
  search = "",
  token
) => {
  return async (dispatch) => {
    try {
      dispatch(jobsStarted());

      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${apiUrl}/jobs?employment_type=${employment}&minimum_package=${salary}&search=${search}&page=${pageNum}`,
        options
      );

      if (res.data.success) {
        dispatch(jobsSuccess(calculateJobsData(res.data.data)));
        dispatch(totalPagesOfJobs(res.data.total_pages));
      }
    } catch (error) {
      dispatch(jobsFailed());
    }
  };
};

export const dispatchNextPageJobs = (
  pageNum = 1,
  employment = "",
  salary = 0,
  search = "",
  token
) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        `${apiUrl}/jobs?employment_type=${employment}&minimum_package=${salary}&search=${search}&page=${pageNum}`,
        options
      );

      if (res.data.success) {
        dispatch(nextPageJobs(calculateJobsData(res.data.data)));
      }
    } catch (error) {
      dispatch(jobsFailed());
    }
  };
};

export const dispatchSearch = (value) => {
  return async (dispatch) => {
    dispatch(search(value));
  };
};

export const dispatchEmployment = (value) => {
  return async (dispatch) => {
    dispatch(employmentValue(value));
  };
};

export const dispatchSalary = (value) => {
  return async (dispatch) => {
    dispatch(salaryValue(value));
  };
};

export const dispatchAddBio = (token, data) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(addBioStarted());
      const res = await axios.post(`${apiUrl}/bio`, data, options);

      if (res.data.success) {
        dispatch(addBioSuccess(data.bio));
      }
    } catch (error) {
      dispatch(addBioFailed(error.response.data.message));
    }
  };
};

export const dispatchGetBio = (token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(getBioStarted());
      const res = await axios.get(`${apiUrl}/bio`, options);

      if (res.data.success) {
        const bioData = res.data.data;
        dispatch(getBioSuccess(bioData.bio));
      }
    } catch (error) {
      dispatch(getBioFailed(error.response.data.message));
    }
  };
};

export const dispatchClearSearch = () => {
  return async (dispatch) => {
    dispatch(clearSearch());
  };
};

export const dispatchJob = (id, token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(jobStarted());
      const res = await axios.get(`${apiUrl}/job/${id}`, options);

      if (res.data.success) {
        dispatch(jobSuccess(calculateJobData(res.data.data)));
      }
    } catch (error) {
      dispatch(jobFailed(error.response.data.message));
    }
  };
};

export const dispatchPostActivity = (data, token) => {
  return async (dispatch) => {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(`${apiUrl}/activity`, data, options);
  };
};

export const dispatchGetActivity = (token) => {
  return async (dispatch) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      dispatch(activityStarted());
      const res = await axios.get(`${apiUrl}/activity`, options);

      if (res.data.success) {
        dispatch(activitySuccess(calculateActivityData(res.data.data)));
      }
    } catch (error) {
      dispatch(activityFailed());
    }
  };
};

export const dispatchClearFilters = () => {
  return async (dispatch) => {
    dispatch(clearFilters());
  };
};

export const dispatchClearJobData = () => {
  return async (dispatch) => {
    dispatch(clearJobData());
  };
};

export const dispatchClearJobsData = () => {
  return async (dispatch) => {
    dispatch(clearJobsData());
  };
};
