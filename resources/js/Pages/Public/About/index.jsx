import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
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
    hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const lineDrawVertical = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, transition: smoothSpring },
};

const dotPulse = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: bouncySpring,
    },
};

// ==================== COMPONENTS ====================

const ParallaxImage = ({ src, alt, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale }}
                className="w-full h-[120%] object-cover"
            />
        </div>
    );
};

// ==================== DATA ====================

const aboutDummy = {
    hero: {
        eyebrow: 'About Me',
        title: 'Building digital products with purpose',
        body: [
            "I'm a full-stack developer and designer based in Jakarta, Indonesia. With over 8 years of experience in the tech industry, I've had the privilege of working with startups, agencies, and enterprises to bring their digital visions to life.",
            "My passion lies in creating elegant solutions to complex problems. I believe that great software is not just about functionality—it's about crafting experiences that are intuitive, accessible, and delightful to use.",
        ],
        ctas: [
            { label: 'Get in Touch', href: '/contact', variant: 'filled' },
            { label: 'Download Resume', href: '/resume.pdf', variant: 'outline' },
        ],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=face',
    },
    values: [
        {
            icon: '01',
            title: 'Clean Code',
            description: 'Writing maintainable, readable, and well-documented code that stands the test of time.',
        },
        {
            icon: '02',
            title: 'User-Centric',
            description: 'Designing with empathy, always putting the end-user experience at the forefront.',
        },
        {
            icon: '03',
            title: 'Continuous Learning',
            description: 'Staying current with emerging technologies and best practices in the industry.',
        },
        {
            icon: '04',
            title: 'Collaboration',
            description: 'Working effectively with teams, clients, and stakeholders to achieve shared goals.',
        },
    ],
    experience: [
        {
            id: 1,
            role: 'Senior Full-Stack Developer',
            company: 'TechCorp Inc.',
            period: '2022 - Present',
            description: 'Leading development of enterprise-scale web applications. Managing a team of 5 developers and implementing best practices for code quality and performance.',
        },
        {
            id: 2,
            role: 'Full-Stack Developer',
            company: 'Digital Agency',
            period: '2019 - 2022',
            description: 'Built custom web solutions for clients across various industries. Specialized in React, Node.js, and modern web technologies.',
        },
        {
            id: 3,
            role: 'Frontend Developer',
            company: 'StartupXYZ',
            period: '2017 - 2019',
            description: 'Developed responsive user interfaces and improved website performance. Collaborated closely with designers to implement pixel-perfect designs.',
        },
        {
            id: 4,
            role: 'Junior Developer',
            company: 'Web Studio',
            period: '2016 - 2017',
            description: 'Started my career building websites and learning modern development practices. Gained foundational skills in HTML, CSS, JavaScript, and PHP.',
        },
    ],
    techStack: {
        frontend: [
            { name: 'React', level: 95 },
            { name: 'Next.js', level: 90 },
            { name: 'Vue.js', level: 85 },
            { name: 'TypeScript', level: 88 },
            { name: 'Tailwind CSS', level: 95 },
        ],
        backend: [
            { name: 'Node.js', level: 90 },
            { name: 'Laravel', level: 92 },
            { name: 'Python', level: 80 },
            { name: 'PostgreSQL', level: 85 },
            { name: 'MongoDB', level: 82 },
        ],
        tools: [
            { name: 'Git', level: 95 },
            { name: 'Docker', level: 85 },
            { name: 'AWS', level: 80 },
            { name: 'Figma', level: 88 },
            { name: 'VS Code', level: 95 },
        ],
    },
    quote: {
        text: "The best code is not just functional—it tells a story, solves a problem, and creates value for people.",
        author: 'My Development Philosophy',
    },
    cta: {
        eyebrow: "Let's Connect",
        title: 'Ready to start a project?',
        subtitle: "I'm always excited to hear about new opportunities and interesting projects. Whether you have a question or just want to say hi, feel free to reach out.",
        actions: [
            { label: 'Start a Conversation', href: '/contact', variant: 'filled' },
            { label: 'View My Work', href: '/projects', variant: 'outline' },
        ],
    },
};

// ==================== MAIN COMPONENT ====================

export default function About() {
    const { hero, values, experience, techStack, quote, cta } = aboutDummy;

    return (
        <>
            <Head>
                <title>About | Portfolio</title>
                <meta
                    name="description"
                    content="Learn about my journey as a full-stack developer, my experience, and the technologies I work with."
                />
            </Head>

            {/* ==================== HERO SECTION ==================== */}
            <section className="ed-section bg-white relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#c9a66b]"
                />

                <div className="ed-container relative z-10">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={lineDraw} className="w-16 h-1 bg-[#c9a66b] mb-8" />

                            <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                                {hero.eyebrow}
                            </motion.p>

                            <motion.h1 variants={fadeUp} className="ed-headline-xl text-neutral-900">
                                {hero.title}
                            </motion.h1>

                            {hero.body.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    variants={fadeUp}
                                    className="mt-4 ed-body text-neutral-600"
                                >
                                    {paragraph}
                                </motion.p>
                            ))}

                            <motion.div variants={staggerFast} className="mt-8 flex flex-wrap gap-4">
                                {hero.ctas.map((ctaItem, index) => (
                                    <motion.div key={ctaItem.label} variants={popIn}>
                                        <Link
                                            href={ctaItem.href}
                                            className={ctaItem.variant === 'filled' ? 'ed-button-filled' : 'ed-button'}
                                        >
                                            <motion.span
                                                whileHover={{ x: 5 }}
                                                className="inline-block"
                                            >
                                                {ctaItem.label}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={slideFromRight}
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={smoothSpring}
                                className="relative"
                            >
                                {/* Frame offset */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute -bottom-4 -right-4 w-full h-full bg-[#c9a66b]/20"
                                />
                                <motion.div
                                    variants={imageReveal}
                                    className="ed-image-frame aspect-[4/5] bg-neutral-100 relative overflow-hidden"
                                >
                                    <img
                                        src={hero.image}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {/* Floating badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ amount: 0.3 }}
                                    transition={{ ...bouncySpring, delay: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-neutral-900 text-white p-6"
                                >
                                    <p className="font-serif text-3xl">8+</p>
                                    <p className="ed-caption text-neutral-400">Years Experience</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Animated Divider */}
            <div className="ed-container">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="ed-divider-dark origin-left"
                />
            </div>

            {/* ==================== VALUES SECTION ==================== */}
            <section className="ed-section bg-white">
                <div className="ed-container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="max-w-2xl mb-16"
                    >
                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            Philosophy
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                            What drives my work
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.2 }}
                        variants={staggerContainer}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                variants={scaleUp}
                                whileHover={{ y: -10, transition: smoothSpring }}
                                className="group relative"
                            >
                                {/* Top line with animation */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="h-0.5 bg-gradient-to-r from-[#c9a66b] to-transparent mb-6 origin-left"
                                />

                                {/* Number */}
                                <motion.span
                                    initial={{ opacity: 0, scale: 2 }}
                                    whileInView={{ opacity: 0.1, scale: 1 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="absolute -top-2 right-0 font-serif text-6xl text-neutral-900"
                                >
                                    {value.icon}
                                </motion.span>

                                <h3 className="ed-headline-sm text-neutral-900 mb-3 group-hover:text-[#c9a66b] transition-colors">
                                    {value.title}
                                </h3>
                                <p className="ed-body-sm text-neutral-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==================== EXPERIENCE SECTION ==================== */}
            <section className="ed-section bg-[#faf8f5] relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ amount: 0.3 }}
                    className="absolute top-20 right-20 font-serif text-[300px] text-neutral-900 leading-none pointer-events-none"
                >
                    XP
                </motion.div>

                <div className="ed-container relative z-10">
                    <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
                        {/* Left - Header */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:sticky lg:top-32 lg:self-start"
                        >
                            <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                                Experience
                            </motion.p>
                            <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                                Professional Journey
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600">
                                A timeline of my career growth and the companies I've had
                                the pleasure to work with.
                            </motion.p>
                        </motion.div>

                        {/* Right - Timeline */}
                        <div className="relative">
                            {/* Animated timeline line */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ amount: 0.1 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute left-0 top-0 bottom-0 w-px bg-neutral-300 origin-top"
                            />

                            <div className="space-y-12">
                                {experience.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ amount: 0.3 }}
                                        variants={slideFromRight}
                                        className="relative pl-8"
                                    >
                                        {/* Animated dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ amount: 0.5 }}
                                            transition={{ ...bouncySpring, delay: 0.2 }}
                                            className="absolute left-0 top-0 w-3 h-3 -translate-x-[5px] rounded-full bg-[#c9a66b]"
                                        />

                                        <motion.div
                                            whileHover={{ x: 10, transition: smoothSpring }}
                                            className="bg-white p-6 border border-neutral-200 hover:border-[#c9a66b] transition-colors"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                                                <h3 className="ed-headline-sm text-neutral-900">
                                                    {item.role}
                                                </h3>
                                                <motion.span
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ amount: 0.5 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="ed-caption text-[#c9a66b] font-medium"
                                                >
                                                    {item.period}
                                                </motion.span>
                                            </div>
                                            <p className="ed-body-sm font-medium text-neutral-600 mb-2">
                                                {item.company}
                                            </p>
                                            <p className="ed-body-sm text-neutral-500">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TECH STACK SECTION ==================== */}
            <section className="ed-section bg-white">
                <div className="ed-container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="max-w-2xl mb-16"
                    >
                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            Tech Stack
                        </motion.p>
                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                            Technologies I Work With
                        </motion.h2>
                        <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600">
                            From frontend frameworks to backend systems, these are the tools
                            I use to build modern, scalable applications.
                        </motion.p>
                    </motion.div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        {/* Frontend */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h3 variants={slideFromLeft} className="ed-overline text-neutral-500 mb-6">
                                Frontend
                            </motion.h3>
                            <div className="space-y-4">
                                {techStack.frontend.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={fadeUp}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        transition={smoothSpring}
                                        className="group p-4 border border-neutral-200 hover:border-[#c9a66b] transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="ed-body-sm font-medium text-neutral-900 group-hover:text-[#c9a66b] transition-colors">
                                                {tech.name}
                                            </span>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="ed-caption text-neutral-400"
                                            >
                                                {tech.level}%
                                            </motion.span>
                                        </div>
                                        <div className="h-1 bg-neutral-100 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${tech.level}%` }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-[#c9a66b]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Backend */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h3 variants={fadeUp} className="ed-overline text-neutral-500 mb-6">
                                Backend
                            </motion.h3>
                            <div className="space-y-4">
                                {techStack.backend.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={fadeUp}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        transition={smoothSpring}
                                        className="group p-4 border border-neutral-200 hover:border-[#8b9a7d] transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="ed-body-sm font-medium text-neutral-900 group-hover:text-[#8b9a7d] transition-colors">
                                                {tech.name}
                                            </span>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="ed-caption text-neutral-400"
                                            >
                                                {tech.level}%
                                            </motion.span>
                                        </div>
                                        <div className="h-1 bg-neutral-100 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${tech.level}%` }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-[#8b9a7d]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tools */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={staggerContainer}
                        >
                            <motion.h3 variants={slideFromRight} className="ed-overline text-neutral-500 mb-6">
                                Tools & Others
                            </motion.h3>
                            <div className="space-y-4">
                                {techStack.tools.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={fadeUp}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        transition={smoothSpring}
                                        className="group p-4 border border-neutral-200 hover:border-[#c17f59] transition-colors"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="ed-body-sm font-medium text-neutral-900 group-hover:text-[#c17f59] transition-colors">
                                                {tech.name}
                                            </span>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="ed-caption text-neutral-400"
                                            >
                                                {tech.level}%
                                            </motion.span>
                                        </div>
                                        <div className="h-1 bg-neutral-100 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${tech.level}%` }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-[#c17f59]"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== PULL QUOTE ==================== */}
            <section className="ed-section-sm bg-neutral-900 relative overflow-hidden">
                {/* Decorative quote marks */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.05, scale: 1 }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-10 font-serif text-[400px] text-white leading-none"
                >
                    "
                </motion.div>

                <div className="ed-container-narrow relative z-10">
                    <motion.blockquote
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.5 }}
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.p
                            variants={fadeUp}
                            className="font-serif text-2xl md:text-3xl lg:text-4xl text-white italic leading-relaxed"
                        >
                            "{quote.text}"
                        </motion.p>
                        <motion.footer variants={fadeUp} className="mt-8">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ duration: 0.6 }}
                                className="w-16 h-0.5 bg-[#c9a66b] mx-auto mb-4"
                            />
                            <p className="ed-body-sm text-neutral-400">— {quote.author}</p>
                        </motion.footer>
                    </motion.blockquote>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="ed-section bg-white relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-[#c9a66b]/10"
                />

                <div className="ed-container relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <motion.div variants={lineDraw} className="w-16 h-1 bg-[#c9a66b] mx-auto mb-8" />

                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            {cta.eyebrow}
                        </motion.p>

                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                            {cta.title}
                        </motion.h2>

                        <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600">
                            {cta.subtitle}
                        </motion.p>

                        <motion.div variants={staggerFast} className="mt-8 flex flex-wrap justify-center gap-4">
                            {cta.actions.map((action) => (
                                <motion.div key={action.label} variants={popIn}>
                                    <Link
                                        href={action.href}
                                        className={action.variant === 'filled' ? 'ed-button-filled' : 'ed-button'}
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-block"
                                        >
                                            {action.label}
                                        </motion.span>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
