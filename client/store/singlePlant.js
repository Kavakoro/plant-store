import axios from 'axios';

//constants
const SET_PLANT = 'SET_PLANT';
const UPDATE_PLANT = 'UPDATE_PLANT';
const CREATE_PLANT = 'CREATE_PLANT';

//action creators
const _setPlant = (plant) => ({ type: SET_PLANT, plant });
const _updatePlant = (plant) => ({ type: UPDATE_PLANT, plant });
const _createPlant = (plant) => ({ type: CREATE_PLANT, plant });

//thunk middleware functions
export const setPlant = (id) => {
  return async (dispatch) => {
    const plant = (await axios.get(`/api/plants/${id}`)).data;
    dispatch(_setPlant(plant));
  };
};

export const updatePlant = (
  id,
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
    const token = window.localStorage.getItem('token');
    const plant = (
      await axios.put(
        `/admin/plants/${id}`,
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
        {
          headers: {
            authorization: token,
          },
        }
      )
    ).data;
    dispatch(_updatePlant(plant));
    history.push(`/admin/Plants`);
  };
};

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
    const plant = (
      await axios.post(`/api/plants/`, {
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
      })
    ).data;
    dispatch(_createPlant(plant));
    history.push(`/admin/Plants`);
  };
};

export function singlePlantReducer(state = {}, action) {
  if (action.type === SET_PLANT) {
    return action.plant;
  }
  if (action.type === UPDATE_PLANT) {
    return action.plant;
  }
  if (action.type === CREATE_PLANT) {
    return action.plant;
  }

  return state;
}
