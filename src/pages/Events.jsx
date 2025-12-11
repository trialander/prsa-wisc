import EventsList from "../components/EventsList.jsx";
import SuggestionBox from "../components/SuggestionBox.jsx";

export default function Events() {
  return (
    <div className="events-page">
      <section className="events-intro" aria-labelledby="events-heading">
        <h1 id="events-heading">Events</h1>
        <p>
          PRSA hosts cultural celebrations, social gatherings, and educational
          events throughout the year. Explore what's happening now, what's
          coming up, and highlights from past events.
        </p>
      </section>

      <EventsList />
      <SuggestionBox />
    </div>
  );
}