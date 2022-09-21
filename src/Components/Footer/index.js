import React from 'react'

import { ReactComponent as Instagram } from '../../assets/instagram.svg';
import { ReactComponent as Discord } from '../../assets/discord.svg';
import { ReactComponent as Linkedin } from '../../assets/linkedin.svg';

import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p> Desenvolvido por <a href='https://github.com/souzzs' target='_blank' rel="noreferrer" className={styles.githubLink}>Caio Souza</a>.</p>
        <div className={styles.social}>
            <a href='https://www.instagram.com/c.souzzs/' target='_blank' rel="noreferrer">
                <Instagram />
            </a>
            <a href='https://discord.com/channels/@me/984461227554115614' target='_blank' rel="noreferrer">
                <Discord />
            </a>
            <a href='https://www.linkedin.com/in/souzzs/' target='_blank' rel="noreferrer">
                <Linkedin />
            </a>
        </div>
    </footer>
  )
}

export default Footer