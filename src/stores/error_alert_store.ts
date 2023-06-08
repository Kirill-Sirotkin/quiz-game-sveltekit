import { writable } from 'svelte/store';

interface ErrorAlert {
	errorId: uuid;
	errorText: string;
	errorCode: number;
}

type uuid = `${string}-${string}-${string}-${string}-${string}`;

const errorAlert = writable<ErrorAlert[]>([]);

const generateId = (): uuid => {
	return crypto.randomUUID();
};
const removeError = (id: uuid) => {
	errorAlert.update((list) => {
		return list.filter((err) => err.errorId !== id);
	});
};

export const useErrorAlert = () => {
	return {
		subscribe: errorAlert.subscribe,
		addError: (text: string, code: number) => {
			const id = generateId();
			errorAlert.update((list) => {
				return [...list, { errorId: id, errorText: text, errorCode: code }];
			});
			setTimeout(() => {
				removeError(id);
			}, 4000);
		},
		removeError
	};
};
