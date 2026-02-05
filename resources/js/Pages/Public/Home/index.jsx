import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { getLandingProjects, STATUS_LABELS, STATUS_COLORS } from '@/data/projects';

// ==================== ANIMATION VARIANTS ====================

const smoothSpring = { type: 'spring', stiffness: 100, damping: 20 };
const bouncySpring = { type: 'spring', stiffness: 400, damping: 25 };

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const staggerFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

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

const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

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

const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
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

const badgePop = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { ...bouncySpring, delay: 0.5 },
    },
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -8, transition: smoothSpring },
};

// ==================== COMPONENTS ====================

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

// Counter animation component
const AnimatedCounter = ({ value, label }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-center"
        >
            <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={bouncySpring}
                className="font-serif text-5xl md:text-6xl text-[#c9a66b]"
            >
                {value}
            </motion.p>
            <p className="mt-2 ed-body-sm text-neutral-400">{label}</p>
        </motion.div>
    );
};

// ==================== DATA ====================

const homeDummy = {
    hero: {
        eyebrow: 'Creative Developer & Designer',
        titleLines: ['Digital', 'Artisan'],
        subtitle: 'Crafting bespoke digital experiences where aesthetics meet functionality. Every pixel tells a story.',
        ctas: [
            { label: 'Explore Work', href: '/projects', variant: 'filled' },
            { label: 'About Me', href: '/about', variant: 'outline' },
        ],
        stats: [
            { value: '8+', label: 'Years' },
            { value: '50+', label: 'Projects' },
            { value: '30+', label: 'Clients' },
        ],
        images: {
            main: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face',
            floating: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        },
    },
    marquee: [
        'Web Development',
        'UI/UX Design',
        'Mobile Apps',
        'Brand Identity',
    ],
    aboutTeaser: {
        eyebrow: 'About Me',
        title: 'Passionate about creating meaningful digital experiences',
        body: "With over 8 years of experience in web development and design, I specialize in building products that are not only beautiful but also functional and user-friendly. Every project is an opportunity to push boundaries and create something extraordinary.",
        quote: {
            text: "Design is not just what it looks like—it's how it works.",
            author: 'Steve Jobs',
        },
        cta: { label: 'Learn More About Me', href: '/about' },
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
    },
    services: [
        { number: '01', title: 'Web Development', desc: 'Modern, fast, and scalable web applications' },
        { number: '02', title: 'UI/UX Design', desc: 'Human-centered design with attention to detail' },
        { number: '03', title: 'Mobile Apps', desc: 'Native and cross-platform mobile solutions' },
        { number: '04', title: 'Brand Identity', desc: 'Visual systems that tell your story' },
    ],
    galleryImages: [
        { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop', alt: 'Coding' },
        { src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=800&fit=crop', alt: 'Design' },
        { src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop', alt: 'Creative' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop', alt: 'Dashboard' },
    ],
    stats: [
        { value: '50+', label: 'Projects Delivered' },
        { value: '8', label: 'Years Experience' },
        { value: '30+', label: 'Happy Clients' },
        { value: '12', label: 'Awards Won' },
    ],
    cta: {
        eyebrow: "Let's Collaborate",
        titleLines: ['Ready to bring your', 'vision to life?'],
        subtitle: "Whether you have a project in mind or just want to chat, I'd love to hear from you. Let's create something amazing together.",
        primary: { label: 'Start a Project', href: '/contact' },
        secondary: { label: 'hello@example.com', href: 'mailto:hello@example.com' },
    },
};

// ==================== MAIN COMPONENT ====================

export default function Home() {
    const {
        hero,
        marquee,
        aboutTeaser,
        services,
        galleryImages,
        stats,
        cta,
    } = homeDummy;

    const featuredProjects = getLandingProjects();

    return (
        <>
            <Head>
                <title>Portfolio | Creative Developer & Designer</title>
                <meta
                    name="description"
                    content="Full-stack developer & designer crafting digital experiences with attention to detail, clean code, and thoughtful design."
                />
            </Head>

            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-screen overflow-hidden bg-[#faf8f5]">
                {/* Animated Decorative Blobs */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="mag-blob mag-blob-warm w-[500px] h-[500px] -top-40 -right-40"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    className="mag-blob mag-blob-sage w-[400px] h-[400px] bottom-20 -left-40"
                />

                {/* Decorative Lines */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute top-1/2 left-8 mag-line-vertical hidden lg:block origin-top"
                />
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="absolute top-1/2 right-8 mag-line-vertical hidden lg:block origin-top"
                />

                <div className="ed-container relative z-10 pt-20 pb-16 lg:pt-32 lg:pb-24">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center min-h-[80vh]">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-5 order-2 lg:order-1"
                        >
                            <motion.div variants={lineDraw} className="mag-line-accent mb-8" />

                            <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-4">
                                {hero.eyebrow}
                            </motion.p>

                            {/* Animated Title */}
                            <motion.h1
                                variants={staggerFast}
                                className="mag-display text-neutral-900 mb-6"
                            >
                                <motion.span variants={wordSlideUp} className="block overflow-hidden">
                                    <span className="block">{hero.titleLines[0]}</span>
                                </motion.span>
                                <motion.span variants={wordSlideUp} className="block overflow-hidden">
                                    <span className="block italic font-light">{hero.titleLines[1]}</span>
                                </motion.span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="ed-subhead text-neutral-600 max-w-md mb-8">
                                {hero.subtitle}
                            </motion.p>

                            <motion.div variants={staggerFast} className="flex flex-wrap gap-4">
                                {hero.ctas.map((ctaItem) => (
                                    <motion.div key={ctaItem.label} variants={popIn}>
                                        <Link
                                            href={ctaItem.href}
                                            className={ctaItem.variant === 'filled' ? 'ed-button-filled' : 'ed-button'}
                                        >
                                            <motion.span
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="inline-block"
                                            >
                                                {ctaItem.label}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Mini Stats */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-3 gap-6"
                            >
                                {hero.stats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ amount: 0.5 }}
                                        transition={{ delay: index * 0.1, ...bouncySpring }}
                                    >
                                        <motion.p
                                            initial={{ scale: 0.5 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ amount: 0.5 }}
                                            transition={{ delay: index * 0.1 + 0.2, ...bouncySpring }}
                                            className="font-serif text-3xl text-neutral-900"
                                        >
                                            {stat.value}
                                        </motion.p>
                                        <p className="ed-caption text-neutral-500 mt-1">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right - Hero Images */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-7 order-1 lg:order-2 relative"
                        >
                            <div className="relative">
                                {/* Main Large Image */}
                                <motion.div
                                    variants={slideFromRight}
                                    className="relative z-20"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={smoothSpring}
                                        className="mag-frame-offset"
                                    >
                                        <motion.div
                                            variants={imageReveal}
                                            className="mag-image-cover aspect-[4/5] lg:aspect-[3/4] overflow-hidden"
                                        >
                                            <motion.img
                                                variants={imageZoom}
                                                src={hero.images.main}
                                                alt="Portrait"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 mag-gradient-dark" />
                                        </motion.div>
                                    </motion.div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        variants={badgePop}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="absolute -bottom-4 -left-4 lg:-left-8 z-30 mag-glass p-4 lg:p-6"
                                    >
                                        <p className="ed-overline text-neutral-500 mb-1">Available for</p>
                                        <p className="font-serif text-lg lg:text-xl text-neutral-900">New Projects</p>
                                    </motion.div>
                                </motion.div>

                                {/* Secondary Image - Floating */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, rotate: 10 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ ...bouncySpring, delay: 0.3 }}
                                    whileHover={{ rotate: -5, scale: 1.1 }}
                                    className="absolute -top-8 -right-4 lg:-right-12 w-32 lg:w-48 z-10 hidden md:block"
                                >
                                    <div className="aspect-square overflow-hidden border-4 border-white shadow-xl">
                                        <img
                                            src={hero.images.floating}
                                            alt="Work"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                {/* Decorative Circle */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="absolute top-1/2 -left-20 w-40 h-40 mag-shape-circle hidden lg:block"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <p className="ed-caption text-neutral-400">Scroll to explore</p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ==================== MARQUEE TEXT ==================== */}
            <section className="py-6 bg-neutral-900 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.5 }}
                    className="mag-marquee"
                >
                    <div className="mag-marquee-content">
                        {[...Array(4)].map((_, i) => (
                            <span key={i} className="flex items-center gap-8 px-8 text-white/80">
                                {marquee.map((item) => (
                                    <span key={`${i}-${item}`} className="flex items-center gap-8">
                                        <span className="font-serif text-2xl">{item}</span>
                                        <motion.span
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                                            className="w-2 h-2 rounded-full bg-[#c9a66b]"
                                        />
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ==================== FEATURED WORK ==================== */}
            <section className="ed-section bg-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 mag-pattern-dots pointer-events-none" />

                <div className="ed-container relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                    >
                        <div>
                            <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-3">
                                Selected Work
                            </motion.p>
                            <motion.h2 variants={fadeUp} className="mag-display-sm text-neutral-900">
                                Featured<br />Projects
                            </motion.h2>
                        </div>
                        <motion.div variants={popIn}>
                            <Link href="/projects" className="ed-button">
                                <motion.span whileHover={{ x: 5 }} className="inline-block">
                                    View All Projects
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Projects Grid - Magazine Layout */}
                    <div className="grid gap-8 lg:gap-12">
                        {/* First Project - Full Width */}
                        {featuredProjects[0] && (
                            <motion.article
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ amount: 0.2 }}
                                variants={staggerContainer}
                                className="group"
                            >
                                <Link href={`/projects/${featuredProjects[0].id}`} className="block">
                                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                                        <motion.div variants={slideFromLeft} className="relative">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={smoothSpring}
                                                className="relative overflow-hidden"
                                            >
                                                {/* Frame offset */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                                    whileInView={{ opacity: 0.3, x: 0, y: 0 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="absolute -bottom-4 -right-4 w-full h-full"
                                                    style={{ backgroundColor: featuredProjects[0].color }}
                                                />

                                                <motion.div
                                                    variants={imageReveal}
                                                    className="mag-image-cover aspect-[4/3] overflow-hidden relative"
                                                >
                                                    <motion.img
                                                        variants={imageZoom}
                                                        src={featuredProjects[0].image}
                                                        alt={featuredProjects[0].title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                </motion.div>

                                                {/* Year Badge */}
                                                <motion.div
                                                    variants={badgePop}
                                                    className="absolute top-4 left-4 text-white px-4 py-2"
                                                    style={{ backgroundColor: featuredProjects[0].color }}
                                                >
                                                    <span className="ed-caption font-medium">{featuredProjects[0].year}</span>
                                                </motion.div>

                                                {/* Status Badge */}
                                                <motion.div
                                                    variants={badgePop}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium text-white rounded-full"
                                                    style={{ backgroundColor: STATUS_COLORS[featuredProjects[0].status] }}
                                                >
                                                    {STATUS_LABELS[featuredProjects[0].status]}
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div variants={slideFromRight} className="lg:pl-8">
                                            <motion.span
                                                initial={{ opacity: 0, scale: 2 }}
                                                whileInView={{ opacity: 0.2, scale: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ duration: 0.6 }}
                                                className="mag-number"
                                            >
                                                01
                                            </motion.span>
                                            <motion.p variants={fadeUp} className="ed-overline text-neutral-500 mb-3 -mt-4">
                                                {featuredProjects[0].category}
                                            </motion.p>
                                            <motion.h3
                                                variants={fadeUp}
                                                className="ed-headline-lg text-neutral-900 group-hover:text-[#c9a66b] transition-colors"
                                            >
                                                {featuredProjects[0].title}
                                            </motion.h3>
                                            <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600 max-w-md">
                                                {featuredProjects[0].description}
                                            </motion.p>
                                            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2 ed-body-sm text-neutral-900">
                                                <span>View Project</span>
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
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </Link>
                            </motion.article>
                        )}

                        {/* Animated Divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="ed-divider origin-left"
                        />

                        {/* Second & Third Projects - Two Column */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 gap-8 lg:gap-12"
                        >
                            {featuredProjects.slice(1).map((project, index) => (
                                <motion.article
                                    key={project.id}
                                    variants={scaleUp}
                                    initial="rest"
                                    whileHover="hover"
                                    animate="rest"
                                    className="group"
                                >
                                    <Link href={`/projects/${project.id}`} className="block">
                                        <motion.div variants={cardHover} className="relative mb-6">
                                            <motion.div
                                                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                                                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                                viewport={{ amount: 0.3 }}
                                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                                className="mag-image-cover aspect-[4/5] overflow-hidden"
                                            >
                                                <motion.img
                                                    initial={{ scale: 1.2 }}
                                                    whileInView={{ scale: 1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    viewport={{ amount: 0.3 }}
                                                    transition={{ duration: 0.8 }}
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            </motion.div>

                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ ...bouncySpring, delay: 0.3 + index * 0.1 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium text-white rounded-full"
                                                style={{ backgroundColor: STATUS_COLORS[project.status] }}
                                            >
                                                {STATUS_LABELS[project.status]}
                                            </motion.div>

                                            {/* Overlay Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <motion.span
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ amount: 0.5 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                    className="mag-tag mb-3"
                                                >
                                                    {project.category}
                                                </motion.span>
                                                <motion.h3
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ amount: 0.5 }}
                                                    transition={{ delay: 0.3 + index * 0.1 }}
                                                    className="ed-headline-md"
                                                >
                                                    {project.title}
                                                </motion.h3>
                                            </div>
                                        </motion.div>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ amount: 0.5 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="ed-body-sm text-neutral-600"
                                        >
                                            {project.description}
                                        </motion.p>
                                    </Link>
                                </motion.article>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== ABOUT TEASER ==================== */}
            <section className="relative overflow-hidden">
                <div className="grid lg:grid-cols-2">
                    {/* Left - Image with Parallax */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={slideFromLeft}
                        className="relative h-[400px] lg:h-auto overflow-hidden"
                    >
                        <ParallaxImage
                            src={aboutTeaser.image}
                            alt="Working"
                            className="absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/20" />

                        {/* Floating Stats */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.5 }}
                            variants={staggerFast}
                            className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4"
                        >
                            <motion.div
                                variants={popIn}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="mag-glass-dark p-4 text-center"
                            >
                                <motion.p
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={bouncySpring}
                                    className="font-serif text-3xl text-white"
                                >
                                    50+
                                </motion.p>
                                <p className="ed-caption text-white/70">Projects</p>
                            </motion.div>
                            <motion.div
                                variants={popIn}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="mag-glass-dark p-4 text-center"
                            >
                                <motion.p
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ ...bouncySpring, delay: 0.1 }}
                                    className="font-serif text-3xl text-white"
                                >
                                    8+
                                </motion.p>
                                <p className="ed-caption text-white/70">Years</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="bg-neutral-900 p-8 lg:p-16 flex flex-col justify-center"
                    >
                        <motion.div variants={lineDraw} className="mag-line-accent bg-[#c9a66b] mb-8" />

                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            {aboutTeaser.eyebrow}
                        </motion.p>

                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-white mb-6">
                            {aboutTeaser.title}
                        </motion.h2>

                        <motion.p variants={fadeUp} className="ed-body text-neutral-400 mb-8">
                            {aboutTeaser.body}
                        </motion.p>

                        <motion.blockquote
                            variants={fadeUp}
                            className="border-l-2 border-[#c9a66b] pl-6 mb-8"
                        >
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ delay: 0.3 }}
                                className="font-serif text-xl italic text-white/90"
                            >
                                "{aboutTeaser.quote.text}"
                            </motion.p>
                            <footer className="mt-2 ed-caption text-neutral-500">— {aboutTeaser.quote.author}</footer>
                        </motion.blockquote>

                        <motion.div variants={popIn}>
                            <Link
                                href={aboutTeaser.cta.href}
                                className="ed-button border-white text-white hover:bg-white hover:text-neutral-900 self-start"
                            >
                                <motion.span whileHover={{ x: 5 }} className="inline-block">
                                    {aboutTeaser.cta.label}
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ==================== SERVICES ==================== */}
            <section className="ed-section mag-bg-cream relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.3 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="mag-blob mag-blob-warm w-[300px] h-[300px] top-20 right-20"
                />

                <div className="ed-container relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        {/* Left - Sticky Header */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-4 lg:sticky lg:top-32"
                        >
                            <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-4">
                                What I Do
                            </motion.p>
                            <motion.h2 variants={fadeUp} className="mag-display-sm text-neutral-900 mb-6">
                                Services
                            </motion.h2>
                            <motion.p variants={fadeUp} className="ed-body text-neutral-600 mb-8">
                                From concept to launch, I provide end-to-end solutions
                                tailored to your unique needs.
                            </motion.p>
                            <motion.div variants={popIn}>
                                <Link href="/contact" className="ed-button-filled">
                                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                                        Start a Project
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right - Services List */}
                        <div className="lg:col-span-8">
                            <div className="space-y-0">
                                {services.map((service, index) => (
                                    <motion.div
                                        key={service.number}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ amount: 0.3 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        whileHover={{ x: 10, backgroundColor: 'rgba(201, 166, 107, 0.05)' }}
                                        className="group py-8 border-b border-neutral-200 px-6 -mx-6 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-start gap-6">
                                            <motion.span
                                                initial={{ opacity: 0.3 }}
                                                whileHover={{ opacity: 1, scale: 1.1 }}
                                                className="font-serif text-4xl text-[#c9a66b] transition-all"
                                            >
                                                {service.number}
                                            </motion.span>
                                            <div className="flex-1">
                                                <h3 className="ed-headline-md text-neutral-900 mb-2 group-hover:text-[#c9a66b] transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="ed-body text-neutral-600">
                                                    {service.desc}
                                                </p>
                                            </div>
                                            <motion.svg
                                                initial={{ x: 0, opacity: 0.5 }}
                                                whileHover={{ x: 10, opacity: 1 }}
                                                className="w-6 h-6 text-[#c9a66b] transition-all"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </motion.svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== GALLERY MOSAIC ==================== */}
            <section className="ed-section bg-white">
                <div className="ed-container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center mb-12"
                    >
                        <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-3">
                            Visual Journey
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                            Behind The Scenes
                        </motion.h2>
                    </motion.div>

                    {/* Mosaic Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        <motion.div
                            variants={scaleUp}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            className="col-span-2 row-span-2"
                        >
                            <motion.div
                                initial={{ clipPath: 'inset(0% 50% 50% 0%)' }}
                                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                                viewport={{ amount: 0.3 }}
                                transition={{ duration: 0.8 }}
                                className="mag-image-cover aspect-square h-full overflow-hidden"
                            >
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={galleryImages[0].src}
                                    alt={galleryImages[0].alt}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>
                        {galleryImages.slice(1).map((image, index) => (
                            <motion.div
                                key={image.alt}
                                variants={scaleUp}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className={index === 2 ? 'col-span-2' : ''}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`mag-image-cover ${index === 2 ? 'aspect-[2/1]' : 'aspect-square'} overflow-hidden`}
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================== STATS SECTION ==================== */}
            <section className="py-16 bg-neutral-900 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute inset-0 mag-pattern-grid opacity-20" />

                <div className="ed-container relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="ed-section bg-[#faf8f5] relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="mag-blob mag-blob-warm w-[400px] h-[400px] -bottom-40 -right-40 opacity-30"
                />
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mag-blob mag-blob-sage w-[300px] h-[300px] top-20 -left-20 opacity-20"
                />

                <div className="ed-container relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div variants={lineDraw} className="mag-line-accent mx-auto mb-8" />

                        <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-4">
                            {cta.eyebrow}
                        </motion.p>

                        <motion.h2 variants={fadeUp} className="mag-display-sm text-neutral-900 mb-6">
                            {cta.titleLines[0]}
                            <br />
                            <span className="italic">{cta.titleLines[1]}</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="ed-subhead text-neutral-600 mb-10 max-w-xl mx-auto">
                            {cta.subtitle}
                        </motion.p>

                        <motion.div variants={staggerFast} className="flex flex-wrap justify-center gap-4">
                            <motion.div variants={popIn}>
                                <Link href={cta.primary.href} className="ed-button-filled">
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block"
                                    >
                                        {cta.primary.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                            <motion.div variants={popIn}>
                                <a href={cta.secondary.href} className="ed-button">
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
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
