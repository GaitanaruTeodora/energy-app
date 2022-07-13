import {
    CONFIGURATION_CREATE_REQUEST,
    CONFIGURATION_CREATE_SUCCESS,
    CONFIGURATION_CREATE_FAIL,

    CONFIGURATION_DELETE_REQUEST,
    CONFIGURATION_DELETE_SUCCESS,
    CONFIGURATION_DELETE_FAIL,

    CONFIGURATION_LIST_REQUEST,
    CONFIGURATION_LIST_SUCCESS,
    CONFIGURATION_LIST_FAIL,

    CONSUMATOR_CREATE_REQUEST,
    CONSUMATOR_CREATE_SUCCESS,
    CONSUMATOR_CREATE_FAIL,


    CONSUMATOR_LIST_REQUEST,
    CONSUMATOR_LIST_SUCCESS,
    CONSUMATOR_LIST_FAIL,
    
  } from "../constants/configurationConstants";
  
  export const configurationCreateReducers = (state = {}, action) => {
    switch (action.type) {
      case CONFIGURATION_CREATE_REQUEST:
        return { loading: true };
      case CONFIGURATION_CREATE_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case CONFIGURATION_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const configurationDeleteReducers = (state = {}, action) => {
    switch (action.type) {
      case CONFIGURATION_DELETE_REQUEST:
        return { loading: true };
      case CONFIGURATION_DELETE_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case CONFIGURATION_DELETE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const consumatorCreateReducers = (state = {}, action) => {
    switch (action.type) {
      case CONSUMATOR_CREATE_REQUEST:
        return { loading: true };
      case CONSUMATOR_CREATE_SUCCESS:
        return { loading: false, consumatorInfo: action.payload };
      case CONSUMATOR_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const configurationListReducers = (state = {}, action) => {
    switch (action.type) {
      case CONFIGURATION_LIST_REQUEST:
        return { loading: true };
      case CONFIGURATION_LIST_SUCCESS:
        return { loading: false, allConfiguration: action.payload };
      case CONFIGURATION_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };


  export const consumatorListReducers = (state = {}, action) => {
    switch (action.type) {
      case CONSUMATOR_LIST_REQUEST:
        return { loadingL: true };
      case CONSUMATOR_LIST_SUCCESS:
        return { loadingL: false, allConsumators: action.payload };
      case CONSUMATOR_LIST_FAIL:
        return { loadingL: false, error: action.payload };
  
      default:
        return state;
    }
  };