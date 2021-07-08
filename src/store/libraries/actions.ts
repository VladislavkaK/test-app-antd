import { createAction } from '@reduxjs/toolkit';
import { GET_LIBRARIES_REQUESTED } from './constants';

export const getLibrariesAction = createAction(GET_LIBRARIES_REQUESTED);
