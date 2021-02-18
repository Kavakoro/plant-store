import axios from "axios";
import e from "express";
const token = window.localStorage.getItem("token");

//Action Types //

const SET_PLANTS = "SET_PLANTS";
const CREATE_PLANT = "CREATE_PLANT";
const DESTROY_PLANT = "DESTROY_PLANT";

//ACTION CREATORS //
// const SET_COUNT = "SET_COUNT";

// const setPlants = ({ idx, plants }) => ({ type: SET_PLANTS, idx, plants });
// const setCount = (count) => ({ type: SET_COUNT, count });

// export const fetchPlants = (idx) => {
//   return async (dispatch, getState) => {
//     const plants = getState().plants.data[idx];
//     if (plants) {
//       dispatch(setPlants({ idx, plants }));
//     } else {
//       const { plants, count } = (
//         await axios.get(`/api/plants?idx=${idx}`)
//       ).data;
//       dispatch(setPlants({ idx, plants }));
//       dispatch(setCount(count));
//     }
//   };
// };

const setPlants = (plants) => ({ type: SET_PLANTS, plants });
const _createPlant = (plant) => ({ type: CREATE_PLANT, plant });
const _destroyPlant = (id) => ({ type: DESTROY_PLANT, id });

//THUNK CREATOR
export const fetchPlants = () => {
  return async (dispatch) => {
    const plants = (await axios.get("/api/plants")).data;
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
  return async (dispatch) => {
    await axios.delete(`/admin/plants/${id}`, {
      headers: { authorization: token },
    });
    dispatch(_destroyPlant(id));
    history.push("/admin/Plants");
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

// export const plantReducer = (state = { count: 0, data: {} }, action) => {
//   if (action.type === SET_PLANTS) {
//     state = { ...state, data: { ...state.data, [action.idx]: action.plants } };
//   }
//   if (action.type === DESTROY_PLANT) {
//     state = { ...state, data: state.filter((plant) => plant.id !== action.id) };
//   }
//   if (action.type === CREATE_PLANT) {
//     state = { ...state, data: action.plant };
//   }
//   return state;
// };
