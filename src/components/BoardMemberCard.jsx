import { Card } from "react-bootstrap";

export default function BoardMemberCard({
  img,
  name,
  position,
  major,
  class: gradClass,
  home,
  aboutme,
  flip = false,
}) {
  return (
    <Card className="board-card card-lift">
      <div
        className={
          "board-card-inner" +
          (flip ? " board-card-inner--reverse" : "")
        }
      >
        {img && (
          <div className="board-card-photo">
            <img
              src={img}
              alt={`${name}, PRSA ${position}`}
              className="board-card-img"
            />
          </div>
        )}

        <div className="board-card-content">
          <h3 className="h5 mb-1">{name}</h3>
          <p className="mb-2 text-muted">{position}</p>
          {major && <p className="mb-1">Major: {major}</p>}
          {gradClass && <p className="mb-1">Class: {gradClass}</p>}
          {home && <p className="mb-2">Hometown: {home}</p>}
          {aboutme && <p className="mb-0">{aboutme}</p>}
        </div>
      </div>
    </Card>
  );
}