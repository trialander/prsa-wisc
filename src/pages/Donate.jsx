import venmoQR from "../assets/venmoQR.jpg";

export default function Donate(){
    return (
        <div>
            <h1>Scan to Donate</h1>
            <p>Donations of any amount help us fund special events for the club!</p>
            <img src={venmoQR} alt="PRSA venmo QR code to donate"/>
        </div>
    );

}