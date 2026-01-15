import { useState } from 'react';

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

const NAV_ITEMS = [
    {
        label: 'Estates',
        items: [
            { label: 'Personal Estate', url: 'https://ghouenzen.onrender.com/dashboard' },
            { label: 'Njikam Estate', url: 'https://campost-biling.onrender.com/' },
            { label: 'Family', url: 'https://family-cw0o.onrender.com/dashboard' },
        ],
    },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Contact', url: '#contact' },
];

function App() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <div className="container">
            {/* Navigation Header */}
            <header className="header">
                <div className="header-inner">
                    <div className="logo">
                        <h1 className="logo-text">ZAIZEN</h1>
                        <span className="logo-subtitle">Estate Management</span>
                    </div>

                    <nav className="nav">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="nav-item"
                                onMouseEnter={() => item.items && setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {item.url ? (
                                    <a href={item.url} className="nav-link">
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className="nav-link">{item.label}</span>
                                )}

                                {item.items && activeDropdown === item.label && (
                                    <div className="dropdown">
                                        {item.items.map((subItem) => (
                                            <a
                                                key={subItem.label}
                                                href={subItem.url}
                                                className="dropdown-item"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {subItem.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-wrapper">
                    <section className="hero-section">
                        <h2 className="hero-title">Estate Management Portal</h2>
                        <p className="hero-subtitle">
                            Access and manage your estates with professional tools and services
                        </p>
                    </section>

                    <section className="estates-section">
                        <h3 className="section-title">Our Estates</h3>
                        <div className="estates-grid">
                            {LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.disabled ? undefined : link.url}
                                    className={`estate-card ${link.disabled ? 'disabled' : ''}`}
                                    target={link.disabled ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    onClick={(e) => link.disabled && e.preventDefault()}
                                >
                                    <div className="estate-image-container">
                                        <img src={link.image} alt={link.title} className="estate-image" />
                                    </div>
                                    <div className="estate-content">
                                        <h3 className="estate-title">{link.title}</h3>
                                        <p className="estate-description">{link.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>ZAIZEN Estate</h4>
                        <p>© 2026 All Rights Reserved.</p>
                    </div>
                    <div className="footer-section">
                        <a href="#" className="footer-link">Terms of Use</a>
                        <a href="#" className="footer-link">Privacy Policy</a>
                        <a href="#" className="footer-link">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
