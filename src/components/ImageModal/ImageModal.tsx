import Modal from "react-modal";
import css from "./ImageModal.module.css";


Modal.setAppElement("#root");

export default function ImageModal({isOpen, onClose, image}) {
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