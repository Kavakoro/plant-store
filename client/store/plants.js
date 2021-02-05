import axios from 'axios';
import { plants } from '../components/AllPlants';
console.log(plants, 'plants');
//Action Types //

const GET_PLANTS = 'GET_PLANTS';

//ACTION CREATORS //

const setPlants = (plants) => ({ type: GET_PLANTS, plants });
//THUNK CREATOR
export const fetchPlants = () => {
  return async (dispatch) => {
    //   const plants = (await axios.get('/api/plants')).data;
    dispatch(setPlants(plants));
  };
};

export const plantReducer = (state = [], action) => {
  if (action.type === GET_PLANTS) {
    return action.plants;
  }
  return state;
};
