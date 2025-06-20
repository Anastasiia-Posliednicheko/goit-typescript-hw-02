import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
    onClick: () => void;
}
export default function LoadMoreBtn ({onClick} : LoadMoreBtnProps) {
    return (
        <div>
            <button className={css.button} onClick={onClick}>Load More</button>
        </div>
    );
}