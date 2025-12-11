import flag from "../assets/flag.png";

export default function Banner() {
    return(
        <div className="prsa-banner" role="banner">
            <div
            className="prsa-banner-flag"
            style={{ backgroundImage: `url(${flag})` }}
            aria-hidden="true"
            />
            <div className="prsa-banner-center">
                <h1 className="prsa-banner-title">
                    Puerto Rican Student Association
                </h1>
                <h2 className="prsa-banner-subtitle">
                    University of Wisconsin–Madison
                </h2>
            </div>
            <div
            className="prsa-banner-flag"
            style={{ backgroundImage: `url(${flag})` }}
            aria-hidden="true"
            />
        </div>
    );
}