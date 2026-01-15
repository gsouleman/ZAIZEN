// Link Data
const LINKS = [
    {
        id: 'personal',
        title: 'Personal Estate',
        description: 'Manage your personal assets and dashboard securely.',
        url: 'https://ghouenzen.onrender.com/dashboard',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'njikam',
        title: 'Njikam Estate',
        description: 'Campost Biling - Family heritage and property management.',
        url: 'https://campost-biling.onrender.com/',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'family',
        title: 'Family',
        description: 'Centralized family wealth and inheritance tracking.',
        url: 'https://family-cw0o.onrender.com/dashboard',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 'cooperate',
        title: 'Cooperate',
        description: 'Enterprise solutions for estate planning. Coming Soon.',
        url: '',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
        disabled: true,
    },
];

function App() {
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
            </header>

            <main className="scroll-content">

                {/* All Links in One Row */}
                <div className="links-grid">
                    {LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={link.disabled ? undefined : link.url}
                            className={`link-item ${link.disabled ? 'disabled' : ''}`}
                            target={link.disabled ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            onClick={(e) => link.disabled && e.preventDefault()}
                        >
                            <div className="link-image-container">
                                <img src={link.image} alt={link.title} className="link-image" />
                            </div>
                            <h3 className="link-title">{link.title}</h3>
                            <p className="link-description">{link.description}</p>
                        </a>
                    ))}
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
