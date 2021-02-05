import Axios from "axios";

export const _createStudent = (student) => ({
  type: "CREATE_STUDENT",
  student,
});

export const createStudent = (firstName, lastName, email, history) => {
  return async (dispatch) => {
    const student = (
      await Axios.post("/api/students", { firstName, lastName, email })
    ).data;
    dispatch(_createStudent(student));
    history.push(`/students/${student.id}`);
  };
};

export default function singleStudentReducer(state = [], action) {
  if (action.type === "CREATE_STUDENT") {
    state = [...state, action.student];
  }
  return state;
}
