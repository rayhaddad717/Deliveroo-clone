import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  restaurantId: "",
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
        if (state.restaurantId && (state.restaurantId == action.payload.restaurantId))
          state.items = [...state.items, action.payload.item];
        else{
          state.items = [action.payload.item];
          state.restaurantId=action.payload.restaurantId;
        }
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id:${action.payload.id}) as it's not in your basket`
        );
      }
      state.items = [...newBasket];
    },
    clearBasket: (state, payload) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
export const selectBasketTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => (total += parseFloat(item.price)),
    0
  );
export default basketSlice.reducer;
