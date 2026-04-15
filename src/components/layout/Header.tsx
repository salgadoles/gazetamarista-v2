'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRadio } from '@/context/RadioContext';
import {
  Radio, Newspaper, Menu, X, Search, User, LogOut,
  ChevronDown, BookOpen, Mic2, Home, Star
} from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const { isPlaying, toggle } = useRadio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <Link href="/" className={styles.brand}>
          <img src="/images/graficos/image-removebg-preview (9) 1.png" alt="Projeto Conexão" className={styles.logoImg} />
          <img src="/images/graficos/image-removebg-preview (1) 1 (1).png" alt="Gazeta Marista" className={styles.logoImg} />
        </Link>

        {/* Desktop Nav */}
        <nav className={`${styles.nav} hide-mobile`}>
          <Link href="/" className={styles.navLink}>
            <Home size={15} /> Início
          </Link>
          <Link href="/sobre" className={styles.navLink}>
            <Star size={15} /> O Projeto
          </Link>
          <Link href="/materias" className={styles.navLink}>
            <BookOpen size={15} /> Matérias
          </Link>
          <Link href="/radio" className={styles.navLink}>
            <Mic2 size={15} /> Rádio
          </Link>
          <Link href="/jornal" className={styles.navLink}>
            <Newspaper size={15} /> Jornal
          </Link>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Radio mini toggle */}
          <button
            className={`${styles.radioToggle} ${isPlaying ? styles.radioPlaying : ''}`}
            onClick={toggle}
            title={isPlaying ? 'Pausar rádio' : 'Ouvir rádio'}
            id="header-radio-toggle"
          >
            <Radio size={16} />
            {isPlaying && <span className={styles.radioWaves}>
              <span /><span /><span />
            </span>}
            <span className="hide-mobile">Rádio</span>
          </button>

          {user ? (
            <div className={styles.userMenu}>
              <button
                className={styles.userBtn}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                id="header-user-menu"
              >
                <div className={styles.userAvatar}>
                  {user.name.charAt(0)}
                </div>
                <span className="hide-mobile">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>
              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <Link href="/redator" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                    <BookOpen size={15} /> Meu Painel
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className={styles.dropdownItem} onClick={() => setUserMenuOpen(false)}>
                      <User size={15} /> Admin
                    </Link>
                  )}
                  <hr className={styles.dropdownDivider} />
                  <button
                    className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    id="header-logout"
                  >
                    <LogOut size={15} /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/entrar" className="btn btn-primary btn-sm" id="header-login">
              <User size={15} /> Entrar
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            id="header-menu-toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <Home size={18} /> Início
          </Link>
          <Link href="/sobre" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <Star size={18} /> O Projeto
          </Link>
          <Link href="/materias" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <BookOpen size={18} /> Matérias
          </Link>
          <Link href="/radio" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <Mic2 size={18} /> Rádio
          </Link>
          <Link href="/jornal" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
            <Newspaper size={18} /> Jornal
          </Link>
          {!user && (
            <Link href="/entrar" className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setMenuOpen(false)}>
              <User size={16} /> Entrar / Cadastrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
