/* global CS571 */

import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import GalleryImageCard from "./GalleryImageCard.jsx";

const GALLERY_URL =
  "https://cs571api.cs.wisc.edu/rest/f25/bucket/p97gallery";

const GALLERY_IMAGES_BASE = `${import.meta.env.BASE_URL}images/gallery/`;

export default function ImageGallery() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(GALLERY_URL, {
          headers: {
            "X-CS571-ID": CS571.getBadgerId(),
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const json = await res.json();
        console.log("Gallery bucket response:", json);

        const resultsObj = json.results || {};
        const values = Object.values(resultsObj);
        const arr = Array.isArray(values[0]) ? values[0] : [];

        setItems(arr);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    fetchGallery();
  }, []);

  if (status === "loading") {
    return (
      <section className="image-gallery mt-4">
        <h2>Photo Gallery</h2>
        <Spinner animation="border" size="sm" className="me-2" />
        Loading photos…
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="image-gallery mt-4">
        <h2>Photo Gallery</h2>
        <Alert variant="danger" className="mt-2">
          We couldn't load the gallery right now.
        </Alert>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="image-gallery mt-4">
        <h2>Photo Gallery</h2>
        <p className="text-muted">
          Photos from PRSA events will appear here soon.
        </p>
      </section>
    );
  }

  return (
    <section className="image-gallery mt-4" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading">Photo Gallery</h2>
      <p className="text-muted">
        A glimpse into PRSA events and moments from our community.
      </p>

      <Row className="g-3 mt-2">
        {items.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4}>
            <GalleryImageCard
              src={`${GALLERY_IMAGES_BASE}${item.file}`}
              title={item.title}
              description={item.description}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}
