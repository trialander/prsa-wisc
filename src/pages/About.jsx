/* global CS571 */
import boardGroupPhoto from "../assets/board.png";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import BoardMemberCard from "../components/BoardMemberCard.jsx";

const BOARD_IMAGES_BASE = `${import.meta.env.BASE_URL}images/board/`;

const BOARD_MEMBERS = [
  {
    id:0,
    img: "faviola-robles.png",
    name: "Faviola Robles",
    position: "President",
    major: "Communications",
    class: "Senior",
    home: "Dorado, PR",
    aboutme: ""
  },
  {
    id:1,
    img: "annika-vasquez.png",
    name: "Annika Vasquez",
    position: "Vice President",
    major: "",
    class: "Freshman",
    home: "Caguas, PR",
    aboutme: "Annika Vazquez, is a student at UW-Madison, c/o 2029 Majoring in Animal and Veterinary Biosciences. From Caguas, PR. Her favorite things about Puerto Rico are the dances/music/food. She is currently the Vice President of PRSA and hopes to help Puertoricans feel welcome and included on campus and educate others on Puertorican Culture."
  },
  {
    id:2,
    img: "diego-martinez.png",
    name: "Diego Martinez",
    position: "Event Coordinator",
    major: "Secondary Education",
    class: "Graduate",
    home: "Caguas, PR",
    aboutme: "I was born in Caguas, Puerto Rico and moved to Florida after the hurricanes. I’ve been in Madison for around 3 years now always working in building community. The thing I miss the most about Puerto Rico is the warm beaches! Love talking to people, good food, and anything education!"
  },
  {
    id:3,
    img: "yalmarie-.png", //TODO: INSERT YALMARIE'S LAST NAME
    name: "Yalmarie",
    position: "",
    major: "",
    class: "",
    home: "",
    aboutme: ""
  },
  {
    id:4,
    img: "sarah-holdeman.png",
    name: "Sarah Holdeman",
    position: "Social Outreach",
    major: "Elementary Education",
    class: "Senior",
    home: "Palatine, IL",
    aboutme: "Sarah Holdeman is a Senior K-9 Elementary Education student with a certificate in Educational Policy. She is originally from Palatine, Illinois, and plans to teach in Wisconsin post graduation. She helped Faviola Robles (President) in her founding the PRSA, now taking on the role of Social Outreach for the club. Sarah has loved meeting new people, learning to Salsa dance, and trying authentic Puerto Rican foods. She encourages and invites all students to attend and join the PRSA to learn more about and celebrate Puerto Rican culture here at UW-Madison!"
  },
  {
    id:5,
    img: "chance-Anderson.png",
    name: "Chance Anderson",
    position: "Media Outreach",
    major: "Computer Science",
    class: "Senior",
    home: "Cottage Grove, WI",
    aboutme: "Hi! I'm Sarah's boyfriend amd I helped Sarah and Favi in the early days of PRSA. I'm happy to see how much the association has grown since then with many new members and events. I'm also in charge of creating and maintaining the website you're currently viewing this on!"
  }
]

export default function About() {
  const [members, setMembers] = useState(BOARD_MEMBERS);

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
      </section>
    </div>
  );
}