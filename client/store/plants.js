import axios from 'axios';
const getToken = () => window.localStorage.getItem('token');

//Action Types //

const SET_PLANTS = 'SET_PLANTS';
const CREATE_PLANT = 'CREATE_PLANT';
const DESTROY_PLANT = 'DESTROY_PLANT';

//ACTION CREATORS //

const setPlants = (plants) => ({ type: SET_PLANTS, plants });
const _createPlant = (plant) => ({ type: CREATE_PLANT, plant });
const _destroyPlant = (id) => ({ type: DESTROY_PLANT, id });

//THUNK CREATOR
export const fetchPlants = () => {
  return async (dispatch) => {
    const plants = (await axios.get('/api/plants')).data;
    dispatch(setPlants(plants));
  };
};

//admin can create a plant in the database
export const createPlant = (
  name,
  description,
  size,
  light,
  difficulty,
  petFriendly,
  airCleaner,
  img,
  price,
  inventory,
  history
) => {
  return async (dispatch) => {
    const token = getToken();
    const plant = (
      await axios.post(
        `/admin/plants/`,
        {
          name,
          description,
          size,
          light,
          difficulty,
          petFriendly,
          airCleaner,
          img,
          price,
          inventory,
        },
        { headers: { authorization: token } }
      )
    ).data;
    dispatch(_createPlant(plant));
    history.push(`/admin/Plants`);
  };
};

// admin deletes a plant from database
export const destroyPlant = (id, history) => {
  const token = getToken();

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
  if (action.type === CREATE_PLANT) {
    return [...state, action.plant];
  }
  return state;
};
