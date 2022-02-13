import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface provincesState {
  city: cityData[];
  states: stateData[];
  wards: wardsData[];
}

export interface cityData {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
}

export interface stateData {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}

export interface wardsData {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

const initialState: provincesState = {
  city: [],
  states: [],
  wards: [],
};

export const provincesSlice = createSlice({
  name: 'provinces',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataCity: (state, action: PayloadAction<cityData[]>) => {
      state.city = action.payload;
    },
    setDataState: (state, action: PayloadAction<stateData[]>) => {
      state.states = action.payload;
    },
    setDataWards: (state, action: PayloadAction<wardsData[]>) => {
      state.wards = action.payload;
    },
  },
});

export const {setDataCity, setDataState, setDataWards} = provincesSlice.actions;

export default provincesSlice.reducer;
