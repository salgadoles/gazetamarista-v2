import { mockEditions } from '@/lib/mockData';
import { Newspaper, Download, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jornal Digital',
  description: 'Edições do Jornal Conexão — versão digital do jornal impresso do Colégio Marista Irmão Acácio',
};

export default function JornalPage() {
  const latest = mockEditions[0];
  const older = mockEditions.slice(1);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerIcon}><Newspaper size={32} /></div>
          <h1 className={styles.pageTitle}>Jornal Conexão</h1>
          <p className={styles.pageSubtitle}>
            A versão digital do jornal impresso do Colégio Marista Irmão Acácio
          </p>
        </div>
      </div>

      <div className="container section">

        {/* Latest Edition Feature */}
        <div className={styles.latestEdition}>
          <div className={styles.latestBadge}>
            <span className="badge badge-featured">📰 Edição Atual — Nº {latest.number}</span>
          </div>
          <div className={styles.latestContent}>
            <div className={styles.latestInfo}>
              <h2 className={styles.latestTitle}>{latest.title}</h2>
              <p className={styles.latestDate}>
                <Calendar size={15} />
                {new Date(latest.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
              <p className={styles.latestDesc}>
                A edição mais recente do nosso jornal school traz as principais matérias produzidas
                pelos alunos do projeto Conexão. Confira reportagens, entrevistas exclusivas e
                muito mais conteúdo feito por quem vive a escola todos os dias.
              </p>
              <div className={styles.latestActions}>
                <a href={latest.pdfUrl} className="btn btn-primary btn-lg" id="jornal-read-latest">
                  <BookOpen size={18} /> Ler Edição Completa
                </a>
                <a href={latest.pdfUrl} className="btn btn-outline" download id="jornal-download-latest">
                  <Download size={16} /> Baixar PDF
                </a>
              </div>
            </div>
            <div className={styles.latestPreview}>
              <div className={styles.latestPreviewInner}>
                <div className={styles.previewHeader}>
                  <div className={styles.previewLogo}>CONEXÃO</div>
                  <div className={styles.previewEdition}>Edição {latest.number}</div>
                </div>
                <div className={styles.previewLines}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.previewLine} style={{ width: `${60 + Math.random() * 40}%` }} />
                  ))}
                </div>
                <div className={styles.previewOverlay}>
                  <ExternalLink size={24} />
                  <span>Clique para ler</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Older Editions */}
        {older.length > 0 && (
          <div className={styles.olderSection}>
            <h2 className="section-title">Edições Anteriores</h2>
            <div className={styles.editionsList}>
              {older.map(edition => (
                <div key={edition.id} className={styles.editionCard}>
                  <div className={styles.editionIcon}>
                    <Newspaper size={22} />
                    <span className={styles.editionNum}>Nº {edition.number}</span>
                  </div>
                  <div className={styles.editionInfo}>
                    <h3 className={styles.editionTitle}>{edition.title}</h3>
                    <p className={styles.editionDate}>
                      <Calendar size={13} />
                      {new Date(edition.date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={styles.editionActions}>
                    <a href={edition.pdfUrl} className="btn btn-outline btn-sm" id={`jornal-read-${edition.id}`}>
                      <BookOpen size={14} /> Ler
                    </a>
                    <a href={edition.pdfUrl} className="btn btn-ghost btn-sm" download id={`jornal-download-${edition.id}`}>
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
