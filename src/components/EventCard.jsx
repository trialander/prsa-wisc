import { Card } from "react-bootstrap";

export default function EventCard({
  title,
  location,
  description,
  dateLabel,
  timeRange,
  variant = "current", 
  img,
}) {
  const hasPhoto = Boolean(img);
  const variantClass =
    "event-card event-card--" +
    variant +
    (hasPhoto ? " event-card--with-banner" : "");

  return (
    <Card className={variantClass}>
      {hasPhoto && (
        <div>
          <img
            src={img}
            alt={`Flyer for event: ${title}`}
            className="event-card-banner-img"
          />
        </div>
      )}

      <div className="event-card-inner p-3">
        <div className="event-card-meta">
          <p className="fw-semibold mb-1">{dateLabel}</p>
          <p className="mb-0">{timeRange}</p>
        </div>
        <div className="event-card-body">
          <h3 className="h5 mb-1">{title}</h3>
          <p className="mb-1 text-muted">{location}</p>
          {description && <p className="mb-0">{description}</p>}
        </div>
      </div>
    </Card>
  );
}
