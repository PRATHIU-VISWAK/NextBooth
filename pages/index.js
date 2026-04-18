import Link from 'next/link';

export default function Home() {
  const cards = [
    {
      href: '/fetchid',
      icon: '🪪',
      title: 'Search by Voter ID',
      subtitle: 'வாக்காளர் அடையாள எண்ணை பயன்படுத்தி கண்டறியுங்கள்',
    },
    {
      href: '/fetchname',
      icon: '👤',
      title: 'Search by Name',
      subtitle: 'வாக்காளர் பெயரை பயன்படுத்தி கண்டறியுங்கள்',
    },
    {
      href: '/fetchphone',
      icon: '📱',
      title: 'Search by Phone Number',
      subtitle: 'வாக்காளரின் தொலைபேசி எண்ணைப் பயன்படுத்தி கண்டறியுங்கள்',
    },
    {
      href: '/fetchfhname',
      icon: '👨‍👩‍👦',
      title: 'Search by Relative',
      subtitle: 'வாக்காளர் உறவினர் பெயரை பயன்படுத்தி கண்டறியுங்கள்',
    },
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-0">
      <div className="hero-banner">
        <img
          src="/assets/voteadmk.jpeg"
          alt="Election poster"
          className="hero-image"
        />
      </div>

      <div className="page-section w-full">
        <div className="search-cards-grid">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="search-card-link">
              <div className="search-card">
                <div className="search-card-icon" aria-hidden="true">
                  {c.icon}
                </div>
                <h2 className="search-card-title">{c.title}</h2>
                <p className="search-card-subtitle">{c.subtitle}</p>
                <button className="search-card-btn" type="button">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

Home.pageTitle = 'Voter Information Portal - Home';
