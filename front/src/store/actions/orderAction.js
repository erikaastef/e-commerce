import axios from "axios";
import {
  ADD_ITEM,
  ADD_ADDRESS,
  REMOVE_ITEM,
  CONFIRM_ORDER,
  BUY,
  FETCH_ORDER,
  CLICK_NEW_ADDRESS,
  ADDRESS,
  DROP_ORDER,
  FETCH_ORDER
} from "../constants";

import axios from "axios";

export const removeProduct = (id, userId) => dispatch => {
  return {
    payload: axios
      .get(`/api/remove/${id}/${userId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(completeOrder(order));
      })
      .catch(err => {
        console.log(err, "error");
      })
  };
};

export const buyProduct = user => {
  return {
    type: BUY,
    payload: axios.post("/api/send", user).then(res => {
      res.data;
      console.log("ESTA ES LA RES.DATA DE LA ACTION BUYPRODUCT", res.data);
    })
  };
};

export const dropOrder = () => {
  return {
    type: DROP_ORDER
  };
};
// lo crea en la db
export const addItem = (itemId, userId) => {
  axios
    .post("/api/addItem", { itemId: itemId, userId: userId })
    .then(res => console.log("se añadio el producto al carrito"));
};

//lo busca en la db
const completeOrder = order => {
  return {
    type: FETCH_ORDER,
    payload: order
  };
};

export const fetchOrder = userId => dispatch => {
  console.log(userId, "este es el id de fetchorder");
  return {
    payload: axios
      .get(`/api/order/${userId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(completeOrder(order));
      })
      .catch(err => {
        console.log(err, "hola, necesito un abrazo");
      })
  };
};

export const clickNewAddress = () => {
  return {
    type: CLICK_NEW_ADDRESS
  };
};

export const fetchAddress = address => {
  console.log(
    "ENTRPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"
  );
  return {
    type: ADDRESS,
    payload: address
  };
};
