import axios from "axios";

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(profile => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const getCurrentProfile = () => dispatch => {
  dispatch({
    type: "PROFILE_LOADING"
  });
  axios
    .get("/api/profile")
    .then(profile =>
      dispatch({
        type: "GET_PROFILE",
        payload: profile.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
