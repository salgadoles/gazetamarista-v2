import Link from 'next/link';
import { Newspaper, Mail, MapPin, Heart, Share2, Globe } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoRow}>
            <img src="/images/graficos/image-removebg-preview (9) 1.png" alt="Projeto Conexão" className={styles.footerLogoImg} />
            <img src="/images/graficos/image-removebg-preview (1) 1 (1).png" alt="Gazeta Marista" className={styles.footerLogoImg} />
          </div>
          <p className={styles.brandDesc}>
            A voz da comunidade do Colégio Marista Irmão Acácio.
            Produzido com <Heart size={12} className={styles.heart} /> pelos alunos de Londrina, PR.
          </p>
          <div className={styles.location}>
            <MapPin size={14} />
            <span>Londrina, Paraná, Brasil</span>
          </div>
        </div>

        {/* Nav Columns */}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Portal</h4>
            <Link href="/" className={styles.link}>Início</Link>
            <Link href="/materias" className={styles.link}>Matérias</Link>
            <Link href="/jornal" className={styles.link}>Jornal Digital</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Rádio</h4>
            <Link href="/radio" className={styles.link}>Ao Vivo</Link>
            <Link href="/radio#programacao" className={styles.link}>Programação</Link>
            <Link href="/radio#podcasts" className={styles.link}>Podcasts</Link>
          </div>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Redatores</h4>
            <Link href="/entrar" className={styles.link}>Entrar</Link>
            <Link href="/redator" className={styles.link}>Meu Painel</Link>
            <Link href="/redator/nova" className={styles.link}>Nova Matéria</Link>
          </div>
        </div>

        {/* Social */}
        <div className={styles.social}>
          <h4 className={styles.linkTitle}>Redes Sociais</h4>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialBtn} id="footer-instagram" title="Instagram">
              <Share2 size={18} />
            </a>
            <a href="#" className={styles.socialBtn} id="footer-youtube" title="YouTube">
              <Globe size={18} />
            </a>
            <a href="mailto:conexao@marista.br" className={styles.socialBtn} id="footer-email" title="E-mail">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {year} Gazeta Conexão · Colégio Marista Irmão Acácio</span>
          <span>Projeto de Jornalismo Escolar</span>
        </div>
      </div>
    </footer>
  );
}
