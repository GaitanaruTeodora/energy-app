import {
    CONFIGURATION_CREATE_FAIL,
    CONFIGURATION_CREATE_REQUEST,
    CONFIGURATION_CREATE_SUCCESS,
    CONFIGURATION_LIST_REQUEST,
    CONFIGURATION_LIST_FAIL,
    CONFIGURATION_LIST_SUCCESS,

    CONFIGURATION_DELETE_REQUEST,
    CONFIGURATION_DELETE_SUCCESS,
    CONFIGURATION_DELETE_FAIL,

    CONSUMATOR_CREATE_FAIL,
    CONSUMATOR_CREATE_REQUEST,
    CONSUMATOR_CREATE_SUCCESS,

    
    CONSUMATOR_LIST_FAIL,
    CONSUMATOR_LIST_REQUEST,
    CONSUMATOR_LIST_SUCCESS,
} from "../constants/configurationConstants";
import axios from "axios";


export const addConfiguration =
  (utilizatorId,denumire, furnizorEnergie, pretEnergie) =>
  async (dispatch) => {
    try {
      dispatch({type: CONFIGURATION_CREATE_REQUEST,});

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const x =  {
        utilizatorId:utilizatorId,
        denumire: denumire,
        furnizorEnergie: furnizorEnergie,
        pretEnergie: pretEnergie,
      }
      const { data } = await axios.post(`http://localhost:3000/api/utilizatori/${utilizatorId}/configuratie`,
        {
          denumire: denumire,
          furnizorEnergie: furnizorEnergie,
          pretEnergie: pretEnergie,
        },
        config
      );

      dispatch({
        type: CONFIGURATION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONFIGURATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listConfigurations = (utilizatorId) => async (dispatch) => {
  try {
    dispatch({
      type: CONFIGURATION_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/configuratii/${utilizatorId}`,

      config
    );
   
    

    dispatch({
      type: CONFIGURATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIGURATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};




export const listConfiguratie = (utilizatorId, configuratieId) => async (dispatch) => {
  try {
    dispatch({
      type: CONFIGURATION_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/configuratii/${utilizatorId}/${configuratieId}`,

      config
    );

    console.log(data)
   
    

    dispatch({
      type: CONFIGURATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONFIGURATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listConsumatori = (utilizatorId, configuratieId) => async (dispatch) => {
  try {
    dispatch({
      type: CONSUMATOR_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/consumatori/${utilizatorId}/${configuratieId}`,

      config
    );

    dispatch({
      type: CONSUMATOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONSUMATOR_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteConfiguration = (utilizatorId, configuratieId) => async (dispatch) => {
  try {
    dispatch({
      type: CONFIGURATION_DELETE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `http://localhost:3000/api/configuratii/${utilizatorId}/stergeConfiguratie/${configuratieId}`,

      config
    );

    
    dispatch({
      type: CONFIGURATION_DELETE_SUCCESS,
      payload: data,
    });
   

  } catch (error) {
    dispatch({
      type: CONFIGURATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
}

export const addConsumator =
  (configuratieId,camera,denumire,categorie,url,imagine,consum,pret,frecventaUtilizare,unitate ,pred) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CONSUMATOR_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
     
      const { data } = await axios.post(
        `http://localhost:3000/api/configuratii/addConsumator/${configuratieId}`,
        {
      
          camera: camera,
          denumire : denumire,
          categorie:categorie,
          url:url,
          imagine:imagine,
          consum:consum,
          pret:pret,
          frecventaUtilizare:frecventaUtilizare,
          predefinit:pred,
          unitateMasura:unitate

        },
        config
      );
      console.log(data)

      

      dispatch({
        type: CONSUMATOR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CONSUMATOR_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

