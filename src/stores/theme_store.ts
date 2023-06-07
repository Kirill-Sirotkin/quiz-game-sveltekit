import { writable } from 'svelte/store';
import type { Theme } from '../types/Theme';
import { browser } from '$app/environment';

export const themeStore = writable<Theme>('system');

export const getSystemTheme = (): Theme => {
	if (!browser) return 'dark';
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	} else {
		return 'light';
	}
};
