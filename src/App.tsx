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
        title: 'Campost Mankon',
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
        description: 'Enterprise solutions for estate planning.',
        url: 'https://great-ideas.onrender.com/',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    },
];

const NAV_ITEMS = [
    {
        label: 'Portals',
        items: [
            { label: 'Personal Estate', desc: 'Secure asset & wealth dashboard', url: 'https://ghouenzen.onrender.com/dashboard' },
            { label: 'Campost Mankon', desc: 'Family heritage management', url: 'https://campost-biling.onrender.com/' },
            { label: 'Family Wealth', desc: 'Inheritance & collective tracking', url: 'https://family-cw0o.onrender.com/dashboard' },
            { label: 'Cooperate', desc: 'Enterprise estate solutions', url: 'https://great-ideas.onrender.com/' },
            { label: 'Farm Management', desc: 'Agricultural operations & land', url: 'https://farm-management-qb62.onrender.com/landing.html' },
        ],
    },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Contact', url: '#contact' },
];

const SERVICES = [
    {
        title: 'Estate & Legacy Planning',
        description: 'Comprehensive estate structuring and legacy preservation solutions designed to protect and transition familial wealth across generations. Our platform facilitates secure documentation, beneficiary designation, inheritance distribution strategies, and sophisticated estate valuation tools to ensure your legacy is managed with precision and foresight.',
        icon: '🏛️',
    },
    {
        title: 'Agricultural Asset Management',
        description: 'Professionalized agro-industrial management platform equipped with specialized tools for operational oversight, land-use optimization, and precise financial performance analytics. Execute boundary monitoring, manage diversified land parcels, track crop cycles, and maintain rigorous records of all agricultural activities to maximize yield and profitability.',
        icon: '🌾',
    },
    {
        title: 'Universal Financial Manager',
        description: 'A dual-purpose financial ecosystem engineered for both private wealth and institutional fiscal management. Streamline personal cash flow, overhead monitoring, and goal-setting while simultaneously managing cooperative funds, member contributions, and collective investment vehicles with institutional-grade transparency and reporting.',
        icon: '💼',
    }
];

const FEATURES = [
    'Advanced estate structuring and multi-generational legacy planning',
    'Real-time fiscal monitoring with automated valuation and risk assessment',
    'Integrated agro-industrial land management and yield optimization',
    'Sophisticated personal and corporate cash flow analytics',
    'Collaborative financial oversight for associations and cooperatives',
    'Secured, encrypted repository for critical documentation and assets',
    'Strategic wealth transition and inheritance management frameworks',
    'Comprehensive institutional-grade financial reporting and bi-metrics',
];

function App() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <div className="container">
            {/* Navigation Header */}
            <header className="header">
                <div className="header-inner">
                    <a href="/" className="logo">
                        <h1 className="logo-text">ZAIZEN</h1>
                        <span className="logo-subtitle">Complete Estate Management</span>
                    </a>

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
                                        {item.items && <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>}
                                    </a>
                                ) : (
                                    <span className="nav-link">
                                        {item.label}
                                        {item.items && <span style={{ fontSize: '10px', marginLeft: '2px' }}>▼</span>}
                                    </span>
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
                                                <span className="dropdown-item-label">{subItem.label}</span>
                                                {subItem.desc && <span className="dropdown-item-desc">{subItem.desc}</span>}
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

                    {/* Hero Section */}
                    <section className="hero-section">
                        <h2 className="hero-title">Premier Estate, Agricultural & Institutional Financial Management</h2>
                        <p className="hero-subtitle">
                            An integrated ecosystem for sophisticated wealth management—spanning private estates, agricultural assets, and collaborative financial frameworks. Empowering individuals and organizations to architect and preserve enduring prosperity.
                        </p>
                    </section>

                    <section id="about" className="about-section">
                        <div className="about-content">
                            <p className="about-text">
                                ZAIZEN is a sophisticated digital orchestration platform designed to redefine the management of high-value estates and institutional assets. Our integrated solution harmonizes estate & legacy planning, agricultural asset management, and universal financial oversight into a singular, fortified ecosystem.
                            </p>
                            <p className="about-text">
                                Whether overseeing private wealth, managing expansive agro-industrial holdings, or coordinating the fiscal operations of associations and cooperatives, ZAIZEN provides the institutional-grade tools necessary for rigorous stewardship. Our platform merges advanced technological infrastructure with intuitive design to ensure transparency, efficiency, and absolute security for your most vital resources.
                            </p>
                            <p className="about-text">
                                Built upon a foundation of multi-disciplinary expertise in financial engineering, agricultural management, and estate administration, ZAIZEN serves a global clientele of individuals, families, and enterprises. From strategic asset transition to real-time performance analytics, we are your essential partner in the pursuit and preservation of multi-generational prosperity.
                            </p>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section id="services" className="services-section">
                        <h3 className="section-title">Our Services</h3>
                        <div className="services-grid">
                            {SERVICES.map((service) => (
                                <div
                                    key={service.title}
                                    className="service-card"
                                >
                                    <div className="service-icon">{service.icon}</div>
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="features-section">
                        <h3 className="section-title">Key Features</h3>
                        <div className="features-grid">
                            {FEATURES.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-check">✓</span>
                                    <span className="feature-text">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Estates Section */}
                    <section className="estates-section">
                        <h3 className="section-title">Access Your Estates</h3>
                        <p className="section-subtitle">
                            Select an estate portal to view detailed asset information, financial reports, and management tools
                        </p>
                        <div className="estates-grid">
                            {LINKS.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    className="estate-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
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
            <footer id="contact" className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4 className="footer-heading">ZAIZEN Estate Management</h4>
                        <p className="footer-text">Professional wealth and estate management solutions</p>
                        <p className="footer-text">© 2026 All Rights Reserved.</p>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <a href="#about" className="footer-link">About Us</a>
                        <a href="#services" className="footer-link">Services</a>
                        <a href="#" className="footer-link">Terms of Use</a>
                        <a href="#" className="footer-link">Privacy Policy</a>
                    </div>
                    <div className="footer-section">
                        <h4 className="footer-heading">Contact</h4>
                        <p className="footer-text">Email: info@zaizen.estate</p>
                        <p className="footer-text">Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
