"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './match.module.css';

const mockItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    name: "Vintage Floral Dress",
    tags: ["cottagecore", "vintage", "romantic"],
    owner: "Emma"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400",
    name: "Denim Jacket",
    tags: ["casual", "streetwear", "classic"],
    owner: "Sarah"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    name: "Silk Blouse",
    tags: ["elegant", "minimalist", "professional"],
    owner: "Maya"
  }
];

export default function Match() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockItems.length);
  };

  const currentItem = mockItems[currentIndex];

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

      {/* Fairy Godmother Message */}
      <div className={styles.fairyMessage}>
        <p>"I've found some magical matches for you! ✨"</p>
      </div>

      {/* Match Cards */}
      <div className={styles.container}>
        <h1 className={styles.title}>Your Magical Matches</h1>
        
        <div className={styles.cardContainer}>
          <div className={styles.matchCard}>
            <div className={styles.imageContainer}>
              <img src={currentItem.image} alt={currentItem.name} className={styles.itemImage} />
            </div>
            
            <div className={styles.cardContent}>
              <h2 className={styles.itemName}>{currentItem.name}</h2>
              <p className={styles.owner}>Owned by {currentItem.owner}</p>
              
              <div className={styles.tags}>
                {currentItem.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <button className={styles.skipButton} onClick={handleNext}>
                  Pass ❌
                </button>
                <button className={styles.requestButton}>
                  Request Trade ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.counter}>
          {currentIndex + 1} / {mockItems.length}
        </div>
      </div>
    </div>
  );
}