import { mutation } from './_generated/server';

export const seedProjects = mutation({
  args: {},
  handler: async (ctx) => {
    const projects = [
      {
        title: 'Downtown Office Complex',
        location: 'New York, NY',
        category: 'Commercial',
        status: 'Published' as const,
        budget: '$50M',
        timeline: '24 months',
        team: '50+ professionals',
        client: 'Metro Development Corp',
        architect: 'Foster + Partners',
        contractor: 'Turner Construction',
        description:
          'A state-of-the-art 40-story office complex featuring sustainable design and cutting-edge technology.',
        fullDescription:
          'This landmark project represents the future of urban office design, incorporating advanced sustainability features, smart building technology, and flexible workspace solutions. The complex includes ground-floor retail, multiple dining options, and a rooftop garden accessible to all tenants.',
        keyFeatures: [
          'LEED Platinum certification',
          'Smart building automation',
          'Rooftop garden and terrace',
          'Underground parking for 500 vehicles',
          'High-speed elevators with destination dispatch',
          'Flexible floor plans for various tenant needs',
        ],
        statistics: [
          { label: 'Total Area', value: '1.2M sq ft' },
          { label: 'Floors', value: '40' },
          { label: 'Height', value: '600 ft' },
          { label: 'Parking Spaces', value: '500' },
          { label: 'Construction Time', value: '24 months' },
          { label: 'LEED Rating', value: 'Platinum' },
        ],
        media: {
          photos: [],
          videos: [],
        },
        timelines: [
          {
            phase: 'Foundation & Excavation',
            startDate: 'Jan 2022',
            endDate: 'Apr 2022',
            description:
              'Deep foundation work including pile driving and excavation for underground levels.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Structural Framework',
            startDate: 'May 2022',
            endDate: 'Dec 2022',
            description:
              'Steel and concrete construction of the main structural framework.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Exterior & Interior',
            startDate: 'Jan 2023',
            endDate: 'Aug 2023',
            description:
              'Glass facade installation, interior fit-outs, and MEP systems.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Final Inspections',
            startDate: 'Sep 2023',
            endDate: 'Dec 2023',
            description: 'Final inspections, testing, and tenant move-ins.',
            status: 'completed' as const,
            images: [],
          },
        ],
        teamInterviews: [
          {
            name: 'Sarah Chen',
            role: 'Lead Architect',
            company: 'Foster + Partners',
            quote:
              'This project represents the pinnacle of sustainable urban design. Every element was carefully considered to minimize environmental impact while maximizing functionality.',
            image: undefined,
          },
          {
            name: 'Michael Rodriguez',
            role: 'Project Manager',
            company: 'Turner Construction',
            quote:
              'The coordination between all trades was exceptional. We delivered this complex project on time and under budget through innovative construction methods.',
            image: undefined,
          },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: 'Residential Tower: The Grandview Residences',
        location: 'Los Angeles, CA',
        category: 'Residential',
        status: 'Published' as const,
        budget: '$35M',
        timeline: '18 months',
        team: '40+ professionals',
        client: 'Luxury Living Developments',
        architect: 'Gensler',
        contractor: 'PCL Construction',
        description:
          'Luxury residential tower with panoramic city views and world-class amenities.',
        fullDescription:
          'The Grandview Residences offers unparalleled luxury living in the heart of Los Angeles. Each unit features floor-to-ceiling windows, premium finishes, and access to exclusive amenities including a rooftop pool, fitness center, and concierge services.',
        keyFeatures: [
          'Panoramic city and ocean views',
          'Rooftop infinity pool',
          'Private fitness center',
          'Concierge services',
          'Underground valet parking',
          'Smart home automation',
        ],
        statistics: [
          { label: 'Total Units', value: '120' },
          { label: 'Floors', value: '35' },
          { label: 'Height', value: '450 ft' },
          { label: 'Amenities', value: '15+' },
          { label: 'Construction Time', value: '18 months' },
          { label: 'Parking Spaces', value: '150' },
        ],
        media: {
          photos: [],
          videos: [],
        },
        timelines: [
          {
            phase: 'Site Preparation',
            startDate: 'Mar 2023',
            endDate: 'May 2023',
            description:
              'Site clearing, utility relocation, and foundation preparation.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Foundation Work',
            startDate: 'Jun 2023',
            endDate: 'Sep 2023',
            description:
              'Deep foundation construction and underground parking structure.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Tower Construction',
            startDate: 'Oct 2023',
            endDate: 'Jun 2024',
            description:
              'Main tower construction with structural steel and concrete.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Interior Finishing',
            startDate: 'Jul 2024',
            endDate: 'Sep 2024',
            description:
              'Interior fit-outs, amenity spaces, and final finishes.',
            status: 'completed' as const,
            images: [],
          },
        ],
        teamInterviews: [
          {
            name: 'Jennifer Park',
            role: 'Design Director',
            company: 'Gensler',
            quote:
              'We wanted to create a residential experience that feels like a luxury hotel. Every detail was designed to enhance the living experience.',
            image: undefined,
          },
          {
            name: 'David Thompson',
            role: 'Senior Superintendent',
            company: 'PCL Construction',
            quote:
              'The precision required for this luxury project was extraordinary. Our team delivered exceptional quality throughout the construction process.',
            image: undefined,
          },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: 'Bridge Renovation Project',
        location: 'San Francisco, CA',
        category: 'Infrastructure',
        status: 'In Progress' as const,
        budget: '$25M',
        timeline: '12 months',
        team: '30+ professionals',
        client: 'California Department of Transportation',
        architect: 'Arup',
        contractor: 'Swinerton Builders',
        description: 'Historic bridge restoration and seismic upgrade project.',
        fullDescription:
          "This critical infrastructure project involves the complete restoration of a historic bridge while implementing modern seismic safety standards. The project preserves the bridge's architectural heritage while ensuring it meets current safety requirements.",
        keyFeatures: [
          'Historic preservation',
          'Seismic retrofitting',
          'Modern safety systems',
          'Improved traffic flow',
          'Enhanced pedestrian access',
          'LED lighting upgrade',
        ],
        statistics: [
          { label: 'Bridge Length', value: '1,200 ft' },
          { label: 'Lanes', value: '4' },
          { label: 'Construction Time', value: '12 months' },
          { label: 'Seismic Rating', value: 'A+' },
          { label: 'Daily Traffic', value: '50,000 vehicles' },
          { label: 'Project Value', value: '$25M' },
        ],
        media: {
          photos: [],
          videos: [],
        },
        timelines: [
          {
            phase: 'Assessment & Planning',
            startDate: 'Jan 2024',
            endDate: 'Mar 2024',
            description:
              'Detailed structural assessment and restoration planning.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Temporary Supports',
            startDate: 'Apr 2024',
            endDate: 'Jun 2024',
            description:
              'Installation of temporary support systems for construction.',
            status: 'completed' as const,
            images: [],
          },
          {
            phase: 'Structural Work',
            startDate: 'Jul 2024',
            endDate: 'Dec 2024',
            description: 'Seismic retrofitting and structural improvements.',
            status: 'in-progress' as const,
            images: [],
          },
          {
            phase: 'Final Restoration',
            startDate: 'Jan 2025',
            endDate: 'Mar 2025',
            description: 'Final restoration work and system testing.',
            status: 'pending' as const,
            images: [],
          },
        ],
        teamInterviews: [
          {
            name: 'Robert Kim',
            role: 'Structural Engineer',
            company: 'Arup',
            quote:
              'Balancing historic preservation with modern safety requirements is our greatest challenge and achievement on this project.',
            image: undefined,
          },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    for (const project of projects) {
      await ctx.db.insert('projects', project);
    }

    return { message: 'Projects seeded successfully' };
  },
});

export const seedBusinessStories = mutation({
  args: {},
  handler: async (ctx) => {
    const stories = [
      {
        title: 'The Family Bakery: Three Generations of Sweet Success',
        business: "Mama Rosa's Bakery",
        location: 'Brooklyn, NY',
        category: 'Food & Beverage',
        status: 'Published' as const,
        duration: '45 min',
        rating: 5,
        founded: '1952',
        employees: '12',
        description:
          'A heartwarming story of a family bakery that has been serving the community for over 70 years.',
        fullDescription:
          "Mama Rosa's Bakery began as a small family operation in 1952 when Rosa Martinez immigrated from Italy with her traditional recipes. Today, three generations later, the bakery continues to serve the community with the same love and dedication that Rosa brought to every loaf of bread and every pastry.",
        ownerStory:
          "When my grandmother Rosa came to America, she brought more than just her belongings - she brought her passion for baking and her dream of sharing authentic Italian flavors with her new community. Starting with just a small oven in her apartment kitchen, she built a legacy that now spans three generations. Every morning, I wake up knowing I'm continuing her story, and every customer who walks through our doors becomes part of our family history.",
        milestones: [
          {
            year: '1952',
            title: 'The Beginning',
            description:
              'Rosa Martinez opens her first bakery in a small storefront in Brooklyn, using traditional Italian recipes passed down through generations.',
          },
          {
            year: '1978',
            title: 'Second Generation',
            description:
              "Rosa's daughter Maria takes over the business, expanding the menu and introducing new Italian specialties while maintaining the family traditions.",
          },
          {
            year: '1995',
            title: 'Community Recognition',
            description:
              'The bakery receives the "Best Italian Bakery in Brooklyn" award from the local chamber of commerce, solidifying its place in the community.',
          },
          {
            year: '2010',
            title: 'Third Generation',
            description:
              "Maria's daughter Sofia joins the business, bringing modern marketing techniques while preserving the traditional recipes and family values.",
          },
          {
            year: '2024',
            title: 'Digital Transformation',
            description:
              'The bakery launches online ordering and delivery services, adapting to modern times while maintaining its authentic character.',
          },
        ],
        testimonials: [
          {
            name: 'Giuseppe Romano',
            role: 'Long-time Customer',
            content:
              "I've been coming to Mama Rosa's since I was a child. The bread tastes exactly the same as it did 50 years ago - that's the magic of this place.",
            rating: 5,
          },
          {
            name: 'Sarah Johnson',
            role: 'Local Resident',
            content:
              "The cannoli here are absolutely divine. You can taste the love and tradition in every bite. It's more than just a bakery - it's a piece of our neighborhood's soul.",
            rating: 5,
          },
          {
            name: 'Marco DeLuca',
            role: 'Food Critic',
            content:
              "Mama Rosa's represents everything that's right about family businesses. Authentic flavors, genuine hospitality, and a commitment to quality that never wavers.",
            rating: 5,
          },
        ],
        supportLinks: {
          website: 'https://www.mamarosasbakery.com',
          phone: '+1 (718) 555-0123',
          email: 'info@mamarosasbakery.com',
          address: '123 Italian Way, Brooklyn, NY 11201',
        },
        media: {
          images: [],
          video: undefined,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Johnson's Hardware: Building Communities, One Tool at a Time",
        business: "Johnson's Hardware",
        location: 'Austin, TX',
        category: 'Retail',
        status: 'Published' as const,
        duration: '38 min',
        rating: 5,
        founded: '1978',
        employees: '8',
        description:
          'A family-owned hardware store that has become the backbone of its community for over 45 years.',
        fullDescription:
          "Johnson's Hardware started as a small family business in 1978 and has grown to become an essential part of the Austin community. Known for their expert advice, quality products, and personal service, they've helped countless homeowners and contractors complete their projects.",
        ownerStory:
          "My father started this business with a simple philosophy: treat every customer like family and never sell them something they don't need. That philosophy has carried us through 45 years of business. We've seen generations of families come through our doors, and we've been there for every home improvement project, every repair, and every DIY adventure.",
        milestones: [
          {
            year: '1978',
            title: 'The Foundation',
            description:
              "Tom Johnson opens the first Johnson's Hardware store with a focus on quality tools and expert customer service.",
          },
          {
            year: '1985',
            title: 'Expansion',
            description:
              'The store expands to include a larger showroom and additional product lines to serve the growing Austin community.',
          },
          {
            year: '1995',
            title: 'Second Generation',
            description:
              "Tom's son Mike joins the business, bringing fresh ideas while maintaining the family's commitment to quality and service.",
          },
          {
            year: '2010',
            title: 'Community Partnership',
            description:
              'The store partners with local trade schools to provide educational workshops and support for aspiring craftspeople.',
          },
          {
            year: '2023',
            title: 'Digital Integration',
            description:
              'The business launches an online presence while maintaining the personal touch that customers have come to expect.',
          },
        ],
        testimonials: [
          {
            name: 'Carlos Mendez',
            role: 'Local Contractor',
            content:
              "Johnson's Hardware has been my go-to supplier for over 20 years. Their knowledge and willingness to help is unmatched in the industry.",
            rating: 5,
          },
          {
            name: 'Lisa Chen',
            role: 'Homeowner',
            content:
              "When I was renovating my kitchen, the team at Johnson's guided me through every step. They saved me time, money, and frustration.",
            rating: 5,
          },
          {
            name: 'Robert Taylor',
            role: 'DIY Enthusiast',
            content:
              "The workshops they offer have taught me so much. It's not just a hardware store - it's a learning center for the community.",
            rating: 5,
          },
        ],
        supportLinks: {
          website: 'https://www.johnsonshardware.com',
          phone: '+1 (512) 555-0456',
          email: 'info@johnsonshardware.com',
          address: '456 Tool Street, Austin, TX 78701',
        },
        media: {
          images: [],
          video: undefined,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: 'Silicon Valley Startup: From Garage to Global',
        business: 'InnovateTech Solutions',
        location: 'San Jose, CA',
        category: 'Technology',
        status: 'Published' as const,
        duration: '52 min',
        rating: 5,
        founded: '2010',
        employees: '150',
        description:
          'The inspiring journey of a tech startup that grew from a garage operation to a global software company.',
        fullDescription:
          "InnovateTech Solutions began as a two-person operation in a Silicon Valley garage, developing innovative software solutions. Today, they're a global company with offices in three countries, serving clients worldwide with cutting-edge technology.",
        ownerStory:
          'We started with nothing but an idea and a garage. My co-founder and I worked 18-hour days, fueled by coffee and determination. We believed in our vision of making technology more accessible and user-friendly. Every challenge we faced made us stronger, and every success reminded us why we started this journey.',
        milestones: [
          {
            year: '2010',
            title: 'The Beginning',
            description:
              'Company founded in a garage with a vision to revolutionize software development and user experience.',
          },
          {
            year: '2012',
            title: 'First Major Client',
            description:
              "Secured the first enterprise client, validating the company's technology and business model.",
          },
          {
            year: '2015',
            title: 'Series A Funding',
            description:
              'Raised $5M in Series A funding to accelerate product development and team expansion.',
          },
          {
            year: '2018',
            title: 'International Expansion',
            description:
              'Opened offices in London and Tokyo, establishing a global presence in key markets.',
          },
          {
            year: '2023',
            title: 'IPO Success',
            description:
              "Successfully went public, marking a new chapter in the company's growth and impact.",
          },
        ],
        testimonials: [
          {
            name: 'Jennifer Walsh',
            role: 'Enterprise Client',
            content:
              "InnovateTech's solutions transformed our business operations. Their team's expertise and dedication are truly exceptional.",
            rating: 5,
          },
          {
            name: 'David Park',
            role: 'Early Employee',
            content:
              'Being part of this journey from the early days has been incredible. The company culture and vision have remained strong throughout our growth.',
            rating: 5,
          },
          {
            name: 'Maria Santos',
            role: 'Investor',
            content:
              'InnovateTech represents the best of Silicon Valley innovation. Their commitment to excellence and growth is evident in everything they do.',
            rating: 5,
          },
        ],
        supportLinks: {
          website: 'https://www.innovatetech.com',
          phone: '+1 (408) 555-0789',
          email: 'contact@innovatetech.com',
          address: '789 Innovation Drive, San Jose, CA 95110',
        },
        media: {
          images: [],
          video: undefined,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    for (const story of stories) {
      await ctx.db.insert('businessStories', story);
    }

    return { message: 'Business stories seeded successfully' };
  },
});
