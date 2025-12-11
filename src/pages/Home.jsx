import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/prsalogo.png";
import ImageGallery from "../components/ImageGallery.jsx";

const SECTIONS = [
  {
    title: "About",
    text: "Learn about the club and meet the board members.",
    path: "/about",
  },
  {
    title: "Events",
    text: "View upcoming and past events, and suggest future ones.",
    path: "/events",
  },
  {
    title: "Contact",
    text: "Reach out to join PRSA or collaborate with us.",
    path: "/contact",
  },
  {
    title: "Donate",
    text: "Support our cultural programming and community events.",
    path: "/donate",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <Row className="align-items-center g-4">
          <Col md={5}>
            <div className="home-hero-logo-wrap">
              <img
                src={logo}
                alt="Puerto Rican Student Association logo"
                className="img-fluid home-hero-logo"
              />
            </div>
          </Col>
          <Col md={7}>
            <h1 className="home-hero-title">
              Celebrate Puerto Rican culture at UW–Madison.
            </h1>
            <p className="home-hero-subtitle">
              PRSA is a community for Puerto Rican students and allies to connect,
              share culture, and support one another on campus.
            </p>
          </Col>
        </Row>
      </section>
      <section className="mt-5" aria-labelledby="site-overview-heading">
        <h2 id="site-overview-heading" className="mb-3">
            Explore the site
        </h2>
        <Row className="g-4">
        {SECTIONS.map((section, idx) => {
        const isBlue = idx % 2 === 0;
        const cardClass = isBlue
            ? "home-section-card home-section-card--blue card-lift"
            : "home-section-card home-section-card--red card-lift";
        const btnVariant = isBlue ? "primary" : "danger";

        return (
            <Col key={section.title} xs={12} md={6} lg={3}>
            <Card className={cardClass}>
                <Card.Body>
                <Card.Title>{section.title}</Card.Title>
                <Card.Text>{section.text}</Card.Text>
                <Button
                as={Link}
                to={section.path}
                size="sm"
                variant={btnVariant}
                >
                Go to {section.title}
                </Button>
                </Card.Body>
            </Card>
            </Col>
        );
        })}
    </Row>
    </section>
    <ImageGallery />
    </div>
  );
}