import { writable } from 'svelte/store';
import { Language } from '../types/Language';

const englishTranslations = {
	enterNamePlaceholder: 'Enter your name',
	enterNameError: 'Please enter a name'
};
const russianTranslations = {
	enterNamePlaceholder: 'Введите свое имя',
	enterNameError: 'Пожалуйста, введите имя'
};

const { subscribe, set } = writable(englishTranslations);

export const useLanguageStore = () => {
	return {
		subscribe,
		setLanguage: (lang: Language) => {
			switch (lang) {
				case Language.english:
					set(englishTranslations);
					break;
				case Language.russian:
					set(russianTranslations);
					break;
			}
		}
	};
};
