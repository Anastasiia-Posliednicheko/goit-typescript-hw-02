import css from "./ImageCard.module.css";
import { Image} from "../../types";



interface ImageCardProps {
    image: Image;
    onClick: (image: Image) => void;
}
export default function ImageCard ({image, onClick} : ImageCardProps) {
    return (
         <li className={css.card}>
            <div onClick={() => onClick(image)}>
                <img src={image.urls.small} alt={image.alt_description} />
            </div>
        </li>

    );
} 