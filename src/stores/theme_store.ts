import { writable } from 'svelte/store';
import type { Theme } from '../types/Theme';

export const themeStore = writable<Theme>('system');
