// store/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latLng: { lat: null, lng: null },
  address: '',
  inputValue: '',
  state: '',
  country: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLatLng: (state, action) => {
      state.latLng = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setLatLng, setAddress, setInputValue, setState, setCountry } = registerSlice.actions;
export default registerSlice.reducer;
