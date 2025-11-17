import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-overlay"></div>

      <div className="header-content">
        <h1>Your World of Anime Figures</h1>
        <p>
          Discover authentic, high-quality figures from your favorite anime series.
        </p>
        <div className="header-buttons">
          <button className="header-button shop">Shop New Arrivals</button>
          <button className="header-button view">View Bundles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
