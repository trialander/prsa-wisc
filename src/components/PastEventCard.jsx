import { Card } from "react-bootstrap";

export default function PastEventCard({
  title,
  location,
  description,
  dateLabel,
  timeRange,
  img,
  flip = false,
}) {
  const containerClass =
    "event-card event-card--past";

  return (
    <Card className={containerClass}>
      <div
        className={
          "event-card-inner p-3" +
          (flip ? " event-card-inner--reverse" : "")
        }
      >
        <div style={{ maxWidth: "220px" }}>
          <img
            src={img}
            alt={`Photo from past event: ${title}`}
            className="event-card-img"
          />
        </div>

        <div className="event-card-body">
          <p className="fw-semibold mb-1">{dateLabel}</p>
          <p className="mb-1">{timeRange}</p>
          <h3 className="h5 mb-1">{title}</h3>
          <p className="mb-1 text-muted">{location}</p>
          {description && <p className="mb-0">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
