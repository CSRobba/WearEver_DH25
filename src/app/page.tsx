import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Sparkles */}
      <div className={styles.sparkle} style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
      <div className={styles.sparkle} style={{ left: '30%', top: '40%', animationDelay: '1s' }}></div>
      <div className={styles.sparkle} style={{ left: '50%', top: '10%', animationDelay: '2s' }}></div>
      <div className={styles.sparkle} style={{ left: '70%', top: '30%', animationDelay: '3s' }}></div>
      <div className={styles.sparkle} style={{ left: '90%', top: '50%', animationDelay: '4s' }}></div>
      <div className={styles.sparkle} style={{ left: '20%', top: '70%', animationDelay: '1.5s' }}></div>
      <div className={styles.sparkle} style={{ left: '80%', top: '80%', animationDelay: '2.5s' }}></div>
      <div className={styles.sparkle} style={{ left: '40%', top: '60%', animationDelay: '3.5s' }}></div>

      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>✨ WearEver</div>
        <ul className={styles.navLinks}>
          <li><Link href="/upload">Upload</Link></li>
          <li><Link href="/match">Match</Link></li>
          <li><Link href="/closet">Closet</Link></li>
          <li><Link href="/rewards">Rewards</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>WearEver, WhenEver, Wear Whatever</h1>
        <p className={styles.heroSubtitle}>Trade clothes money-free with AI-powered matching. Your dream outfit is just a trade away.</p>
        <button className={styles.ctaButton}>Start Exploring ✨</button>
      </section>

      {/* Fairy Quote */}
      <section className={styles.fairyQuote}>
        <p>"Your dream dress is just a trade away!"</p>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🪄</div>
          <h3>AI Outfit Matcher</h3>
          <p>Upload a photo of your dream aesthetic, and our Fairy Godmother AI finds perfect matches from campus closets.</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💫</div>
          <h3>Cashless Trading</h3>
          <p>Trade clothes without spending a dime. Sustainable fashion that's good for your wallet and the planet.</p>
        </div>
        
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>👗</div>
          <h3>Magical Closet</h3>
          <p>Build your enchanted wardrobe, earn ClothCoins with each trade, and unlock exclusive rewards.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>✨ WearEver • Sustainable Fashion Exchange • Made with magic and code</p>
      </footer>
    </div>
  );
}