import TagsMenu from "../TagsMenu/TagsMenu"
import css from "./Header.module.css"
import Link from "next/link"

const Header = () => {
    return (
        <header className={css.header}>
            <Link className={css.headerLink} href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li >
                        <Link className={css.headerLink} href="/">Home</Link>
                    </li>
                    <li className={css.headerLink}>
                        <TagsMenu />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;