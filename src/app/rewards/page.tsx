"use client";

import Link from 'next/link';
import styles from './rewards.module.css';

const badges = [
  { id: 1, name: "Eco Hero", icon: "🌱", earned: true },
  { id: 2, name: "Campus Stylist", icon: "👗", earned: true },
  { id: 3, name: "Trade Master", icon: "⭐", earned: false },
  { id: 4, name: "Fairy Godparent", icon: "🪄", earned: false }
];

export default function Rewards() {
  const clothCoins = 450;
  const nextLevel = 500;
  const progress = (clothCoins / nextLevel) * 100;

  return (
    <div className={styles.page}>
      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.sparkle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.4}s`
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
        <h1 className={styles.title}>Your Magical Rewards</h1>
        
        {/* Coin Counter */}
        <div className={styles.coinSection}>
          <div className={styles.coinDisplay}>
            <div className={styles.coinIcon}>🪙</div>
            <div className={styles.coinAmount}>{clothCoins}</div>
            <div className={styles.coinLabel}>ClothCoins</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <p className={styles.progressLabel}>Next Level Progress</p>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={styles.progressText}>{clothCoins} / {nextLevel} ClothCoins</p>
        </div>

        {/* Badges */}
        <div className={styles.badgesSection}>
          <h2 className={styles.sectionTitle}>Your Badges</h2>
          <div className={styles.badgeGrid}>
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`${styles.badgeCard} ${!badge.earned && styles.locked}`}
              >
                <div className={styles.badgeIcon}>{badge.icon}</div>
                <p className={styles.badgeName}>{badge.name}</p>
                {badge.earned && <div className={styles.earnedMark}>✓</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Cash Out Button */}
        <button className={styles.cashOutButton}>
          Cash Out via Visa 💳
        </button>

        {/* Fairy Message */}
        <div className={styles.fairyMessage}>
          <p>"Keep trading to unlock more magical rewards! ✨"</p>
        </div>
      </div>
    </div>
  );
}