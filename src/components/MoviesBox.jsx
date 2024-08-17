import { useState } from 'react';

function MoviesBox({ children, classNames = '' }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`box ${classNames}`}>
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '–' : '+'}
            </button>

            {isOpen && children}
        </div>
    );
}

export default MoviesBox;
