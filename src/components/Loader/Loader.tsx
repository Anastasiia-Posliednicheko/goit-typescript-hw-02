import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";


export default function Loader () {
    return (
        <div className={css.loader}>
            <ClipLoader color="#f48fb1" size={60} />
        </div>
        
    );
}