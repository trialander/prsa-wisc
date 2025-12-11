import venmoQR from "../assets/venmoQR.jpg";

export default function Donate() {
  return (
    <div className="donate-page">
      <h1>Scan to Donate</h1>
      <p>Donations of any amount help us fund special events for the club!</p>
      <img
        src={venmoQR}
        alt="PRSA Venmo QR code to donate"
        className="donate-qr"
      />
    </div>
  );
}