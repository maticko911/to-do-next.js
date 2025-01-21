import React from 'react';
import classes from './page.module.css';

const Page = () => {
    return (
        <>
            <header className={classes.header}>
                <div className={classes.headerContent}>
                    <h1 className={classes.pageTitle}>About Us</h1>
                    <p className={classes.pageDescription}>
                        Welcome to our task management application, where everyday tasks become clearer, more organized, and more productive.
                        We aim to help people better manage their time and focus on what truly matters in this fast-paced world.
                    </p>
                </div>
            </header>
            <main className={classes.mainContent}>
                <section className={classes.missionSection}>
                    <h2 className={classes.sectionTitle}>Our Mission</h2>
                    <p className={classes.textContent}>Our mission is simple yet powerful:</p>
                    <ul className={classes.bulletList}>
                        <li>💡 Enhance everyday tasks with an easy-to-use tool that motivates and boosts productivity.</li>
                        <li>🚀 Inspire users to complete tasks successfully with small, consistent steps.</li>
                    </ul>
                </section>

                <section className={classes.beliefsSection}>
                    <h2 className={classes.sectionTitle}>We believe a well-planned day can change your world.</h2>
                    <p className={classes.textContent}>With this app, we aim to:</p>
                    <ul className={classes.bulletList}>
                        <li>Increase your efficiency.</li>
                        <li>Create space for clear priorities.</li>
                        <li>Help overcome feelings of overwhelm.</li>
                    </ul>
                    <p className={classes.textContent}>
                        Join our community, and together let&apos;s turn daily tasks into opportunities for growth and success.
                    </p>
                </section>
            </main>

            <footer className={classes.footer}>
                <p className={classes.footerText}>© 2025 Our Task Management App - All Rights Reserved</p>
            </footer>
        </>
    );
};

export default Page;
