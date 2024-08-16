import { useRef } from 'react';

// custom hooks
import { useKey } from '../hooks/useKey';

function Search({ query, setQuery }) {
    // добавляем useRef для хранения ссылки на input
    const inputElem = useRef(null);

    // CUSTOM HOOKS
    // при монтировании компонента устанавливаем фокус на input поиска
    useKey('Enter', () => {
        // если фокус уже на input, то ничего не делаем
        // чтобы не сбрасывать текст поиска который мы уже набрали
        if (document.activeElement === inputElem.current) return;

        // при нажатии Enter устанавливаем фокус на input
        // и очищаем поле поиска
        inputElem.current.focus();
        setQuery('');
    });

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
