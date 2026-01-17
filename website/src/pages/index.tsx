import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  // Store whether the homepage was visited in session storage.
  // This way the animation is shortened and users do not have to wait
  // as long for the content to load.
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem('homepageVisited');
    if (visited)
    {
      setFirstVisit(false);
    }
    else
    {
      sessionStorage.setItem('homepageVisited', 'true');
      setFirstVisit(true);
    }
  }, []);

  // Build the page
  return (
    <Layout
      title='Zelda 64 Music Documentation'
      description='Documentation for Zelda 64 audio systems'
    >
      {/* Splash */}
      <div className={styles['splash-parent']}>
        <img
          className={
            firstVisit
            ? `${styles['splash-bg']} ${styles['animated-bg']}`
            : `${styles['splash-bg']} ${styles['fast-anim']}`
          }
          src='img/splash-bg.png'
          alt=''
        />
        <img
          className={
            firstVisit
            ? `${styles['splash-logo']} ${styles['animated-logo']}`
            : `${styles['splash-logo']} ${styles['fast-anim-delayed']}`
          }
          src='img/splash-logo.png'
          alt=''
        />
      </div>

      {/* Homepage Content */}
      <main
        className={
          firstVisit
          ? `${styles['animated-home']}`
          : `${styles['fast-anim']}`
        }
      >
        {/* TODO: Make a better home page */}
        <section className={styles['home-content']}>
          <h1 style={{ textAlign: 'center'}}>Zelda64 Music Documentation</h1>

          <p>
            A comprehensive resource detailing the audio systems in&nbsp;
            <em>Ocarina of Time</em> and <em>Majora&apos;s Mask</em>.
            It covers the structure and behavior of sequence data, instrument banks,
            audio samples, and more, along with supporting tools and guides for creating
            and modifying music within these games.
          </p>

          <p>
            This documentation is intended to serve as both a research archive and a practical
            resource for anyone insterested in how music functions in the Zelda64 titles —
            from sequence modification and randomizer music creation, to in-depth technical
            analysis of the games&apos; audio engine itself.
          </p>
        </section>
      </main>
    </Layout>
  );
}