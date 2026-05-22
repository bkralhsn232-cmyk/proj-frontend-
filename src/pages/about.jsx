import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: 'easeIn' } }
};

function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      <div id="center">
        <div style={{ maxWidth: '800px', textAlign: 'center', padding: '0 20px' }}>
          <span className="counter">v1.0.0 Stable</span>
          <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>About MovieApp</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
            Welcome to MovieApp, your decentralized space for aggregating, reviewing, and tracking your favorite cinema. Built with high performance and minimal aesthetics in mind, this platform allows users to explore trending records, add custom collections, and discuss plot twists seamlessly inside dedicated community forums.
          </p>
        </div>

        <div id="next-steps" style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="movie-card" style={{ margin: '10px', padding: '24px' }}>
            <h3>Curate Collections 🎬</h3>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.5' }}>
              Easily catalog films into your personalized dashboard. Add posters, release details, genres, and maintain complete custody over your historical watch lists.
            </p>
          </div>

          <div className="movie-card" style={{ margin: '10px', padding: '24px' }}>
            <h3>Community Forums 💬</h3>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.5' }}>
              Every title features a dedicated ID link leading straight to public discussion boards. Connect with other users to debate metrics, reviews, and cinematography.
            </p>
          </div>

          <div className="movie-card" style={{ margin: '10px', padding: '24px' }}>
            <h3>Carbon Engine ⚡</h3>
            <p style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.5' }}>
              Engineered with optimized React rendering patterns and uniform CSS variables. Enjoy a rapid, dark-palette interface built completely devoid of bloated design frameworks.
            </p>
          </div>
        </div>

        <div id="spacer"></div>
      </div>
    </motion.div>
  );
}

export default About;