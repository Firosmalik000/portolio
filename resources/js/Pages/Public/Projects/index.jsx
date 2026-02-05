import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { projects as allProjects, getCategories, STATUS_LABELS, STATUS_COLORS } from '@/data/projects';

// ==================== ANIMATION VARIANTS ====================

// Smooth spring config
const smoothSpring = { type: 'spring', stiffness: 100, damping: 20 };
const bouncySpring = { type: 'spring', stiffness: 400, damping: 25 };
const gentleSpring = { type: 'spring', stiffness: 50, damping: 15 };

// Stagger containers
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const staggerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

// Text animations
const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

const wordSlideUp = {
    hidden: { opacity: 0, y: 100, skewY: 7 },
    visible: {
        opacity: 1,
        y: 0,
        skewY: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

// Fade variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

// Scale variants
const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
};

const popIn = {
    hidden: { opacity: 0, scale: 0, rotate: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: bouncySpring,
    },
};

// Slide variants
const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

// Image reveal
const imageReveal = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

const imageZoom = {
    hidden: { scale: 1.3 },
    visible: {
        scale: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
};

// Badge animations
const badgePop = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { ...bouncySpring, delay: 0.5 },
    },
};

// Line draw animation
const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

// Card hover
const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -8,
        transition: smoothSpring,
    },
};

// Tag stagger
const tagContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.3 },
    },
};

const tagItem = {
    hidden: { opacity: 0, scale: 0.5, x: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: bouncySpring,
    },
};

// ==================== COMPONENTS ====================

// Animated text component
const AnimatedTitle = ({ text, className }) => {
    return (
        <motion.span className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnimation}
                    className="inline-block"
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Parallax image component
const ParallaxImage = ({ src, alt, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className="w-full h-[120%] object-cover"
            />
        </div>
    );
};

// ==================== DATA ====================

const projectsDummy = {
    hero: {
        eyebrow: 'Portfolio',
        titleLines: ['Selected', 'Works'],
        subtitle:
            'A curated collection of projects that showcase my passion for creating meaningful digital experiences.',
    },
    cta: {
        eyebrow: 'Start a Project',
        title: "Have an idea? Let's bring it to life together.",
        subtitle:
            "I'm always excited to work on new and challenging projects. Whether you need a website, app, or complete digital experience, I'd love to hear about it.",
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop',
        primary: { label: 'Get in Touch', href: '/contact' },
        secondary: { label: 'hello@example.com', href: 'mailto:hello@example.com' },
    },
};

// ==================== MAIN COMPONENT ====================

export default function Projects() {
    const { hero, cta } = projectsDummy;
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);

    // Get data from centralized source
    const projects = allProjects;
    const categories = getCategories();

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    const featuredProjects = filteredProjects.filter(p => p.featured);
    const otherProjects = filteredProjects.filter(p => !p.featured);

    return (
        <>
            <Head>
                <title>Projects | Portfolio</title>
                <meta
                    name="description"
                    content="Explore my portfolio of web development, mobile apps, and UI/UX design projects."
                />
            </Head>

            {/* ==================== HERO ==================== */}
            <section className="relative overflow-hidden bg-[#faf8f5] pt-16 pb-24 lg:pt-24 lg:pb-32">
                {/* Animated Decorative Blobs */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="mag-blob mag-blob-warm w-[400px] h-[400px] -top-40 right-20"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    className="mag-blob mag-blob-sage w-[300px] h-[300px] bottom-0 -left-20"
                />

                <div className="ed-container relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        {/* Animated Line */}
                        <motion.div
                            variants={lineDraw}
                            className="mag-line-accent mb-8"
                        />

                        {/* Eyebrow with pop effect */}
                        <motion.p
                            variants={popIn}
                            className="ed-overline mag-accent-warm mb-4"
                        >
                            {hero.eyebrow}
                        </motion.p>

                        {/* Animated Title */}
                        <motion.h1
                            variants={staggerFast}
                            initial="hidden"
                            animate="visible"
                            className="mag-display text-neutral-900 mb-6"
                        >
                            <motion.span variants={wordSlideUp} className="block overflow-hidden">
                                <span className="block">{hero.titleLines[0]}</span>
                            </motion.span>
                            <motion.span variants={wordSlideUp} className="block overflow-hidden">
                                <span className="block italic font-light">{hero.titleLines[1]}</span>
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="ed-subhead text-neutral-600 max-w-xl"
                        >
                            {hero.subtitle}
                        </motion.p>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="mt-12 flex items-center gap-3"
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                                className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center pt-2"
                            >
                                <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                            </motion.div>
                            <span className="ed-caption text-neutral-400">Scroll to explore</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== FILTER ==================== */}
            <section className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4">
                <div className="ed-container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerFast}
                        className="flex flex-wrap gap-2 md:gap-3"
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                variants={popIn}
                                custom={index}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`ed-caption px-4 py-2 transition-colors duration-300 ${
                                    activeCategory === category
                                        ? 'bg-neutral-900 text-white'
                                        : 'bg-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================== FEATURED PROJECTS ==================== */}
            <AnimatePresence mode="wait">
                {featuredProjects.length > 0 && (
                    <motion.section
                        key="featured"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ed-section bg-white"
                    >
                        <div className="ed-container">
                            {/* Section Header */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }}
                                variants={staggerContainer}
                                className="flex items-center justify-between mb-12"
                            >
                                <motion.h2
                                    variants={slideFromLeft}
                                    className="ed-headline-sm text-neutral-900"
                                >
                                    Featured Projects
                                </motion.h2>
                                <motion.span
                                    variants={slideFromRight}
                                    className="ed-caption text-neutral-400"
                                >
                                    {featuredProjects.length} {featuredProjects.length === 1 ? 'project' : 'projects'}
                                </motion.span>
                            </motion.div>

                            {/* Projects List */}
                            <div className="space-y-24">
                                {featuredProjects.map((project, index) => (
                                    <motion.article
                                        key={project.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ amount: 0.2 }}
                                        variants={staggerContainer}
                                        className="group"
                                    >
                                        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                                            index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                                        }`}>
                                            {/* Image */}
                                            <motion.div
                                                variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                                                className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={smoothSpring}
                                                    className="relative overflow-hidden"
                                                >
                                                    {/* Frame offset with animation */}
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20, y: 20 }}
                                                        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
                                                        viewport={{ amount: 0.3 }}
                                                        transition={{ delay: 0.3, duration: 0.8 }}
                                                        className="absolute -bottom-4 -right-4 w-full h-full"
                                                        style={{ backgroundColor: project.color }}
                                                    />

                                                    {/* Image container with reveal */}
                                                    <motion.div
                                                        variants={imageReveal}
                                                        className="relative aspect-[4/3] overflow-hidden"
                                                    >
                                                        <motion.img
                                                            variants={imageZoom}
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                    </motion.div>

                                                    {/* Year Badge */}
                                                    <motion.div
                                                        variants={badgePop}
                                                        className="absolute top-4 left-4 text-white px-4 py-2"
                                                        style={{ backgroundColor: project.color }}
                                                    >
                                                        <span className="ed-caption font-medium">{project.year}</span>
                                                    </motion.div>

                                                    {/* Status Badge */}
                                                    <motion.div
                                                        variants={badgePop}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium text-white rounded-full"
                                                        style={{ backgroundColor: STATUS_COLORS[project.status] }}
                                                    >
                                                        {STATUS_LABELS[project.status]}
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>

                                            {/* Content */}
                                            <motion.div
                                                variants={index % 2 === 0 ? slideFromRight : slideFromLeft}
                                                className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}
                                            >
                                                {/* Number */}
                                                <motion.span
                                                    initial={{ opacity: 0, scale: 2 }}
                                                    whileInView={{ opacity: 0.2, scale: 1 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                                    className="mag-number"
                                                >
                                                    {String(index + 1).padStart(2, '0')}
                                                </motion.span>

                                                {/* Category */}
                                                <motion.p
                                                    variants={fadeUp}
                                                    className="ed-overline text-neutral-500 mb-3 -mt-6"
                                                >
                                                    {project.category}
                                                </motion.p>

                                                {/* Title */}
                                                <motion.h3
                                                    variants={fadeUp}
                                                    className="ed-headline-lg text-neutral-900 group-hover:text-[#c9a66b] transition-colors mb-4"
                                                >
                                                    {project.title}
                                                </motion.h3>

                                                {/* Description */}
                                                <motion.p
                                                    variants={fadeUp}
                                                    className="ed-body text-neutral-600 mb-6"
                                                >
                                                    {project.description}
                                                </motion.p>

                                                {/* Tags */}
                                                <motion.div
                                                    variants={tagContainer}
                                                    className="flex flex-wrap gap-2 mb-8"
                                                >
                                                    {project.tags.map((tag) => (
                                                        <motion.span
                                                            key={tag}
                                                            variants={tagItem}
                                                            whileHover={{ scale: 1.1, y: -2 }}
                                                            className="mag-tag-outline cursor-default"
                                                            style={{ borderColor: project.color, color: project.color }}
                                                        >
                                                            {tag}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>

                                                {/* Link */}
                                                <motion.div variants={fadeUp}>
                                                    <Link
                                                        href={`/projects/${project.id}`}
                                                        className="inline-flex items-center gap-2 ed-body-sm text-neutral-900 group/link"
                                                    >
                                                        <span>View Case Study</span>
                                                        <motion.svg
                                                            initial={{ x: 0 }}
                                                            whileHover={{ x: 8 }}
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </motion.svg>
                                                    </Link>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Animated Divider */}
            {featuredProjects.length > 0 && otherProjects.length > 0 && (
                <div className="ed-container">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="ed-divider origin-left"
                    />
                </div>
            )}

            {/* ==================== OTHER PROJECTS GRID ==================== */}
            <AnimatePresence mode="wait">
                {otherProjects.length > 0 && (
                    <motion.section
                        key="other"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ed-section mag-bg-cream"
                    >
                        <div className="ed-container">
                            {/* Section Header */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.3 }}
                                variants={staggerContainer}
                                className="flex items-center justify-between mb-12"
                            >
                                <motion.h2
                                    variants={slideFromLeft}
                                    className="ed-headline-sm text-neutral-900"
                                >
                                    More Projects
                                </motion.h2>
                                <motion.span
                                    variants={slideFromRight}
                                    className="ed-caption text-neutral-400"
                                >
                                    {otherProjects.length} {otherProjects.length === 1 ? 'project' : 'projects'}
                                </motion.span>
                            </motion.div>

                            {/* Grid */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.1 }}
                                variants={staggerContainer}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {otherProjects.map((project, index) => (
                                    <motion.article
                                        key={project.id}
                                        variants={scaleUp}
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                        onHoverStart={() => setHoveredProject(project.id)}
                                        onHoverEnd={() => setHoveredProject(null)}
                                        className="group bg-white cursor-pointer"
                                    >
                                        <motion.div
                                            variants={cardHover}
                                            className="relative overflow-hidden aspect-[4/3]"
                                        >
                                            {/* Image with zoom */}
                                            <motion.img
                                                src={project.image}
                                                alt={project.title}
                                                initial={{ scale: 1 }}
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ amount: 0.3 }}
                                                transition={{ delay: index * 0.1 + 0.3 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium text-white rounded-full"
                                                style={{ backgroundColor: STATUS_COLORS[project.status] }}
                                            >
                                                {STATUS_LABELS[project.status]}
                                            </motion.div>

                                            {/* Overlay Content */}
                                            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                                <motion.span
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ delay: index * 0.1 + 0.2 }}
                                                    className="inline-block self-start px-3 py-1 text-xs font-medium mb-3"
                                                    style={{ backgroundColor: project.color }}
                                                >
                                                    {project.category}
                                                </motion.span>

                                                <motion.h3
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ delay: index * 0.1 + 0.3 }}
                                                    className="ed-headline-md mb-2"
                                                >
                                                    {project.title}
                                                </motion.h3>

                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 0.8 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ delay: index * 0.1 + 0.4 }}
                                                    className="ed-body-sm text-white/80 line-clamp-2"
                                                >
                                                    {project.description}
                                                </motion.p>
                                            </div>

                                            {/* Hover Arrow */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                                whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                                                transition={bouncySpring}
                                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white text-neutral-900"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                                </svg>
                                            </motion.div>

                                            {/* Hover overlay effect */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/20 pointer-events-none"
                                            />
                                        </motion.div>

                                        {/* Tags */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ amount: 0.3 }}
                                            transition={{ delay: index * 0.1 + 0.5 }}
                                            className="p-4 flex flex-wrap gap-2"
                                        >
                                            {project.tags.map((tag, tagIndex) => (
                                                <motion.span
                                                    key={tag}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ delay: index * 0.1 + 0.5 + tagIndex * 0.05 }}
                                                    whileHover={{ scale: 1.1, color: project.color }}
                                                    className="ed-caption text-neutral-500 cursor-default"
                                                >
                                                    #{tag}
                                                </motion.span>
                                            ))}
                                            <span className="ed-caption text-neutral-400 ml-auto">{project.year}</span>
                                        </motion.div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Empty State */}
            <AnimatePresence mode="wait">
                {filteredProjects.length === 0 && (
                    <motion.section
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="ed-section bg-white"
                    >
                        <div className="ed-container text-center py-16">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={bouncySpring}
                                className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center"
                            >
                                <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="ed-body text-neutral-500 mb-4"
                            >
                                No projects found in this category.
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory('All')}
                                className="ed-button"
                            >
                                View All Projects
                            </motion.button>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* ==================== CTA ==================== */}
            <section className="relative overflow-hidden">
                <div className="grid lg:grid-cols-2">
                    {/* Image with parallax */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[300px] lg:h-auto overflow-hidden"
                    >
                        <ParallaxImage
                            src={cta.image}
                            alt="Let's work together"
                            className="absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="bg-neutral-900 p-8 lg:p-16 flex flex-col justify-center"
                    >
                        <motion.div variants={lineDraw} className="mag-line-accent bg-[#c9a66b] mb-8" />

                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            {cta.eyebrow}
                        </motion.p>

                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-white mb-6">
                            {cta.title}
                        </motion.h2>

                        <motion.p variants={fadeUp} className="ed-body text-neutral-400 mb-8">
                            {cta.subtitle}
                        </motion.p>

                        <motion.div variants={tagContainer} className="flex flex-wrap gap-4">
                            <motion.div variants={tagItem}>
                                <Link
                                    href={cta.primary.href}
                                    className="ed-button border-white text-white hover:bg-white hover:text-neutral-900"
                                >
                                    <motion.span
                                        whileHover={{ x: 5 }}
                                        className="inline-block"
                                    >
                                        {cta.primary.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                            <motion.div variants={tagItem}>
                                <a
                                    href={cta.secondary.href}
                                    className="ed-button border-[#c9a66b] text-[#c9a66b] hover:bg-[#c9a66b] hover:text-white"
                                >
                                    <motion.span
                                        whileHover={{ x: 5 }}
                                        className="inline-block"
                                    >
                                        {cta.secondary.label}
                                    </motion.span>
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
