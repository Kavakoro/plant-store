import axios from "axios";
// import { plants } from "../components/AllPlants";
// console.log(plants, "plants");
//Action Types //

const SET_PLANTS = "SET_PLANTS";

//ACTION CREATORS //

const setPlants = (plants) => ({ type: SET_PLANTS, plants });
//THUNK CREATOR
export const fetchPlants = () => {
  return async (dispatch) => {
    const plants = (await axios.get("/api/plants")).data;
    dispatch(setPlants(plants));
  };
};

export const plantReducer = (state = [], action) => {
  if (action.type === SET_PLANTS) {
    //   return {
    //     ...state,
    //     plants: action.plants,
    //   };
    return action.plants;
  }
  return state;
};
