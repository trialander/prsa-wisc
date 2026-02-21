/* global CS571 */

import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import FutureEventCard from "./FutureEventCard.jsx";
import EventCard from "./EventCard.jsx";
import PastEventCard from "./PastEventCard.jsx";

const EVENTS_URL =
  "https://cs571api.cs.wisc.edu/rest/f25/bucket/p97events";

const EVENTS_IMAGES_BASE = `${import.meta.env.BASE_URL}images/events/`;

const EVENTS = [
  {
    "id": "1",
    "name": "PRSA Launch Meeting",
    "location": "Memorial Union, Profile Room 2nd Floor",
    "start-time": "2025-03-10T19:30:00-06:00",
    "end-time": "2025-03-10T20:30:00-06:00",
    "description": "First PRSA meeting of the Spring 2025 semester, learn about the club and get to know other new members!"
  },
  {
    "id": "2",
    "name": "Baile Inolvidable KDCHI x PRSA",
    "location": "MSC Lounge (Red Gym)",
    "start-time": "2025-04-28T18:00:00-06:00",
    "end-time": "2025-04-28T20:00:00-06:00",
    "description": "Come learn some fun moves, meet new people, and dance the night away. No experience needed!"
  },
  {
    "id": "3",
    "name": "Fall 2025 Introduction Meeting",
    "location": "Memorial Union Meeting Room",
    "start-time": "2025-10-23T19:00:00-06:00",
    "end-time": "2025-10-23T20:00:00-06:00",
    "description": "Whether you're Puertorican, have love for the island, or just want to learn more about our culture, come through! We'll be sharing our plans for the year, playing some games, and connecting as a community."
  },
  {
    "id": "4",
    "name": "Open Salsa Social",
    "location": "Memorial Union",
    "start-time": "2025-11-06T18:30:00-06:00",
    "end-time": "2025-11-06T20:00:00-06:00",
    "description": "Join us to learn some moves and get to know PRSA!"
  },
  {
    "id": "5",
    "name": "Noche Puertorriqueña",
    "location": "Memorial Union National Pan-Hellenic Council Room (2nd Floor)",
    "start-time": "2025-11-21T18:30:00-06:00",
    "end-time": "2025-11-21T20:30:00-06:00",
    "description": "An evening celebrating Puerto Rican culture from the mountains to the coast."
  },
  {
    "id": "6",
    "name": "Christmas Bonfire",
    "location": "Picnic Point Fire Circle #1",
    "start-time": "2025-12-05T19:45:00-06:00",
    "end-time": "2025-12-05T20:00:00-06:00",
    "description": "Celebrate the beginning of winter with PRSA by sharing some hot chocolate and marshmallows!"
  },
  {
    "id": "7",
    "name": "Org Fair",
    "location": "Kohl Center",
    "start-time": "2026-02-10T16:00:00-06:00",
    "end-time": "2026-02-10T20:00:00-06:00",
    "description": "Stop by our booth at the org fair to learn more about the club!"
  },
  {
    "id": "8",
    "name": "General Body Meeting",
    "location": "Middleton Building, Room 120",
    "start-time": "2026-02-17T18:00:00-06:00",
    "end-time": "2026-02-17T19:30:00-06:00",
    "description": "First meeting of the spring semester! Come by to learn more about the club and get up to speed on upcoming events!"
  },
  {
    "id": "9",
    "name": "Movie Night - Rita Moreno: Just a Girl Who Decided to Go for It",
    "location": "Middleton Building, Room 120",
    "start-time": "2026-02-24T18:30:00-06:00",
    "end-time": "2026-02-24T20:00:00-06:00",
    "description": "Join us for a showing of the documentary, Rita Moreno: Just a Girl Who Decided to Go for It!"
  }
]

// Categorize events into current / upcoming / past based on start/end
function categorizeEvents(events) {
  const nowMs = Date.now();
  const upcoming = [];
  const current = [];
  const past = [];

  for (const ev of events) {
    const startMs = Date.parse(ev["start-time"]);
    const endMs = Date.parse(ev["end-time"]);

    if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
      past.push(ev);
      continue;
    }

    if (startMs <= nowMs && nowMs <= endMs) {
      current.push(ev);
    } else if (startMs > nowMs) {
      upcoming.push(ev);
    } else {
      past.push(ev);
    }
  }

  // Upcoming: soonest first
  upcoming.sort(
    (a, b) =>
      Date.parse(a["start-time"]) - Date.parse(b["start-time"])
  );

  // Past: most recent first
  past.sort(
    (a, b) =>
      Date.parse(b["start-time"]) - Date.parse(a["start-time"])
  );

  // Current: earliest start first
  current.sort(
    (a, b) =>
      Date.parse(a["start-time"]) - Date.parse(b["start-time"])
  );

  return { upcoming, current, past };
}

// Format date like "Nov 21, 2025"
function formatEventDate(dateStr) {
  const t = Date.parse(dateStr);
  if (Number.isNaN(t)) return "";
  const d = new Date(t);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Format time range like "6:30 PM – 8:00 PM"
function formatEventTimeRange(startStr, endStr) {
  const startMs = Date.parse(startStr);
  const endMs = Date.parse(endStr);
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return "";

  const start = new Date(startMs);
  const end = new Date(endMs);

  const opts = { hour: "numeric", minute: "2-digit" };
  const startTime = start.toLocaleTimeString(undefined, opts);
  const endTime = end.toLocaleTimeString(undefined, opts);

  return `${startTime} – ${endTime}`;
}

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(EVENTS_URL, {
          headers: {
            "X-CS571-ID": CS571.getBadgerId(),
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        const json = await res.json();
        console.log("Events bucket response:", json);

        const resultsObj = json.results || {};
        const values = Object.values(resultsObj);
        const eventsArr = Array.isArray(values[0]) ? values[0] : [];

        setEvents(eventsArr);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    fetchEvents();
  }, []);

  if (status === "loading") {
    return (
      <div className="mt-4">
        <Spinner animation="border" size="sm" className="me-2" />
        Loading events…
      </div>
    );
  }

  if (status === "error") {
    return (
      <Alert className="mt-4" variant="danger">
        We couldn't load event information right now. Please try again later.
      </Alert>
    );
  }

  const { upcoming, current, past } = categorizeEvents(events);

  return (
    <div className="events-list mt-4">
      {current.length > 0 && (
        <section
          className="event-section"
          aria-labelledby="events-current-heading"
        >
          <h2 id="events-current-heading">Happening Now</h2>
          <Row className="g-3">
            {current.map((ev) => {
              const imgPath = `${EVENTS_IMAGES_BASE}event${ev.id}.png`;

              return (
                <Col key={ev.id} xs={12}>
                  <EventCard
                    variant="current"
                    title={ev.name}
                    location={ev.location}
                    description={ev.description}
                    dateLabel={formatEventDate(ev["start-time"])}
                    timeRange={formatEventTimeRange(
                      ev["start-time"],
                      ev["end-time"]
                    )}
                    img={imgPath}
                  />
                </Col>
              );
            })}
          </Row>
        </section>
      )}

      <section
        className="event-section"
        aria-labelledby="events-upcoming-heading"
      >
        <h2 id="events-upcoming-heading">Upcoming Events</h2>
        {upcoming.length === 0 ? (
          <p className="text-muted">
            No upcoming events yet, check back soon!
          </p>
        ) : (
          <Row className="g-3">
            {upcoming.map((ev) => {
              const imgPath = `${EVENTS_IMAGES_BASE}event${ev.id}.png`;

              return (
                <Col key={ev.id} xs={12}>
                  <FutureEventCard
                    title={ev.name}
                    location={ev.location}
                    description={ev.description}
                    dateLabel={formatEventDate(ev["start-time"])}
                    timeRange={formatEventTimeRange(
                      ev["start-time"],
                      ev["end-time"]
                    )}
                    img={imgPath}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </section>

      <section
        className="event-section"
        aria-labelledby="events-past-heading"
      >
        <h2 id="events-past-heading">Past events</h2>
        {past.length === 0 ? (
          <p className="text-muted">
            Past events will appear here once they've happened.
          </p>
        ) : (
          <Row className="g-3">
            {past.map((ev, idx) => {
              const imgPath = `${EVENTS_IMAGES_BASE}event${ev.id}.png`;
              const flip = idx % 2 === 1;

              return (
                <Col key={ev.id} xs={12}>
                  <PastEventCard
                    title={ev.name}
                    location={ev.location}
                    description={ev.description}
                    dateLabel={formatEventDate(ev["start-time"])}
                    timeRange={formatEventTimeRange(
                      ev["start-time"],
                      ev["end-time"]
                    )}
                    img={imgPath}
                    flip={flip}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </section>
    </div>
  );
}
