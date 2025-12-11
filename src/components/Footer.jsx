import instagramIcon from "../assets/IGicon.png";

export default function Footer() {
    return (
        <footer className="text-center py-4 text-muted">
            <a href="https://www.instagram.com/prsawisc" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram Icon linking to PRSA Instagram Page" style={{width : "2.5em", height : "2.5em"}}/>
            </a>
            <p className="text-muted mt-2">{new Date().getFullYear()} Puerto Rican Student Association at UW–Madison</p>
        </footer>
    );
}