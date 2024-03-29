import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: USER_LOGIN_REQUEST,});
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(`http://localhost:3000/api/login/${email}/${password}`,config);
   if(data.response !== undefined)
   {
    dispatch({type: USER_LOGIN_FAIL,payload: data});
   } else {
    dispatch({type: USER_LOGIN_SUCCESS,payload: data});
   }
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
   
    dispatch({type: USER_LOGIN_FAIL,payload:
      error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const register = (nume, prenume, email, parola) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(`http://localhost:3000/api/addUtilizator`,{ nume, prenume, email, parola },config)
    dispatch({
      type: USER_REGISTER_SUCCESS,payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });

  dispatch({ type: USER_LIST_RESET });
};
