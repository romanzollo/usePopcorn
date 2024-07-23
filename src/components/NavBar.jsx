import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';

function NavBar() {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <NumResults />
        </nav>
    );
}

export default NavBar;
