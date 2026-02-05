import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

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

const slideFromBottom = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
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

const lineDraw = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -8, transition: smoothSpring },
};

const inputFocus = {
    rest: { scale: 1, borderColor: '#e5e5e5' },
    focus: { scale: 1.01, borderColor: '#c9a66b' },
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

// ==================== DATA ====================

const contactDummy = {
    hero: {
        eyebrow: 'Contact',
        titleLines: ["Let's", 'Collaborate'],
        subtitle: 'Share your goals, timeline, and any inspiration. I respond within two business days.',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=1100&fit=crop',
    },
    summaryCards: [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            value: 'hello@example.com',
            description: 'Project inquiries and collaborations.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Studio',
            value: 'Jakarta, Indonesia',
            description: 'Remote collaboration worldwide.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Office Hours',
            value: 'Mon - Fri, 09:00 - 18:00',
            description: 'Responses within 2 business days.',
        },
    ],
    form: {
        eyebrow: 'Project Inquiry',
        title: 'Tell me about your next issue.',
        subtitle: 'This form is a UI mockup only. It is designed to demonstrate the editorial style of the interface.',
        notes: ['Project goals and scope', 'Timeline and launch window', 'Budget range and milestones'],
        fields: [
            { name: 'name', type: 'text', placeholder: 'Your name' },
            { name: 'email', type: 'email', placeholder: 'Email address' },
            { name: 'company', type: 'text', placeholder: 'Company / Studio' },
            { name: 'budget', type: 'text', placeholder: 'Estimated budget' },
            { name: 'message', as: 'textarea', placeholder: 'Project summary' },
        ],
        submitLabel: 'Send Inquiry',
    },
    socials: {
        eyebrow: 'Social',
        title: 'Find me online',
        subtitle: 'Fresh case studies, editorial experiments, and studio notes.',
        items: [
            {
                key: 'linkedin',
                label: 'LinkedIn',
                handle: 'linkedin.com/in/portfolio',
                description: 'Long-form insights and professional updates.',
                url: 'https://linkedin.com',
            },
            {
                key: 'behance',
                label: 'Behance',
                handle: 'behance.net/portfolio',
                description: 'Curated case studies and brand archives.',
                url: 'https://www.behance.net',
            },
            {
                key: 'dribbble',
                label: 'Dribbble',
                handle: 'dribbble.com/portfolio',
                description: 'Visual explorations and layout studies.',
                url: 'https://dribbble.com',
            },
            {
                key: 'github',
                label: 'GitHub',
                handle: 'github.com/portfolio',
                description: 'Code samples and experiments.',
                url: 'https://github.com',
            },
        ],
    },
    cta: {
        eyebrow: 'Stay Connected',
        title: 'Ready to start a project?',
        subtitle: "I'm always excited to hear about new opportunities and interesting ideas.",
        primary: { label: 'View Work', href: '/projects' },
        secondary: { label: 'hello@example.com', href: 'mailto:hello@example.com' },
    },
};

const socialIconMap = {
    linkedin: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    ),
    behance: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M9.5 12.6c.8 0 1.5-.3 2-1 .4-.6.6-1.4.6-2.2 0-1.2-.3-2.1-1-2.7-.6-.6-1.5-.9-2.6-.9H2v14h7.5c1.7 0 3.1-.5 4.1-1.5 1-1 1.5-2.4 1.5-4 0-1.2-.3-2.2-.9-2.9-.6-.7-1.4-1.1-2.3-1.2v-.1c.7-.3 1.2-.7 1.6-1.3.4-.6.6-1.3.6-2.2 0-1.3-.4-2.3-1.2-3C12.9 2.5 11.7 2 10.2 2H2v10.6h7.5zM5.4 4.8h4.2c.7 0 1.2.2 1.5.5.3.3.5.8.5 1.5 0 .6-.2 1.1-.5 1.4-.3.3-.8.5-1.5.5H5.4V4.8zm0 7.4h4.6c.8 0 1.4.2 1.8.6.4.4.6 1 .6 1.8 0 .8-.2 1.4-.6 1.8-.4.4-1 .6-1.8.6H5.4v-4.8z" />
        </svg>
    ),
    dribbble: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.49 5.37a9.29 9.29 0 012.12 5.86c-.28-.06-3.09-.65-6.24-.22-.07-.16-.14-.33-.22-.5-.18-.41-.38-.83-.6-1.26 3.48-1.42 5.02-3.35 5.24-3.88zm-2.03-2.2c-.2.27-1.55 2.02-4.79 3.27-1.52-2.79-3.21-5.1-3.43-5.4a9.28 9.28 0 018.22 2.13z" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    ),
};

// ==================== MAIN COMPONENT ====================

export default function Contact() {
    const { hero, summaryCards, form, socials, cta } = contactDummy;
    const [focusedField, setFocusedField] = useState(null);

    return (
        <>
            <Head>
                <title>Contact | Portfolio</title>
                <meta
                    name="description"
                    content="Get in touch for new projects, collaborations, and consultations."
                />
            </Head>

            {/* ==================== HERO ==================== */}
            <section className="relative overflow-hidden bg-[#faf8f5] pt-16 pb-24 lg:pt-24 lg:pb-32">
                {/* Animated Decorative Blobs */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    className="mag-blob mag-blob-warm w-[380px] h-[380px] -top-40 right-10"
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="mag-blob mag-blob-sage w-[280px] h-[280px] bottom-10 -left-20"
                />

                <div className="ed-container relative z-10">
                    <div className="grid gap-12 lg:grid-cols-12 items-center">
                        {/* Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-6"
                        >
                            <motion.div variants={lineDraw} className="w-16 h-1 bg-[#c9a66b] mb-8" />

                            <motion.p variants={popIn} className="ed-overline mag-accent-warm mb-4">
                                {hero.eyebrow}
                            </motion.p>

                            <motion.h1 variants={fadeUp} className="mag-display text-neutral-900 mb-6">
                                {hero.titleLines[0]}
                                <br />
                                <span className="italic font-light">{hero.titleLines[1]}</span>
                            </motion.h1>

                            <motion.p variants={fadeUp} className="ed-subhead text-neutral-600 max-w-xl">
                                {hero.subtitle}
                            </motion.p>

                            {/* Summary Cards */}
                            <motion.div variants={staggerFast} className="mt-10 grid gap-6">
                                {summaryCards.map((card, index) => (
                                    <motion.div
                                        key={card.title}
                                        variants={slideFromLeft}
                                        whileHover={{ x: 10, transition: smoothSpring }}
                                        className="group flex items-start gap-4 border-t border-neutral-200 pt-4"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ amount: 0.5 }}
                                            transition={{ ...bouncySpring, delay: index * 0.1 }}
                                            className="w-12 h-12 flex items-center justify-center border border-neutral-200 text-[#c9a66b] group-hover:bg-[#c9a66b] group-hover:text-white group-hover:border-[#c9a66b] transition-all"
                                        >
                                            {card.icon}
                                        </motion.div>
                                        <div>
                                            <p className="ed-overline text-neutral-400">{card.title}</p>
                                            <p className="font-serif text-lg text-neutral-900 mt-1 group-hover:text-[#c9a66b] transition-colors">
                                                {card.value}
                                            </p>
                                            <p className="ed-body-sm text-neutral-500 mt-1">{card.description}</p>
                                        </div>
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
                            className="lg:col-span-6"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={smoothSpring}
                                className="mag-frame-offset"
                            >
                                <motion.div
                                    variants={imageReveal}
                                    className="mag-image-cover aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden"
                                >
                                    <img
                                        src={hero.image}
                                        alt="Studio collaboration"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 mag-gradient-dark" />
                                </motion.div>

                                {/* Floating Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ ...bouncySpring, delay: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-[#c9a66b] text-white p-6"
                                >
                                    <p className="font-serif text-2xl">2 days</p>
                                    <p className="ed-caption text-white/80">Response time</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== CONTACT FORM ==================== */}
            <section className="ed-section bg-white">
                <div className="ed-container">
                    <div className="grid gap-12 lg:grid-cols-12">
                        {/* Left - Info */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-5"
                        >
                            <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                                {form.eyebrow}
                            </motion.p>
                            <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                                {form.title}
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600">
                                {form.subtitle}
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                className="mt-8 border-t border-neutral-200 pt-6"
                            >
                                <p className="ed-caption text-neutral-500 uppercase tracking-[0.2em] mb-4">
                                    Include
                                </p>
                                <motion.ul variants={staggerFast} className="space-y-3">
                                    {form.notes.map((note, index) => (
                                        <motion.li
                                            key={note}
                                            variants={slideFromLeft}
                                            className="flex items-center gap-3 text-neutral-600 ed-body-sm"
                                        >
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ ...bouncySpring, delay: index * 0.1 }}
                                                className="w-2 h-2 bg-[#c9a66b] rounded-full"
                                            />
                                            {note}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </motion.div>

                        {/* Right - Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={slideFromRight}
                            className="lg:col-span-7"
                        >
                            <motion.div
                                whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
                                transition={smoothSpring}
                                className="border border-neutral-200 p-8 bg-white"
                            >
                                <form className="grid gap-5">
                                    {form.fields.map((field, index) => (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ amount: 0.5 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {field.as === 'textarea' ? (
                                                <motion.textarea
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    onFocus={() => setFocusedField(field.name)}
                                                    onBlur={() => setFocusedField(null)}
                                                    whileFocus={{ scale: 1.01 }}
                                                    className={`ed-input min-h-[160px] transition-all duration-300 ${
                                                        focusedField === field.name ? 'border-[#c9a66b] shadow-lg' : ''
                                                    }`}
                                                />
                                            ) : (
                                                <motion.input
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    onFocus={() => setFocusedField(field.name)}
                                                    onBlur={() => setFocusedField(null)}
                                                    whileFocus={{ scale: 1.01 }}
                                                    className={`ed-input transition-all duration-300 ${
                                                        focusedField === field.name ? 'border-[#c9a66b] shadow-lg' : ''
                                                    }`}
                                                />
                                            )}
                                        </motion.div>
                                    ))}

                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ amount: 0.5 }}
                                        transition={{ delay: form.fields.length * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="ed-button-filled w-full mt-2"
                                    >
                                        <motion.span
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            className="inline-flex items-center gap-2"
                                        >
                                            {form.submitLabel}
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </motion.span>
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== SOCIALS ==================== */}
            <section className="ed-section bg-[#faf8f5] relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.03 }}
                    viewport={{ amount: 0.3 }}
                    className="absolute top-10 right-10 font-serif text-[250px] text-neutral-900 leading-none pointer-events-none"
                >
                    @
                </motion.div>

                <div className="ed-container relative z-10">
                    <div className="grid gap-10 lg:grid-cols-12">
                        {/* Left - Header */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.3 }}
                            variants={staggerContainer}
                            className="lg:col-span-4"
                        >
                            <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                                {socials.eyebrow}
                            </motion.p>
                            <motion.h2 variants={fadeUp} className="ed-headline-lg text-neutral-900">
                                {socials.title}
                            </motion.h2>
                            <motion.p variants={fadeUp} className="mt-4 ed-body text-neutral-600">
                                {socials.subtitle}
                            </motion.p>
                        </motion.div>

                        {/* Right - Social Cards */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ amount: 0.2 }}
                            variants={staggerContainer}
                            className="lg:col-span-8"
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                {socials.items.map((item, index) => (
                                    <motion.a
                                        key={item.key}
                                        variants={scaleUp}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                        className="group"
                                    >
                                        <motion.div
                                            variants={cardHover}
                                            className="flex gap-4 border border-neutral-200 bg-white p-6 transition-colors hover:border-[#c9a66b]"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ amount: 0.5 }}
                                                transition={{ ...bouncySpring, delay: index * 0.1 }}
                                                className="flex h-14 w-14 items-center justify-center border border-neutral-200 text-neutral-900 group-hover:bg-[#c9a66b] group-hover:text-white group-hover:border-[#c9a66b] transition-all"
                                            >
                                                {socialIconMap[item.key]}
                                            </motion.div>
                                            <div className="flex-1">
                                                <p className="ed-overline text-neutral-400">{item.label}</p>
                                                <p className="font-serif text-lg text-neutral-900 mt-1 group-hover:text-[#c9a66b] transition-colors">
                                                    {item.handle}
                                                </p>
                                                <p className="ed-body-sm text-neutral-500 mt-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileHover={{ opacity: 1, x: 0 }}
                                                className="self-center text-[#c9a66b]"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </motion.div>
                                        </motion.div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ==================== CTA ==================== */}
            <section className="ed-section bg-neutral-900 relative overflow-hidden">
                {/* Decorative */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#c9a66b]/10"
                />
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute -bottom-40 -right-40 w-[300px] h-[300px] rounded-full bg-[#8b9a7d]/10"
                />

                <div className="ed-container relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        variants={staggerContainer}
                        className="text-center max-w-2xl mx-auto"
                    >
                        <motion.div
                            variants={lineDraw}
                            className="w-16 h-1 bg-[#c9a66b] mx-auto mb-8"
                        />

                        <motion.p variants={popIn} className="ed-overline text-[#c9a66b] mb-4">
                            {cta.eyebrow}
                        </motion.p>

                        <motion.h2 variants={fadeUp} className="ed-headline-lg text-white mb-4">
                            {cta.title}
                        </motion.h2>

                        <motion.p variants={fadeUp} className="ed-body text-neutral-400 max-w-xl mx-auto">
                            {cta.subtitle}
                        </motion.p>

                        <motion.div variants={staggerFast} className="mt-8 flex flex-wrap justify-center gap-4">
                            <motion.div variants={popIn}>
                                <Link
                                    href={cta.primary.href}
                                    className="ed-button border-white text-white hover:bg-white hover:text-neutral-900"
                                >
                                    <motion.span
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block"
                                    >
                                        {cta.primary.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                            <motion.div variants={popIn}>
                                <a
                                    href={cta.secondary.href}
                                    className="ed-button border-[#c9a66b] text-[#c9a66b] hover:bg-[#c9a66b] hover:text-white"
                                >
                                    <motion.span
                                        whileHover={{ x: 5 }}
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
