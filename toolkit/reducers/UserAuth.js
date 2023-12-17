import { createSlice } from "@reduxjs/toolkit";

const UserAuth = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
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
    page:null,
    image_uri:'',
    product_name:'',
    owner_name:'',
    amount:null,
    crypto_price:null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
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
      const { mobileno } = action.payload;
      state.mobileno = mobileno;
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
    page:(state,action)=>{
      state.page = action.payload.page;
    },
    cart:(state,action)=>{
      state.image_uri = action.payload.image_uri;
      state.product_name = action.payload.product_name;
      state.owner_name= action.payload.owner_name;
      state.amount = action.payload.amount;
      state.crypto_price = action.payload.crypto_price;
    }
  },
});

export const { login, logout, address, contact, counter, userimage,page,cart} = UserAuth.actions;
export default UserAuth.reducer;

