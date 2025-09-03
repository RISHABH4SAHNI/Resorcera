// Run this script to seed comprehensive demo data for all course categories
// Usage: npx tsx src/scripts/seed-demo-courses.ts

import { prisma } from '../lib/prisma'

const demoCourses = [
  // =================== FEATURED COURSES (3) ===================
  {
    title: 'Complete Full-Stack Web Development',
    subtitle: 'Master Modern Web Development',
    description: 'Comprehensive full-stack development course covering React, Node.js, databases, and deployment. Build real-world applications from scratch.',
    detailedDescription: 'This comprehensive full-stack web development course takes you from beginner to professional developer. Learn React, Next.js, Node.js, Express, MongoDB, PostgreSQL, authentication, payment integration, and deployment strategies. Build 5+ real-world projects including e-commerce, social media app, and SaaS platform.',
    price: '₹2999',
    originalPrice: '₹5999',
    duration: '80+ Hours',
    level: 'Beginner to Advanced',
    thumbnail: '🚀',
    pdfFile: null,
    features: [
      'Complete React & Next.js Mastery',
      'Backend Development with Node.js',
      'Database Design & Management',
      'Authentication & Authorization',
      'Payment Gateway Integration',
      'AWS Deployment & DevOps',
      '5+ Real-world Projects',
      'Career Guidance & Interview Prep',
      'Lifetime Access & Updates',
      '1-on-1 Mentor Support'
    ],
    topics: [
      'HTML, CSS, JavaScript ES6+',
      'React.js & Next.js',
      'Node.js & Express.js',
      'MongoDB & PostgreSQL',
      'REST APIs & GraphQL',
      'Authentication (JWT, OAuth)',
      'Payment Integration (Stripe, Razorpay)',
      'AWS, Docker, CI/CD',
      'Testing & Deployment'
    ],
    popularity: 95,
    averageRating: 4.9,
    totalRatings: 2847,
    enrollmentCount: 12500,
    featured: true,
    comingSoon: false
  },
  {
    title: 'Advanced Machine Learning & AI',
    subtitle: 'Master AI/ML with Python',
    description: 'Comprehensive AI/ML course covering deep learning, neural networks, computer vision, NLP, and deployment of ML models in production.',
    detailedDescription: 'Become an AI/ML expert with this comprehensive course covering everything from fundamentals to advanced topics. Learn Python, TensorFlow, PyTorch, computer vision, natural language processing, generative AI, and how to deploy ML models at scale. Includes hands-on projects and real industry case studies.',
    price: '₹3499',
    originalPrice: '₹6999',
    duration: '100+ Hours',
    level: 'Intermediate to Advanced',
    thumbnail: '🤖',
    pdfFile: null,
    features: [
      'Python for Data Science',
      'Machine Learning Algorithms',
      'Deep Learning & Neural Networks',
      'Computer Vision Projects',
      'Natural Language Processing',
      'Generative AI & LLMs',
      'MLOps & Model Deployment',
      'Industry Case Studies',
      'Kaggle Competition Training',
      'Job Placement Assistance'
    ],
    topics: [
      'Python & Data Science Libraries',
      'Supervised & Unsupervised Learning',
      'Deep Learning with TensorFlow/PyTorch',
      'Computer Vision & OpenCV',
      'NLP & Transformer Models',
      'Generative AI & GPT Models',
      'MLOps & Model Deployment',
      'Ethics in AI',
      'Business Applications of AI'
    ],
    popularity: 92,
    averageRating: 4.8,
    totalRatings: 1923,
    enrollmentCount: 8750,
    featured: true,
    comingSoon: false
  },
  {
    title: 'Complete DevOps & Cloud Engineering',
    subtitle: 'Master Cloud & Infrastructure',
    description: 'Comprehensive DevOps course covering AWS, Docker, Kubernetes, CI/CD, monitoring, and infrastructure as code. Become a cloud engineering expert.',
    detailedDescription: 'Master modern DevOps practices and cloud engineering with hands-on experience in AWS, Azure, Docker, Kubernetes, Terraform, Jenkins, and monitoring tools. Learn to build scalable, reliable infrastructure and implement robust CI/CD pipelines. Includes real-world projects and certification preparation.',
    price: '₹2799',
    originalPrice: '₹5499',
    duration: '75+ Hours',
    level: 'Intermediate to Advanced',
    thumbnail: '☁️',
    pdfFile: null,
    features: [
      'AWS & Azure Cloud Platforms',
      'Docker & Containerization',
      'Kubernetes Orchestration',
      'Infrastructure as Code (Terraform)',
      'CI/CD Pipeline Implementation',
      'Monitoring & Logging',
      'Security Best Practices',
      'Real Production Projects',
      'Cloud Certification Prep',
      'Industry Mentor Guidance'
    ],
    topics: [
      'Cloud Computing Fundamentals',
      'AWS Services (EC2, S3, RDS, Lambda)',
      'Docker & Container Management',
      'Kubernetes & Service Mesh',
      'Terraform & Infrastructure Automation',
      'Jenkins, GitLab CI, GitHub Actions',
      'Prometheus, Grafana, ELK Stack',
      'Security & Compliance',
      'Microservices Architecture'
    ],
    popularity: 88,
    averageRating: 4.7,
    totalRatings: 1456,
    enrollmentCount: 6890,
    featured: true,
    comingSoon: false
  },

  // =================== REGULAR AVAILABLE COURSES (3) ===================
  {
    title: 'Complete SQL Database Mastery',
    subtitle: 'Master Database Management',
    description: 'Comprehensive SQL course covering database design, advanced queries, stored procedures, and performance optimization for all major databases.',
    detailedDescription: 'Master SQL from basics to advanced level with this comprehensive course. Learn database design principles, complex queries, joins, stored procedures, triggers, and performance optimization. Covers MySQL, PostgreSQL, and SQL Server with real-world projects and industry best practices.',
    price: '₹999',
    originalPrice: '₹1999',
    duration: '40+ Hours',
    level: 'Beginner to Advanced',
    thumbnail: '📊',
    pdfFile: null,
    features: [
      'Complete SQL Reference Guide',
      'Database Design Principles',
      'Advanced Query Techniques',
      'Stored Procedures & Functions',
      'Performance Optimization',
      'Real-world Projects',
      'Multiple Database Systems',
      'Practice Exercises',
      'Lifetime Access'
    ],
    topics: [
      'Basic SQL Queries & Commands',
      'Joins & Relationships',
      'Subqueries & CTEs',
      'Database Design & Normalization',
      'Stored Procedures & Triggers',
      'Indexing & Performance Tuning',
      'Data Analysis with SQL',
      'Database Security',
      'Backup & Recovery'
    ],
    popularity: 85,
    averageRating: 4.6,
    totalRatings: 892,
    enrollmentCount: 3450,
    featured: false,
    comingSoon: false
  },
  {
    title: 'Frontend Development with React',
    subtitle: 'Modern React Development',
    description: 'Master React.js development with hooks, context, state management, routing, and modern best practices. Build responsive web applications.',
    detailedDescription: 'Become a React expert with this comprehensive course covering React fundamentals, hooks, context API, state management with Redux, routing, testing, and deployment. Learn modern React patterns and build 3 real-world projects including a portfolio, e-commerce app, and dashboard.',
    price: '₹1499',
    originalPrice: '₹2999',
    duration: '50+ Hours',
    level: 'Beginner to Intermediate',
    thumbnail: '⚛️',
    pdfFile: null,
    features: [
      'React Fundamentals & Hooks',
      'State Management (Redux)',
      'React Router & Navigation',
      'Component Design Patterns',
      'Testing with Jest & RTL',
      'Performance Optimization',
      '3 Real-world Projects',
      'Modern Development Tools',
      'Deployment Strategies'
    ],
    topics: [
      'React Components & JSX',
      'State & Props Management',
      'React Hooks (useState, useEffect, etc.)',
      'Context API & Global State',
      'Redux & Redux Toolkit',
      'React Router & Navigation',
      'Form Handling & Validation',
      'API Integration & Async Operations',
      'Testing & Debugging'
    ],
    popularity: 78,
    averageRating: 4.5,
    totalRatings: 645,
    enrollmentCount: 2890,
    featured: false,
    comingSoon: false
  },
  {
    title: 'Python Programming Fundamentals',
    subtitle: 'Learn Python from Scratch',
    description: 'Complete Python programming course covering fundamentals, OOP, data structures, file handling, and popular libraries like NumPy and Pandas.',
    detailedDescription: 'Master Python programming from basics to intermediate level. Learn syntax, data types, control structures, functions, OOP concepts, file handling, error handling, and popular libraries. Includes hands-on projects and practical coding exercises to build real applications.',
    price: '₹799',
    originalPrice: '₹1599',
    duration: '35+ Hours',
    level: 'Beginner to Intermediate',
    thumbnail: '🐍',
    pdfFile: null,
    features: [
      'Python Syntax & Fundamentals',
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
      'File Handling & I/O Operations',
      'Error Handling & Debugging',
      'Popular Libraries (NumPy, Pandas)',
      'Hands-on Projects',
      'Coding Exercises & Challenges',
      'Certificate of Completion'
    ],
    topics: [
      'Python Syntax & Variables',
      'Data Types & Operators',
      'Control Flow & Loops',
      'Functions & Modules',
      'Object-Oriented Programming',
      'Data Structures (Lists, Dictionaries)',
      'File Handling & CSV Processing',
      'Libraries (NumPy, Pandas, Matplotlib)',
      'Web Scraping Basics'
    ],
    popularity: 82,
    averageRating: 4.4,
    totalRatings: 567,
    enrollmentCount: 2340,
    featured: false,
    comingSoon: false
  },

  // =================== UPCOMING COURSES (3) ===================
  {
    title: 'Blockchain & Web3 Development',
    subtitle: 'Coming Soon - Q2 2025',
    description: 'Comprehensive blockchain development course covering Ethereum, Solidity, DeFi, NFTs, and building decentralized applications (dApps).',
    price: 'Coming Soon',
    originalPrice: '',
    duration: '60+ Hours',
    level: 'Intermediate to Advanced',
    thumbnail: '⛓️',
    pdfFile: null,
    features: ['Coming Soon'],
    topics: ['Coming Soon'],
    popularity: 0,
    averageRating: 0,
    totalRatings: 0,
    enrollmentCount: 0,
    featured: false,
    comingSoon: true
  },
  {
    title: 'Cybersecurity & Ethical Hacking',
    subtitle: 'Coming Soon - Q3 2025',
    description: 'Complete cybersecurity course covering ethical hacking, penetration testing, security analysis, and building secure systems.',
    price: 'Coming Soon',
    originalPrice: '',
    duration: '70+ Hours',
    level: 'Intermediate to Advanced',
    thumbnail: '🛡️',
    pdfFile: null,
    features: ['Coming Soon'],
    topics: ['Coming Soon'],
    popularity: 0,
    averageRating: 0,
    totalRatings: 0,
    enrollmentCount: 0,
    featured: false,
    comingSoon: true
  },
  {
    title: 'Mobile App Development (Flutter)',
    subtitle: 'Coming Soon - Q4 2025',
    description: 'Complete mobile app development course using Flutter. Build cross-platform iOS and Android apps with modern UI and backend integration.',
    price: 'Coming Soon',
    originalPrice: '',
    duration: '55+ Hours',
    level: 'Beginner to Advanced',
    thumbnail: '📱',
    pdfFile: null,
    features: ['Coming Soon'],
    topics: ['Coming Soon'],
    popularity: 0,
    averageRating: 0,
    totalRatings: 0,
    enrollmentCount: 0,
    featured: false,
    comingSoon: true
  }
]

async function seedDemoCourses() {
  try {
    console.log('🌱 Starting demo course seeding...')

    // Clear existing courses
    console.log('🧹 Clearing existing courses...')
    await prisma.course.deleteMany({})

    // Create demo courses
    console.log('📚 Creating demo courses...')
    let createdCount = 0

    for (const courseData of demoCourses) {
      const course = await prisma.course.create({ data: courseData })
      createdCount++
      console.log(`✅ Created course ${createdCount}/9: ${course.title}`)
    }

    console.log(`\n🎉 Successfully created ${createdCount} demo courses!`)
    console.log('📊 Course breakdown:')
    console.log('   • 3 Featured courses (premium)')
    console.log('   • 3 Regular courses (available)')
    console.log('   • 3 Upcoming courses (coming soon)')
    console.log('\n🚀 Your Resorcera platform is now loaded with comprehensive demo data!')

  } catch (error) {
    console.error('❌ Demo course seeding failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedDemoCourses()