import axios from "axios";
import { FETCH_USER } from "./types";

// fetch user action generator

export const fetchUser = () => {
  return (dispatch) => {
    axios
      .get("/api/current_user")
      .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const handleStripeToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
