import React, { useState, useContext } from "react";
import { LoginContext } from "./../contexts/login";
import { ItemCardContext } from "./../../src/contexts/main";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const CartContext = React.createContext();

const CartProvider = (props) => {
  const history = useHistory();
  const itemCardContext = useContext(ItemCardContext);
  const loginContext = useContext(LoginContext);
  const [productId, setProductId] = useState([]);
  const [showData, setShowData] = useState([]);
  const [userId, setUserId] = useState(loginContext.userIdLoggedIn);
  let arr = [];

  const state = {
    addToCart,
    showCart,
    showData,
  };
  async function addToCart() {
    arr.push(itemCardContext.prodId);
    try {
      await axios
        .post(
          "http://localhost:5000/cart",
          {
            product: itemCardContext.prodId,
            userId: loginContext.userIdLoggedIn,
          },
          {
            headers: {
              Authorization: `Bearer ${loginContext.token}`,
            },
          }
        )
        .then((result) => {})
        .catch((err) => {});
    } catch (error) {
      throw error;
    }
  }
  async function showCart() {
    history.push("/show/cart");
    try {
      await axios
        .get("http://localhost:5000/show/cart", {
          userId: loginContext.userIdLoggedIn,
        })
        .then((result) => {
          setShowData(result.data);
        })
        .catch((err) => {});
    } catch (error) {
      throw error;
    }
  }

  return (
    <CartContext.Provider value={state}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider; /** */
