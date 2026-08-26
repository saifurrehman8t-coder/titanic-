import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'welcome-to-titanic-chronicles',
    title: 'Welcome to Titanic Chronicles: Preserving 1912 Maritime History',
    subtitle: 'Your ultimate destination for authentic historical archives, survivor records, and deep-sea exploration.',
    excerpt: 'Explore our growing archive of in-depth historical articles, architectural blueprints, and untold passenger stories from RMS Titanic.',
    content: `
      <h2>Welcome to Titanic Chronicles</h2>
      <p>Titanic Chronicles is a digital archive dedicated to documenting the history of the RMS Titanic—from her keel laying at Belfast's Harland & Wolff shipyard in 1909 to her tragic maiden voyage in April 1912 and the 1985 discovery of her ocean floor wreck by Dr. Robert Ballard.</p>

      <div class="article-quote">
        "Every survivor account and archived logbook entry brings us closer to understanding the humanity behind the Ship of Dreams."
      </div>

      <h2>What You Will Find on This Blog</h2>
      <p>Our upcoming articles explore First-Class luxury, Third-Class immigrant dreams, key historical figures like Captain Edward Smith and Thomas Andrews, technical engineering marvels, and primary source records.</p>
    `,
    category: 'Construction & Shipyard',
    author: {
      name: 'Site Admin',
      role: 'Chief Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    date: 'August 26, 2026',
    readTime: '3 min read',
    tags: ['Welcome', 'Titanic History', 'Archives', 'White Star Line'],
    featuredImage: '/hero-titanic.jpg',
    imageCaption: 'RMS Titanic sailing at dusk under a starry night sky.',
    views: 1250,
    featured: false,
    trending: false,
    comments: []
  },
  {
    id: 'post-2',
    slug: 'first-class-luxury-grand-staircase-opulence',
    title: 'Peak Opulence: Inside Titanic’s First-Class Suites & Grand Staircase',
    subtitle: 'Inside £870 Parlor Suites, French Gastronomy, and the Turkish Baths on D-Deck',
    excerpt: 'Step inside Titanic’s First-Class quarters—from private promenade decks and electric baths to 10-course French dinners served on gold-rimmed china.',
    content: `
      <h2>The Peak of Edwardian Aristocratic Luxury</h2>
      <p>When RMS Titanic set sail on April 10, 1912, she carried some of the world's wealthiest industrialists, aristocrats, and moguls. Among them were real estate tycoon John Jacob Astor IV, Macy's co-owner Isidor Straus, and mining magnate Benjamin Guggenheim.</p>

      <p>To cater to international high society, White Star Line designed First-Class accommodations that rivaled the finest luxury hotels in London and Paris, such as The Ritz and The Claridge's.</p>

      <div class="article-quote">
        "To travel First-Class on Titanic was not merely to cross the Atlantic; it was to reside in a floating palace of mahogany, English oak, and crystal chandeliers."
      </div>

      <h2>The Millionaires' Parlor Suites</h2>
      <p>The most exclusive accommodations aboard Titanic were the two <strong>Deluxe Parlor Suites</strong> on B-Deck (Suites B-51/53/55 and B-52/54/56). Costing up to £870 in 1912 (equivalent to over $100,000 today), each suite featured:</p>
      <ul>
        <li>A 50-foot private promenade deck lined with wicker furniture and potted palms.</li>
        <li>Two bedrooms, a sitting room, two walk-in wardrobes, and a private marble bathroom.</li>
        <li>Custom Period Decor: Louis XVI, Empire, and Georgian hand-carved wood paneling.</li>
      </ul>

      <h2>Dining in Style: The 10-Course Banquet</h2>
      <p>Every evening at 7:00 PM, First-Class passengers assembled in the D-Deck Dining Saloon—the largest room afloat, capable of seating 554 guests under a white Jacobean ceiling.</p>

      <p>A typical 10-course dinner menu included <em>Consommé Olga</em>, poached salmon with mousseline sauce, filet mignon lili, lamb with mint sauce, roast duckling, squab, pâté de foie gras, and Waldorf pudding, accompanied by rare vintages of French champagne.</p>

      <h2>Turkish Baths & Heated Swimming Pool</h2>
      <p>Located on F-Deck, the Moorish-style <strong>Turkish Baths</strong> featured gilded tiles, teak lounge couches, a steam room, a hot room, and a cooling room. Nearby stood the heated saltwater swimming pool—a groundbreaking luxury on the North Atlantic.</p>
    `,
    category: 'First-Class Luxury',
    author: {
      name: 'Eleanor Radcliffe',
      role: 'Edwardian Decorative Arts Specialist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    date: 'August 26, 2026',
    readTime: '7 min read',
    tags: ['First Class', 'Grand Staircase', 'Luxury Suites', 'Turkish Baths', 'Edwardian'],
    featuredImage: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Reconstruction of the magnificent First-Class Grand Staircase.',
    views: 3420,
    featured: true,
    trending: true,
    comments: [
      {
        id: 'c1',
        author: 'Julian Thorne',
        content: 'Fascinating details about the private 50-foot promenade decks! The £870 suite price in 1912 is staggering.',
        date: '10 minutes ago',
        likes: 12
      }
    ]
  }
];
