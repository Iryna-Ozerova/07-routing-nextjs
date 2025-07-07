import css from "./TagsMenu.module.css"
import Link from "next/link"

const tags = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"]

const TagsMenu = () => {
    return (
        <div className={css.menuContainer}>
  <button className={css.menuButton}>
    Notes ▾
  </button>
            <ul className={css.menuList}>
                {tags.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag === "All" ? "all" : tag}`} className={css.menuLink}>
  {tag}
</Link>
                    </li>
                ))}
    </ul>
</div>
    )
}

export default TagsMenu;