import axios from 'axios';

//constants
const SET_PLANT = 'SET_PLANT';
const UPDATE_PLANT = 'UPDATE_PLANT';

//action creators
const _setPlant = (plant) => ({ type: SET_PLANT, plant });

const _updatePlant = (plant) => ({ type: UPDATE_PLANT, plant });

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
  sizeFilter,
  light,
  lightFilter,
  difficulty,
  difficultyFilter,
  petFriendly,
  petFilter,
  airCleaner,
  img,
  price,
  inventory,
  history
) => {
  console.log('from thunk', history);
  return async (dispatch) => {
    //ive also messed with this and tried with/without /update at the end
    const plant = (
      await axios.put(`/api/plants/${id}`, {
        name,
        description,
        size,
        sizeFilter,
        light,
        lightFilter,
        difficulty,
        difficultyFilter,
        petFriendly,
        petFilter,
        airCleaner,
        img,
        price,
        inventory,
      })
    ).data;
    dispatch(_updatePlant(plant));
    //here too with just /plants or /plants/${id}
    history.push(`/admin`);
  };
};

export function singlePlantReducer(state = {}, action) {
  if (action.type === SET_PLANT) {
    return action.plant;
  }
  if (action.type === UPDATE_PLANT) {
    return action.plant;
  }

  return state;
}
