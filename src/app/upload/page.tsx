"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './upload.module.css';

export default function Upload() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoTag = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

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
        <h1 className={styles.title}>Magical Dressing Room</h1>
        <p className={styles.subtitle}>Share your treasures with the enchanted closet</p>

        <div className={styles.uploadCard}>
          {/* Image Upload */}
          <div className={styles.imageUpload}>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
            />
            <label htmlFor="imageInput" className={styles.uploadLabel}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className={styles.previewImage} />
              ) : (
                <>
                  <div className={styles.uploadIcon}>📸</div>
                  <p>Click to upload your item</p>
                </>
              )}
            </label>
          </div>

          {/* Form Fields */}
          <div className={styles.formGroup}>
            <label>Category</label>
            <select className={styles.input}>
              <option>Select category</option>
              <option>Dress</option>
              <option>Top</option>
              <option>Pants</option>
              <option>Jacket</option>
              <option>Accessories</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Color</label>
            <input type="text" placeholder="e.g., Navy Blue" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Aesthetic Tags</label>
            <input type="text" placeholder="e.g., cottagecore, vintage, streetwear" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label>Condition</label>
            <select className={styles.input}>
              <option>Like New</option>
              <option>Gently Used</option>
              <option>Well Loved</option>
            </select>
          </div>

          <button className={styles.autoTagButton} onClick={handleAutoTag}>
            Auto-Tag with AI ✨
          </button>

          <button className={styles.submitButton}>
            Add to Closet 👗
          </button>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className={styles.successModal}>
            <div className={styles.modalContent}>
              <p className={styles.modalText}>✨ Tags added by Fairy Godmother!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}