'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, BookOpen, Eye, EyeOff, Newspaper } from 'lucide-react';
import styles from './page.module.css';

export default function EntrarPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', password: '', turma: '',
  });

  const update = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        if (!form.name || !form.turma) throw new Error('Preencha todos os campos');
        await register({ name: form.name, email: form.email, password: form.password, turma: form.turma });
      }
      router.push('/redator');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const demoHint = mode === 'login'
    ? 'Demo: ana@colegiomarista.br / senha123 (redatora) ou admin@colegiomarista.br / admin123 (admin)'
    : '';

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftBg} />
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}><Newspaper size={28} /></div>
            <span className={styles.brandName}>Gazeta Conexão</span>
          </div>
          <h2 className={styles.leftTitle}>
            Sua voz merece ser ouvida.
          </h2>
          <p className={styles.leftDesc}>
            Entre na plataforma e publique suas matérias, participe da rádio e
            faça parte da maior gazetinha escolar de Londrina!
          </p>
          <div className={styles.features}>
            {['Escreva e publique matérias', 'Acompanhe o status das suas postagens', 'Colabore com outros redatores', 'Apareça no ranking de autores'].map((f, i) => (
              <div key={i} className={styles.feature}>
                <span className={styles.featureDot} /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          {/* Mode toggle */}
          <div className={styles.tabRow}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
              id="auth-tab-login"
            >
              Entrar
            </button>
            <button
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => { setMode('register'); setError(''); }}
              id="auth-tab-register"
            >
              Cadastrar
            </button>
          </div>

          <div className={styles.cardBody}>
            <h1 className={styles.cardTitle}>
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h1>
            <p className={styles.cardSubtitle}>
              {mode === 'login'
                ? 'Entre para acessar seu painel de redator.'
                : 'Cadastre-se e comece a escrever hoje mesmo.'}
            </p>

            {error && <div className={styles.errorBox}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === 'register' && (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-name">Nome completo</label>
                    <div className={styles.inputWrapper}>
                      <User size={16} className={styles.inputIcon} />
                      <input
                        id="auth-name"
                        type="text"
                        className={`form-input ${styles.inputPadded}`}
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-turma">Turma</label>
                    <div className={styles.inputWrapper}>
                      <BookOpen size={16} className={styles.inputIcon} />
                      <input
                        id="auth-turma"
                        type="text"
                        className={`form-input ${styles.inputPadded}`}
                        placeholder="Ex: 9º Ano B"
                        value={form.turma}
                        onChange={e => update('turma', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="auth-email">E-mail</label>
                <div className={styles.inputWrapper}>
                  <Mail size={16} className={styles.inputIcon} />
                  <input
                    id="auth-email"
                    type="email"
                    className={`form-input ${styles.inputPadded}`}
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="auth-password">Senha</label>
                <div className={styles.inputWrapper}>
                  <Lock size={16} className={styles.inputIcon} />
                  <input
                    id="auth-password"
                    type={showPass ? 'text' : 'password'}
                    className={`form-input ${styles.inputPadded} ${styles.inputPaddedRight}`}
                    placeholder="Mínimo 4 caracteres"
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.showPassBtn}
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={loading}
                id="auth-submit"
              >
                {loading ? (
                  <span className={styles.spinner} />
                ) : (
                  mode === 'login' ? 'Entrar' : 'Criar conta'
                )}
              </button>
            </form>

            {demoHint && (
              <div className={styles.demoHint}>
                <strong>🔑 Modo demo:</strong> {demoHint}
              </div>
            )}

            <div className={styles.altMode}>
              {mode === 'login'
                ? <span>Não tem conta? <button className={styles.altBtn} onClick={() => setMode('register')}>Cadastre-se</button></span>
                : <span>Já tem conta? <button className={styles.altBtn} onClick={() => setMode('login')}>Entrar</button></span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
