
// Link Data
const LINKS = [
    {
        id: 'personal',
        title: 'Personal Estate',
        description: 'Manage your personal assets and dashboard securely.',
        url: 'https://ghouenzen.onrender.com/dashboard',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=3024&auto=format&fit=crop', // Office/Finance
        category: 'Analysis',
        featured: true,
    },
    {
        id: 'njikam',
        title: 'Njikam Estate',
        description: 'Campost Biling - Family heritage and property management.',
        url: 'https://campost-biling.onrender.com/',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop', // Building
        category: 'Property',
    },
    {
        id: 'family',
        title: 'Family',
        description: 'Centralized family wealth and inheritance tracking.',
        url: 'https://family-cw0o.onrender.com/dashboard',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2924&auto=format&fit=crop', // Family/Group
        category: 'Wealth',
    },
    {
        id: 'cooperate',
        title: 'Cooperate',
        description: 'Enterprise solutions for estate planning. Coming Soon.',
        url: '',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop', // Skyscraper
        category: 'Business',
        disabled: true,
    },
];

function App() {
    const featuredLink = LINKS.find((link) => link.featured);
    const otherLinks = LINKS.filter((link) => !link.featured);

    return (
        <div className="container">
            {/* CNN-Style Header */}
            <header className="header">
                <div className="header-content">
                    <h1 className="logo-text">ZAIZEN</h1>
                    <div className="edition-badge">
                        <span className="edition-text">ESTATE</span>
                    </div>
                </div>
                <div className="menu-icon">
                    <div className="menu-line" />
                    <div className="menu-line" />
                    <div className="menu-line" />
                </div>
            </header>

            <main className="scroll-content">

                {/* Top Story (Featured) */}
                {featuredLink && (
                    <a
                        href={featuredLink.url}
                        className="featured-container link-card"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="category-label">{featuredLink.category.toUpperCase()}</span>
                        <h2 className="featured-title">{featuredLink.title}</h2>

                        <div className="featured-image-container">
                            <img src={featuredLink.image} alt={featuredLink.title} className="featured-image" />
                        </div>

                        <p className="featured-description">
                            {featuredLink.description}
                        </p>
                    </a>
                )}

                <div className="divider" />

                {/* Headlines (Grid/List) */}
                <div className="headlines-container">
                    <h3 className="section-title">MORE NEWS</h3>

                    <div className="news-grid">
                        {otherLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.disabled ? undefined : link.url}
                                className={`news-item link-card ${link.disabled ? 'disabled' : ''}`}
                                target={link.disabled ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                onClick={(e) => link.disabled && e.preventDefault()}
                            >
                                <div className="news-content">
                                    <span className="news-category">{link.category.toUpperCase()}</span>
                                    <h4 className="news-title">{link.title}</h4>
                                    <p className="news-description">{link.description}</p>
                                </div>
                                <div className="thumbnail-container">
                                    <img src={link.image} alt={link.title} className="thumbnail" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="footer">
                <span className="footer-text">
                    © 2026 Zaizen Estate. All Rights Reserved.
                </span>
                <div className="footer-links">
                    <a href="#" className="footer-link">Terms of Use</a>
                    <a href="#" className="footer-link">Privacy Policy</a>
                </div>
            </footer>

        </div>
    );
}

export default App;
