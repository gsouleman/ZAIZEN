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
            { label: 'Farm Management', url: 'https://farm-management-qb62.onrender.com/index.html#farm-info' },
        ],
    },
    { label: 'About', url: '#about' },
    { label: 'Services', url: '#services' },
    { label: 'Contact', url: '#contact' },
];

const SERVICES = [
    {
        title: 'Estate Management',
        description: 'Comprehensive estate planning and legacy management solutions designed to preserve, protect, and efficiently transfer your family wealth across generations. Our platform provides secure documentation, beneficiary management, inheritance distribution planning, and complete estate valuation tools to ensure your legacy is managed according to your wishes.',
        icon: '🏛️',
        url: 'https://ghouenzen.onrender.com/dashboard',
    },
    {
        title: 'Asset Management',
        description: 'Advanced digital asset tracking and portfolio management system offering real-time monitoring, valuation, and comprehensive reporting for all your properties, investments, and valuable possessions. Track ownership documentation, appreciation trends, maintenance schedules, and generate detailed asset reports for financial planning and insurance purposes.',
        icon: '📊',
        url: 'https://ghouenzen.onrender.com/dashboard',
    },
    {
        title: 'Farm Management',
        description: 'Professional agricultural estate management platform with comprehensive tools for tracking farm operations, crop allocation, land use optimization, and financial performance analysis. Monitor farm boundaries, manage multiple plots, track seasonal yields, analyze profitability by crop type, and maintain complete records of all farming activities across your agricultural properties.',
        icon: '🌾',
        url: 'https://farm-management-qb62.onrender.com/index.html#farm-info',
    },
    {
        title: 'Personal Financial Management',
        description: 'Personalized wealth management and financial planning services designed to optimize your individual financial position and achieve long-term security. Track income and expenses, manage debts and credits, monitor cash flow, set financial goals, and receive actionable insights to improve your financial health and build sustainable wealth for the future.',
        icon: '💼',
        url: 'https://ghouenzen.onrender.com/dashboard',
    },
    {
        title: 'Associations Financial Management',
        description: 'Specialized financial management solutions for families, cooperatives, and business associations. Streamline collaborative wealth management, transparent fund tracking, member contribution monitoring, collective investment oversight, and comprehensive financial reporting. Perfect for family estates, agricultural cooperatives, investment clubs, and partnership ventures.',
        icon: '🏢',
        url: 'https://family-cw0o.onrender.com/dashboard',
    },
];

const FEATURES = [
    'Comprehensive estate planning and beneficiary designation',
    'Real-time asset tracking with automated valuation updates',
    'Agricultural land management and crop profitability analysis',
    'Personal income, expense, and cash flow monitoring',
    'Collaborative financial management for associations and cooperatives',
    'Secure cloud-based documentation and record keeping',
    'Multi-generational wealth transfer and inheritance planning',
    'Professional financial reporting and analytics dashboards',
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
                        <span className="logo-subtitle">Complete Estate Management</span>
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
                        <h2 className="hero-title">Complete Estate, Asset & Financial Management Solutions</h2>
                        <p className="hero-subtitle">
                            Integrated wealth management platform for estates, assets, farms, personal finances, and associations — Empowering individuals, families, and organizations to build and preserve lasting prosperity
                        </p>
                    </section>

                    <section id="about" className="about-section">
                        <div className="about-content">
                            <p className="about-text">
                                ZAIZEN Estate Management is a comprehensive digital platform designed to revolutionize how individuals, families, and associations manage their wealth and assets. Our integrated solution brings together estate planning, asset tracking, agricultural management, personal finance, and collaborative wealth management into one secure, easy-to-use system.
                            </p>
                            <p className="about-text">
                                Whether you're managing a personal estate, tracking valuable assets, overseeing agricultural properties, planning your financial future, or coordinating finances for a cooperative or family association, ZAIZEN provides the professional tools and insights you need. Our platform combines cutting-edge technology with intuitive design to deliver transparent, efficient, and secure management of your most valuable resources.
                            </p>
                            <p className="about-text">
                                With decades of combined expertise in financial planning, agricultural management, and estate administration, we've built a platform that serves individuals, families, farmers, and organizations. From documenting assets and tracking farm operations to managing collective investments and planning generational wealth transfer, ZAIZEN is your trusted partner in building and preserving lasting prosperity.
                            </p>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section id="services" className="services-section">
                        <h3 className="section-title">Our Services</h3>
                        <div className="services-grid">
                            {SERVICES.map((service) => (
                                <a
                                    key={service.title}
                                    href={service.url}
                                    className="service-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="service-icon">{service.icon}</div>
                                    <h4 className="service-title">{service.title}</h4>
                                    <p className="service-description">{service.description}</p>
                                </a>
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
