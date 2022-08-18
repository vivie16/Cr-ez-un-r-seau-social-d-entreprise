import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  return (dispatch) => {
    return axios.request
    ({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user`,
      withCredentials : true,
    })
      .then((res) => {
        dispatch({ 
          type: GET_USERS,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
};