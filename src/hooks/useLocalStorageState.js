import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
    // массив просмотренных фильмов
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);

        // чтобы избежать ошибок при обновлении страницы
        // делаем проверку на наличия значения в localStorage
        // и если оно есть, то парсим его в JSON
        // иначе возвращаем initialState
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    // предпочтительный вариант добавления просмотренных фильмов в localStorage
    // так как он будет работать при обновлении страницы
    // и автоматически обновлять localStorage через useEffect
    useEffect(() => {
        // дабавлять просмотренный фильм через создание нового массива
        // как в функции handleAddToWatched уже не нужно т.к. useEffect будет запущен когда фильмы
        // уже будут обновлены
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}
