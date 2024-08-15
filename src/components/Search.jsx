import { useEffect, useRef } from 'react';

function Search({ query, setQuery }) {
    // добавляем useRef для хранения ссылки на input
    const inputElem = useRef(null);

    // при монтировании компонента устанавливаем фокус на input поиска
    useEffect(() => {
        function callback(e) {
            // если фокус уже на input, то ничего не делаем
            // чтобы не сбрасывать текст поиска который мы уже набрали
            if (document.activeElement === inputElem.current) return;

            // при нажатии Enter устанавливаем фокус на input
            // и очищаем поле поиска
            if (e.code === 'Enter') {
                inputElem.current.focus();
                setQuery('');
            }
        }

        // добавляем слушатель событий "keydown"
        document.addEventListener('keydown', callback);

        // устанавливаем фокус на input поиска
        inputElem.current.focus();

        // ОБЯЗАТЕЛЬНО удаляем слушатель события при размонтировании компонента
        // чтобы не засорять память
        return () => document.removeEventListener('keydown', callback);
    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElem} // добавляем ссылку на input
        />
    );
}

export default Search;
