import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
    images: Image [];
    onImageClick: (image: Image) => void;
}


export default function ImageGallery ({images, onImageClick} : ImageGalleryProps) {
    return (
        <ul className={css.gallery}>
	       {images.map((image) => (
            <ImageCard key={image.id} image={image} onClick={onImageClick}/>
           ))}
        </ul>

    );

}