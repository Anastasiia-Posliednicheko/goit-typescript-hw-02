import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { Image } from "../../types";


Modal.setAppElement("#root");

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: Image | null;
}

export default function ImageModal({isOpen, onClose, image} : ImageModalProps) {
    if(!image) return null;

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="ImageModal"
            overlayClassName={css.ModalOverlay}
            className={css.ModalContent}
        >
            <img
               src={image.urls.regular}
               alt={image.alt_description}
            />
             <p><strong>Author:</strong> {image.user.name}</p>
             <p><strong>Likes:</strong> {image.likes}</p>
             <p><strong>Location:</strong> {image.user.location || "Not available"}</p>


        </Modal>
    );

}