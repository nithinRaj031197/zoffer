import { createSlice } from "@reduxjs/toolkit";

interface IDashboardStateSlice {
  dashboardType: "merchant" | "user";
}

const initialState: IDashboardStateSlice = {
  dashboardType: "merchant",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardType: (state, action) => {
      state.dashboardType = action.payload;
    },
  },
});

export const { setDashboardType } = dashboardSlice.actions;
export default dashboardSlice.reducer;
