import { writable } from 'svelte/store';
import { AppState } from '../types/AppState';

export const appStateStore = writable(AppState.Login);
