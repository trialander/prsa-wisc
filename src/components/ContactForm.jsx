/* global CS571 */

import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const CONTACT_URL =
  "https://cs571api.cs.wisc.edu/rest/f25/bucket/p97contacts";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [status, setStatus] = useState("idle"); 

  // simple email regex for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) return;

    const valid = emailRegex.test(trimmedEmail);
    setIsValidEmail(valid);

    if (!valid) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": CS571.getBadgerId(),
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit contact request");
      }

      setFullName("");
      setEmail("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div style={{ maxWidth: "50%", margin: "auto" }}>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group controlId="contactName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            maxLength={64}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="you@wisc.edu"
            maxLength={64}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {!isValidEmail && (
          <p style={{ color: "crimson", marginTop: "0.5rem" }}>
            The email you entered doesn't look valid. Please double-check it.
          </p>
        )}

        <p className="mt-2 mb-2 small text-muted">
          This form sends your name and email to a public class bucket. Please
          only submit information you are comfortable sharing for this course.
        </p>

        <div className="d-flex align-items-center gap-2 mt-2">
          <Button
            type="submit"
            className="suggestion-box-btn"
            disabled={
              status === "submitting" ||
              fullName.trim() === "" ||
              email.trim() === ""
            }
          >
            {status === "submitting" ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Submitting…
              </>
            ) : (
              "Request to Join"
            )}
          </Button>

          {status === "success" && (
            <span className="text-success small">
              Thanks! Your request has been submitted.
            </span>
          )}
          {status === "error" && (
            <span className="text-danger small">
              Sorry, something went wrong. Please try again.
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}
