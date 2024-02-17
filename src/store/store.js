import { writable } from 'svelte/store';

export const userData = writable(null);

// データをセットする関数
export const setUserData = (data) => {
  userData.set(data);
};
