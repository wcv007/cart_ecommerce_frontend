const cartReducer = (cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cart];
      const { product, quantity } = action.payload;
      const matchId = updatedCart.findIndex(
        (element) => element.product._id === product._id
      );
      if (matchId !== -1) {
        updatedCart[matchId].quantity += quantity;
      } else {
        updatedCart.push({ product, quantity });
      }
      return updatedCart;
    case "REVERT_CART":
      return action.payload.cart;
    case "REMOVE_CART":
      const oldCart = [...cart];
      const _id = action.payload;
      const removeCart = oldCart.filter(
        (element) => element.product._id !== _id
      );
      return removeCart;
    case "GET_CART":
      return action.payload.data;
    case "UPDATE_CART":
      const newCart = [...cart];
      const { quantity: quant, id } = action.payload;
      const match = cart.findIndex((element) => element.product._id === id);
      newCart[match].quantity = quant;
      return newCart;
  }
};
export default cartReducer;
