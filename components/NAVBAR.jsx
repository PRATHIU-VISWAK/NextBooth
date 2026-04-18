import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export const NAVBAR = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  const links = [
    { href: "/",            label: "HOME" },
    { href: "/fetchid",     label: "Voter ID" },
    { href: "/fetchname",   label: "Voter Name" },
    { href: "/fetchfhname", label: "Relative" },
    { href: "/fetchphone",  label: "Phone" },
  ];

  return (
    <nav className="navbar mb-8">
      <div className="navbar-row">
        <Link href="/" onClick={closeMenu} className="navbar-logo-link">
          <span className="navbar-logo">
            <span className="navbar-logo-dot" />
            Voter Portal
          </span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-links-desktop">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`navbar-link ${isActive(l.href) ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="navbar-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`navbar-mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`navbar-link ${isActive(l.href) ? "active" : ""}`}
            onClick={closeMenu}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
