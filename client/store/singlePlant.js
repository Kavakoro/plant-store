import Axios from 'axios';

//constants
const SET_PLANT = 'SET_PLANT';
const UPDATE_PLANT = 'UPDATE_PLANT';

//action creators
const _setPlant = (plant) => ({ type: SET_PLANT, plant });

const _updatePlant = (plant) => ({ type: UPDATE_PLANT, plant });

//thunk middleware functions
export const setPlant = (id) => {
  return async (dispatch) => {
    const plant = (await Axios.get(`/api/plants/${id}`)).data;
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
  //console.log('from thunk', history);
  return async (dispatch) => {
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
    history.push('/plant');
  };
};

export function singlePlantReducer(state = [], action) {
  if (action.type === SET_PLANT) {
    return action.plant;
  }
  if (action.type === UPDATE_PLANT) {
    state = state.map((plant) => {
      return plant.id !== action.plant.id ? plant : action.plant;
    });
  }

  return state;
}
