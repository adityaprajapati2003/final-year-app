import { createSlice } from "@reduxjs/toolkit";

const UserAuth = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
    password: "",
    street_address:"",
    apartment:"",
    State:"",
    city:"",
    zipcode:"",
    mobileno:"",
    email:"",
    orders:"",
    thrifts:"",
    owned:"",
    image:"",
    page:"",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.password = "";
    },
    address: (state, action) => {
      const { street_address, apartment, State, city, zipcode } = action.payload;
      state.street_address = street_address;
      state.apartment = apartment;
      state.State = State;
      state.city = city;
      state.zipcode = zipcode;
    },
    contact: (state, action) => {
      const { mobileno, email } = action.payload;
      state.mobileno = mobileno;
      state.email = email;
    },
    counter: (state, action) => {
      const {orders, thrifts, owned } = action.payload;
      state.orders = orders;
      state.thrifts = thrifts;
      state.owned = owned;
    },
    userimage:(state,action)=>{
      state.image=action.payload.image;
    },
    setPage:(state,action)=>{
      state.page=action.payload.page;
    }
  },
});
export const { login, logout, address, contact, counter, userimage, setPage} = UserAuth.actions;
export default UserAuth.reducer;
