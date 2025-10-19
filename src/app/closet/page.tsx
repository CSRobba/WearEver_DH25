"use client";

import Link from 'next/link';
import styles from './closet.module.css';

const mockClosetItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    name: "Summer Dress",
    tags: ["casual", "summer"],
    status: "available"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    name: "Leather Jacket",
    tags: ["edgy", "fall"],
    status: "trading"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400",
    name: "Knit Sweater",
    tags: ["cozy", "winter"],
    status: "available"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    name: "Silk Scarf",
    tags: ["elegant", "accessory"],
    status: "available"
  }
];

export default function Closet() {
  return (
    <div className={styles.page}>
      {/* Sparkles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={styles.sparkle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}

      {/* Navbar */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>✨ WearEver</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/upload">Upload</Link></li>
          <li><Link href="/match">Match</Link></li>
          <li><Link href="/closet">Closet</Link></li>
          <li><Link href="/rewards">Rewards</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className={styles.container}>
        <h1 className={styles.title}>Your Enchanted Closet</h1>
        <p className={styles.subtitle}>✨ {mockClosetItems.length} magical items ready to trade</p>

        {/* Closet Grid */}
        <div className={styles.grid}>
          {mockClosetItems.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.overlay}>
                  <button className={styles.editButton}>✏️</button>
                  <button className={styles.deleteButton}>🗑️</button>
                </div>
                <div className={`${styles.statusBadge} ${styles[item.status]}`}>
                  {item.status === "available" ? "Available ✓" : "In Trade 🔄"}
                </div>
              </div>
              
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <Link href="/upload" className={styles.addButton}>
          + Add Item
        </Link>
      </div>
    </div>
  );
}