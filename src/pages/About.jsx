/* global CS571 */
import boardGroupPhoto from "../assets/board.png";
import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import BoardMemberCard from "../components/BoardMemberCard.jsx";

const BOARD_MEMBERS_URL =
  "https://cs571api.cs.wisc.edu/rest/f25/bucket/p97board";

const BOARD_IMAGES_BASE = `${import.meta.env.BASE_URL}images/board/`;

export default function About() {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch(BOARD_MEMBERS_URL, {
          headers: {
            "X-CS571-ID": CS571.getBadgerId(),
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch board members");
        }

        const json = await res.json();
        console.log("Bucket response:", json);

        // Grab the first array in json.results
        const resultsObj = json.results || {};
        const values = Object.values(resultsObj);
        const membersArr = Array.isArray(values[0]) ? values[0] : [];

        setMembers(membersArr);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    fetchMembers();
  }, []);

  return (
    <div className="about-page">
      <section className="about-intro" aria-labelledby="about-heading">
        <h1 id="about-heading">About PRSA</h1>
        <p>
          The Puerto Rican Student Association (PRSA) at UW–Madison creates a
          space for Puerto Rican students and allies to connect, celebrate
          culture, and support one another on campus.
        </p>
        <p>
          We host cultural events, social gatherings, and educational programs
          that highlight Puerto Rican history, traditions, and contemporary
          issues.
        </p>
      </section>

      <section className="about-photo">
        <img
          src={boardGroupPhoto}
          alt="Group photo of the PRSA board members."
          className="about-photo-img"
        />
      </section>

      <section className="about-board mt-4" aria-labelledby="board-heading">
        <h2 id="board-heading">Meet the board</h2>

        {status === "loading" && (
          <div className="mt-3">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading board members…
          </div>
        )}

        {status === "error" && (
          <Alert className="mt-3" variant="danger">
            We couldn't load the board member information right now.
          </Alert>
        )}

        {status === "success" && (
          <Row className="mt-3 g-4" xs={1}>
            {members.map((member) => {
              const imgPath = member.img
                ? `${BOARD_IMAGES_BASE}${member.img}`
                : undefined;

              return (
                <Col key={member.id}>
                  <BoardMemberCard
                    img={imgPath}
                    name={member.name}
                    position={member.position}
                    major={member.major}
                    class={member.class}
                    home={member.home}
                    aboutme={member.aboutme}
                    flip={member.id % 2 === 0}
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