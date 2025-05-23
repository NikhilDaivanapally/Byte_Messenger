import { createSlice } from "@reduxjs/toolkit";
import { appSliceProps } from "../../types";

const initialState: appSliceProps = {
  onlineStatus: true,
  friends: [],
  friendRequests: [],
  users: [],
  activeChatId: null,
  chatType: null,
  isCameraOpen: false,
  mediaFiles: null,
  mediaPreviewUrls: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateOnlineStatus(state, action) {
      state.onlineStatus = action.payload.status;
    },
    updateFriends(state, action) {
      state.friends = action.payload;
    },
    selectConversation(state, action) {
      state.activeChatId = action.payload.chatId;
    },
    updateChatType(state, action) {
      state.chatType = action.payload;
    },
    updateOpenCamera(state, action) {
      state.isCameraOpen = action.payload;
    },
    updateMediaFiles(state, action) {
      const files = action.payload
        ? (Object.values(action.payload) as File[])
        : null;
      state.mediaFiles = files;
    },
    updateMediaPreviewUrls(state, action) {
      state.mediaPreviewUrls = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
  },
});
export const {
  updateOnlineStatus,
  updateFriends,
  updateOpenCamera,
  selectConversation,
  updateChatType,
  updateMediaFiles,
  updateMediaPreviewUrls,
  setUsers,
  setFriends,
  setFriendRequests,
} = slice.actions;

export default slice.reducer;
