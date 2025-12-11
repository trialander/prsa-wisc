import ContactForm from "../components/ContactForm.jsx";

export default function Contact() {
    return (
        <div>
            <h1>Contact Us</h1>

            <h2>Join PRSA</h2>
            <p>Fill out the following information to be added to the PRSA WhatsApp Groupchat</p>
            <ContactForm/>

            <h2>Club Collaboration Inquiries</h2>
            <p>Are you part of a club, fraternity, or sorority and have an idea for a group event?</p>
            <p>Email us at: <a href="mailto:roblesrobles@wisc.edu"><strong>roblesrobles@wisc.edu</strong></a></p>
        </div>
    )
}