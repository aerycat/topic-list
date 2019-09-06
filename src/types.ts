import React from 'react'

export interface RepositoryItem {
  id: string;
  name: string;
  full_name: string;
  avatar_url: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

export enum SortType {
  DEFAULT = 'default',
  STARS = 'stars',
  FORKS = 'forks',
  UPDATED = 'updated'
}

export enum ActionType {
  FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST',
  FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE',
  FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
};

export interface AppState {
  list: RepositoryItem[],
  isLoading: boolean,
  errorMsg: string
}

export interface Action {
  type: ActionType,
  playload?: any
}

export type ContextType = {
  appState: AppState
  dispatch: React.Dispatch<Action>
}