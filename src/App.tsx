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
        label: 'Estates',
        items: [
            { label: 'Personal Estate', url: 'https://ghouenzen.onrender.com/dashboard' },
            { label: 'Campost Mankon', url: 'https://campost-biling.onrender.com/' },
            { label: 'Family', url: 'https://family-cw0o.onrender.com/dashboard' },
            { label: 'Cooperate', url: 'https://great-ideas.onrender.com/' },
        ],
    },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Contact', url: '#contact' },
];

const SERVICES = [
    {
        title: 'Estate Management',
        description: 'Comprehensive estate planning and management solutions to preserve and grow your family wealth across generations.',
        icon: '🏛️',
    },
    {
        title: 'Asset Tracking',
        description: 'Advanced digital tools for real-time monitoring and valuation of your property portfolio, investments, and valuable assets.',
        icon: '📊',
    },
    {
        title: 'Financial Planning',
        description: 'Personalized wealth management strategies designed to optimize your financial position and achieve long-term security.',
        icon: '💼',
    },
    {
        title: 'Corporate Solutions',
        description: 'Specialized enterprise structuring and corporate governance services to streamline business operations and secure commercial legacies.',
        icon: '🏢',
    },
];

const FEATURES = [
    'Secure cloud-based asset documentation',
    'Real-time portfolio valuation and analytics',
    'Multi-generational estate planning',
    'Professional financial advisory services',
    'Inheritance distribution management',
    'Tax-efficient wealth transfer strategies',
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

                    {/* Hero Section */}
                    <section className="hero-section">
                        <h2 className="hero-title">Professional Estate & Wealth Management</h2>
                        <p className="hero-subtitle">
                            Trusted solutions for managing, protecting, and growing your family's legacy across generations
                        </p>
                    </section>

                    <section id="about" className="about-section">
                        <div className="about-content">
                            <p className="about-text">
                                We provide comprehensive wealth and asset management services designed to help families preserve and grow their financial legacy. With decades of combined expertise in estate planning, financial advisory, and asset management, we offer a complete suite of tools and services tailored to your unique needs.
                            </p>
                            <p className="about-text">
                                Our platform combines cutting-edge technology with personalized service to deliver transparent, efficient, and secure management of your most valuable assets. Whether you're planning for retirement, managing multiple properties, or preparing wealth transfer to future generations, we provide the expertise and tools you need.
                            </p>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section id="services" className="services-section">
                        <h3 className="section-title">Our Services</h3>
                        <div className="services-grid">
                            {SERVICES.map((service) => (
                                <div key={service.title} className="service-card">
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
