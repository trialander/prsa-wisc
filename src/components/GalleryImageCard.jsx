import { useState } from "react";
import { Card, Modal } from "react-bootstrap";

export default function GalleryImageCard({ src, title, alt, description }) {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const effectiveAlt = alt || description || title || "PRSA event photo";

  return (
    <>
      <Card
        className="h-100 gallery-image"
        onClick={handleOpen}
        role="button"
      >
        <Card.Img variant="top" src={src} alt={effectiveAlt} />
        <Card.Body>
          <Card.Title as="h3" className="h6 mb-1">
            {title}
          </Card.Title>
          {description && (
            <Card.Text className="mb-0 text-muted small">
              Click to view details
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={src} alt={effectiveAlt} className="img-fluid mb-3" />
          {description && <p className="mb-0">{description}</p>}
        </Modal.Body>
      </Modal>
    </>
  );
}