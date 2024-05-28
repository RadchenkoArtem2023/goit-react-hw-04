import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      onAfterOpen={() => window.addEventListener("keydown", handleKeyDown)}
      onAfterClose={() => window.removeEventListener("keydown", handleKeyDown)}
      className={styles.Modal}
      overlayClassName={styles.Overlay}>
      <div className={styles.ModalContent} onClick={handleBackdropClick}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <div className={styles.Info}>
          <p>
            <strong>Description:</strong>{" "}
            {image.description || "No description"}
          </p>
          <p>
            <strong>Author:</strong> {image.user.name}
          </p>
          <p>
            <strong>Likes:</strong> {image.likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
