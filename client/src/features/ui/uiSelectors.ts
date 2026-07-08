import type { RootState } from '@/store/store';

export const selectMobileSidebarOpen = (state: RootState) =>
  state.ui.mobileSidebarOpen;

export const selectCreatePostOpen = (state: RootState) =>
  state.ui.createPostOpen;
