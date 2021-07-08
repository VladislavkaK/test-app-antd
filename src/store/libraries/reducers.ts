import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { GET_LIBRARIES_REQUESTED, GET_LIBRARIES_SUCCEEDED, GET_LIBRARIES_FAILED } from './constants';
import { Library } from './types';

interface LibraryState {
  loading: boolean;
  data: Library[];
  error: any;
}

const intitialLibraryState: LibraryState = {
  loading: false,
  data: [],
  error: null,
};

interface LibrarySucceeded {
  libraries: Library[];
}

interface LibraryFailed {
  error: any;
}

export const libraryReducer = createReducer(intitialLibraryState, {
  [GET_LIBRARIES_REQUESTED]: (state: LibraryState) => {
    return {
      ...state,
      loading: true,
    };
  },
  [GET_LIBRARIES_SUCCEEDED]: (state: LibraryState, action: PayloadAction<LibrarySucceeded>) => {
    return {
      ...state,
      data: action.payload.libraries,
      loading: false,
    };
  },
  [GET_LIBRARIES_FAILED]: (state: LibraryState, action: PayloadAction<LibraryFailed>) => {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  },
});
