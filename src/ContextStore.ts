import React from 'react';
import { ActionType, Action, AppState, ContextType } from './types'

export const initState: AppState = {
  list: [], isLoading: false, errorMsg: 'Enter topic and search'
};

export function rootReducer(state: any, { type, playload }: Action) {
  switch (type) {
    case ActionType.FETCH_DATA_REQUEST:
      return Object.assign({}, state, {
        isLoading: true, errorMsg: ''
      })
    case ActionType.FETCH_DATA_SUCCESS:
      return !!playload ? Object.assign({}, state, { list: playload, isLoading: false, errorMsg: '' }
      ) : state;
    case ActionType.FETCH_DATA_FAILURE:
      return !!playload ? Object.assign({}, state, {
        list: [], isLoading: false, errorMsg: playload
      }) : state;
    default:
      return state;
  }
}

const ContextStore = React.createContext<ContextType>({} as ContextType);

export default ContextStore;
