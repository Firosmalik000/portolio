import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const layoutDummy = {
    brand: {
        name: 'Portfolio',
        description: 'Crafting digital experiences with attention to detail, clean code, and thoughtful design.',
    },
    themeToggle: {
        label: 'Theme',
        lightLabel: 'Switch to light mode',
        darkLabel: 'Switch to dark mode',
    },
    navItems: [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ],
    actions: {
        hireMe: { label: 'Hire Me', href: '/contact' },
    },
    socialLinks: [
        {
            key: 'github',
            label: 'GitHub',
            href: 'https://github.com',
            showInMenu: true,
            showInFooter: true,
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
        {
            key: 'linkedin',
            label: 'LinkedIn',
            href: 'https://linkedin.com',
            showInMenu: true,
            showInFooter: true,
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
        },
        {
            key: 'twitter',
            label: 'Twitter',
            href: 'https://twitter.com',
            showInMenu: true,
            showInFooter: true,
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            key: 'email',
            label: 'Email',
            href: 'mailto:hello@example.com',
            showInMenu: false,
            showInFooter: true,
            icon: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ),
        },
    ],
    footer: {
        contactEmail: 'hello@example.com',
        location: 'Jakarta, Indonesia',
        note: 'Designed with care & attention to detail',
        cta: { label: 'Start a Project', href: '/contact' },
    },
};

export default function PublicLayout({ children }) {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { brand, navItems, actions, socialLinks, footer, themeToggle } = layoutDummy;
    const getInitialTheme = () => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        const stored = window.localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const [theme, setTheme] = useState(getInitialTheme);

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        document.documentElement.classList.toggle('dark', theme === 'dark');
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const closeMenu = () => setIsMenuOpen(false);
    const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200'
                        : 'bg-transparent'
                }`}
            >
                <div className="ed-container">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-neutral-900">
                                {brand.name}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`ed-body-sm transition-colors duration-200 ${
                                        isActive(item.href)
                                            ? 'text-neutral-900 font-medium'
                                            : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            <Link
                                href={actions.hireMe.href}
                                className="hidden md:inline-flex ed-button"
                            >
                                {actions.hireMe.label}
                            </Link>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="hidden md:flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
                                aria-label={theme === 'dark' ? themeToggle.lightLabel : themeToggle.darkLabel}
                            >
                                {theme === 'dark' ? (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0112 4.75zm0 14a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm8-6.5a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm-14 0a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm9.657-5.157a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm-7.778 7.778a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm0-7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zm7.778 7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.486 22 2 17.514 2 12a9.718 9.718 0 017-9.25.75.75 0 01.94.88A8.218 8.218 0 0011.25 12c0 4.695 3.905 8.5 8.5 8.5.48 0 .955-.04 1.42-.12a.75.75 0 01.582 1.372z" />
                                    </svg>
                                )}
                            </button>

                            {/* Mobile Theme Toggle */}
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="flex md:hidden h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
                                aria-label={theme === 'dark' ? themeToggle.lightLabel : themeToggle.darkLabel}
                            >
                                {theme === 'dark' ? (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0112 4.75zm0 14a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm8-6.5a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm-14 0a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm9.657-5.157a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm-7.778 7.778a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm0-7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zm7.778 7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.486 22 2 17.514 2 12a9.718 9.718 0 017-9.25.75.75 0 01.94.88A8.218 8.218 0 0011.25 12c0 4.695 3.905 8.5 8.5 8.5.48 0 .955-.04 1.42-.12a.75.75 0 01.582 1.372z" />
                                    </svg>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex md:hidden h-10 w-10 items-center justify-center text-neutral-900"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-white"
                    onClick={closeMenu}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute inset-0 flex flex-col bg-white transition-transform duration-300 ease-out ${
                        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
                >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-100">
                        <span className="font-serif text-xl font-semibold">Menu</span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-700 transition hover:border-neutral-400 hover:text-neutral-900"
                                aria-label={theme === 'dark' ? themeToggle.lightLabel : themeToggle.darkLabel}
                            >
                                {theme === 'dark' ? (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0112 4.75zm0 14a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm8-6.5a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm-14 0a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5a.75.75 0 01.75.75zm9.657-5.157a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm-7.778 7.778a.75.75 0 011.061 0l.354.354a.75.75 0 11-1.06 1.06l-.355-.353a.75.75 0 010-1.061zm0-7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zm7.778 7.778a.75.75 0 010 1.061l-.354.354a.75.75 0 11-1.06-1.06l.353-.355a.75.75 0 011.061 0zM12 7a5 5 0 100 10 5 5 0 000-10z" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M21.752 15.002A9.718 9.718 0 0112.002 22C6.486 22 2 17.514 2 12a9.718 9.718 0 017-9.25.75.75 0 01.94.88A8.218 8.218 0 0011.25 12c0 4.695 3.905 8.5 8.5 8.5.48 0 .955-.04 1.42-.12a.75.75 0 01.582 1.372z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={closeMenu}
                                className="flex h-10 w-10 items-center justify-center text-neutral-900"
                                aria-label="Close menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 flex flex-col justify-center px-6">
                        <div className="space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={`block ed-headline-md transition-colors ${
                                        isActive(item.href)
                                            ? 'text-neutral-900'
                                            : 'text-neutral-400 hover:text-neutral-900'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Menu Footer */}
                    <div className="px-6 py-8 border-t border-neutral-100">
                        <Link
                            href={actions.hireMe.href}
                            onClick={closeMenu}
                            className="ed-button-filled w-full"
                        >
                            {actions.hireMe.label}
                        </Link>
                        <div className="mt-6 flex items-center justify-center gap-6">
                            {socialLinks.filter((link) => link.showInMenu).map((link) => (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-400 hover:text-neutral-900 transition-colors"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="pt-16 md:pt-20">{children}</main>

            {/* Footer */}
            <footer className="border-t border-neutral-200 bg-neutral-50">
                <div className="ed-container">
                    {/* Main Footer Content */}
                    <div className="py-12 md:py-16">
                        <div className="grid gap-12 md:grid-cols-12">
                            {/* Brand Column */}
                            <div className="md:col-span-5">
                                <Link href="/" className="inline-block">
                                    <span className="font-serif text-2xl font-semibold text-neutral-900">
                                        {brand.name}
                                    </span>
                                </Link>
                                <p className="mt-4 ed-body text-neutral-600 max-w-sm">
                                    {brand.description}
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    {socialLinks.filter((link) => link.showInFooter).map((link) => (
                                        <a
                                            key={`footer-${link.key}`}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-400 hover:text-neutral-900 transition-colors"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Column */}
                            <div className="md:col-span-3">
                                <p className="ed-overline text-neutral-500 mb-4">Navigation</p>
                                <nav className="space-y-3">
                                    {navItems.map((item) => (
                                        <Link
                                            key={`footer-${item.href}`}
                                            href={item.href}
                                            className="block ed-body-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Contact Column */}
                            <div className="md:col-span-4">
                                <p className="ed-overline text-neutral-500 mb-4">Get in Touch</p>
                                <div className="space-y-3 ed-body-sm text-neutral-600">
                                    <p>{footer.contactEmail}</p>
                                    <p>{footer.location}</p>
                                </div>
                                <Link
                                    href={footer.cta.href}
                                    className="inline-block mt-6 ed-button"
                                >
                                    {footer.cta.label}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="py-6 border-t border-neutral-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="ed-caption text-neutral-500">
                                &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
                            </p>
                            <p className="ed-caption text-neutral-400">
                                {footer.note}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
