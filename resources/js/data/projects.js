/**
 * Centralized Project Data
 *
 * Status Options:
 * - 'completed'   : Project sudah selesai
 * - 'in_progress' : Project sedang dikerjakan
 * - 'on_hold'     : Project ditunda sementara
 * - 'planned'     : Project baru direncanakan
 *
 * is_landing: true = tampil di landing page (Home)
 */

export const PROJECT_STATUS = {
    COMPLETED: 'completed',
    IN_PROGRESS: 'in_progress',
    ON_HOLD: 'on_hold',
    PLANNED: 'planned',
};

export const STATUS_LABELS = {
    [PROJECT_STATUS.COMPLETED]: 'Completed',
    [PROJECT_STATUS.IN_PROGRESS]: 'In Progress',
    [PROJECT_STATUS.ON_HOLD]: 'On Hold',
    [PROJECT_STATUS.PLANNED]: 'Planned',
};

export const STATUS_COLORS = {
    [PROJECT_STATUS.COMPLETED]: '#22c55e',    // green
    [PROJECT_STATUS.IN_PROGRESS]: '#f59e0b',  // amber
    [PROJECT_STATUS.ON_HOLD]: '#6b7280',      // gray
    [PROJECT_STATUS.PLANNED]: '#3b82f6',      // blue
};

export const projects = [
    {
        id: 1,
        title: 'Lumina E-Commerce',
        category: 'Web Development',
        description: 'A luxury fashion e-commerce platform with immersive shopping experience and seamless checkout flow.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
        year: '2024',
        featured: true,
        tags: ['React', 'Node.js', 'Stripe'],
        color: '#c9a66b',
        status: PROJECT_STATUS.COMPLETED,
        is_landing: true,
    },
    {
        id: 2,
        title: 'Artisan Coffee',
        category: 'Mobile Design',
        description: 'Mobile app for specialty coffee ordering with loyalty rewards and personalized recommendations.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop',
        year: '2024',
        featured: true,
        tags: ['React Native', 'Firebase'],
        color: '#8b9a7d',
        status: PROJECT_STATUS.COMPLETED,
        is_landing: true,
    },
    {
        id: 3,
        title: 'Horizon Finance',
        category: 'Dashboard UI',
        description: 'Real-time financial analytics dashboard with elegant data visualization and reporting.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        year: '2023',
        featured: true,
        tags: ['Vue.js', 'D3.js', 'Python'],
        color: '#c17f59',
        status: PROJECT_STATUS.COMPLETED,
        is_landing: true,
    },
    {
        id: 4,
        title: 'Verde Real Estate',
        category: 'Full Stack',
        description: 'Property listing platform with virtual tours, appointment scheduling, and mortgage calculator.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        year: '2023',
        featured: false,
        tags: ['Laravel', 'Vue.js', 'MySQL'],
        color: '#c9a66b',
        status: PROJECT_STATUS.COMPLETED,
        is_landing: false,
    },
    {
        id: 5,
        title: 'Wellness Studio',
        category: 'Brand Identity',
        description: 'Complete brand identity for a premium yoga and wellness studio including logo, collateral, and website.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
        year: '2023',
        featured: false,
        tags: ['Figma', 'Illustrator'],
        color: '#8b9a7d',
        status: PROJECT_STATUS.IN_PROGRESS,
        is_landing: false,
    },
    {
        id: 6,
        title: 'Savoria Restaurant',
        category: 'Web Development',
        description: 'Restaurant website with online reservation, menu management, and integrated POS system.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
        year: '2023',
        featured: false,
        tags: ['Next.js', 'Sanity', 'Stripe'],
        color: '#c17f59',
        status: PROJECT_STATUS.IN_PROGRESS,
        is_landing: false,
    },
    {
        id: 7,
        title: 'FitTrack Pro',
        category: 'Mobile Design',
        description: 'Fitness tracking app with workout plans, progress analytics, and social challenges.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bccebfef6?w=800&h=600&fit=crop',
        year: '2022',
        featured: false,
        tags: ['Flutter', 'Supabase'],
        color: '#c9a66b',
        status: PROJECT_STATUS.ON_HOLD,
        is_landing: false,
    },
    {
        id: 8,
        title: 'Mindful Learning',
        category: 'Full Stack',
        description: 'Online education platform with video courses, quizzes, and certificate generation.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
        year: '2022',
        featured: false,
        tags: ['Next.js', 'Prisma', 'AWS'],
        color: '#8b9a7d',
        status: PROJECT_STATUS.PLANNED,
        is_landing: false,
    },
];

// Helper functions
export const getLandingProjects = () => projects.filter(p => p.is_landing);
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByStatus = (status) => projects.filter(p => p.status === status);
export const getProjectById = (id) => projects.find(p => p.id === id);
export const getCategories = () => ['All', ...new Set(projects.map(p => p.category))];
