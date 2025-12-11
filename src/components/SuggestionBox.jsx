import { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const SUGGESTIONS_URL =
  "https://cs571api.cs.wisc.edu/rest/f25/bucket/p97suggestions";

export default function SuggestionBox() {
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = suggestion.trim();
    if (!trimmed) return;

    setStatus("submitting");

    try {
      const res = await fetch(SUGGESTIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": CS571.getBadgerId(),
        },
        body: JSON.stringify({
          suggestion: trimmed,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit suggestion");
      }

      setSuggestion("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Card className="suggestion-box mt-4">
      <Card.Body>
        <Card.Title as="h2" className="h4 mb-2">
          Have an idea for an event?
        </Card.Title>
        <Card.Text className="mb-3">
          Share your suggestions for future PRSA events! This form sends
          feedback to a public class bucket, so please do not include
          personal contact information.
        </Card.Text>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventSuggestion">
            <Form.Label className="visually-hidden">
              Event suggestion
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Tell us what you’d like to see from PRSA..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center mt-3 gap-2">
            <Button
              type="submit"
              className="suggestion-box-btn"
              disabled={status === "submitting" || suggestion.trim() === ""}
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
                "Submit suggestion"
              )}
            </Button>

            {status === "success" && (
              <span className="text-success small">
                Thanks for sharing your idea!
              </span>
            )}
            {status === "error" && (
              <span className="text-danger small">
                Sorry, something went wrong. Please try again.
              </span>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}