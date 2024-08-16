import { useEffect } from 'react';

export function useKey(key, action) {
    useEffect(() => {
        // создаем функцию обратного вызова
        const callback = (e) => {
            // проверяем все в нижнем регистре
            // чтобы не учитывать регистр букв
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        };

        document.addEventListener('keydown', callback); // добавляем обработчик события при размонтировании компонента

        return () => {
            document.removeEventListener('keydown', callback); // удаляем обработчик события
        };
    }, [action, key]);
}
