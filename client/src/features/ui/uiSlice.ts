import { createSlice } from '@reduxjs/toolkit';

type UIState = {
  mobileSidebarOpen: boolean;
  createPostOpen: boolean;
};

const initialState: UIState = {
  mobileSidebarOpen: false,
  createPostOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',

  initialState,

  reducers: {
    openMobileSidebar(state) {
      state.mobileSidebarOpen = true;
    },

    closeMobileSidebar(state) {
      state.mobileSidebarOpen = false;
    },

    toggleMobileSidebar(state) {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },

    openCreatePost(state) {
      state.createPostOpen = true;
    },

    closeCreatePost(state) {
      state.createPostOpen = false;
    },
  },
});

export const {
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar,
  openCreatePost,
  closeCreatePost,
} = uiSlice.actions;

export default uiSlice.reducer;
