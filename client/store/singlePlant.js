import Axios from "axios";

const SET_PLANT = "SET_PLANT";
export const _setPlant = (plant) => ({
  type: SET_PLANT,
  plant,
});

export const setPlant = (id) => {
  return async (dispatch) => {
    const plant = (await Axios.get(`/api/plants/${id}`)).data;
    dispatch(_setPlant(plant));
  };
};

export function singlePlantReducer(state = [], action) {
  if (action.type === SET_PLANT) {
    return action.plant;
  }
  return state;
}
