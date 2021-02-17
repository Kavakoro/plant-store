import axios from 'axios';
const token = window.localStorage.getItem('token');

//Action Types //

const SET_PLANTS = 'SET_PLANTS';
const DESTROY_PLANT = 'DESTROY_PLANT';

//ACTION CREATORS //

const setPlants = (plants) => ({ type: SET_PLANTS, plants });
const _destroyPlant = (id) => ({ type: DESTROY_PLANT, id });

//THUNK CREATOR
export const fetchPlants = () => {
  return async (dispatch) => {
    const plants = (await axios.get('/api/plants')).data;
    dispatch(setPlants(plants));
  };
};

export const destroyPlant = (id, history) => {
  return async (dispatch) => {
    await axios.delete(`/admin/plants/${id}`, {
      headers: { authorization: token },
    });
    dispatch(_destroyPlant(id));
    history.push('/admin/Plants');
  };
};

export const plantReducer = (state = [], action) => {
  if (action.type === SET_PLANTS) {
    return action.plants;
  }
  if (action.type === DESTROY_PLANT) {
    return state.filter((plant) => plant.id !== action.id);
  }
  return state;
};
