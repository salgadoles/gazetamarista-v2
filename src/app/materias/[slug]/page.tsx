import { mockArticles } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Eye, Tag, ArrowLeft } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import styles from './page.module.css';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockArticles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) notFound();

  const related = mockArticles
    .filter(a => a.id !== article.id && a.tags.some(t => article.tags.includes(t)))
    .slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <article className={styles.page}>
      {/* Back breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/materias" className={styles.backLink}>
            <ArrowLeft size={16} /> Voltar para Matérias
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGradient} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.tagRow}>
            {article.tags.map(tag => (
              <Link key={tag} href={`/materias?tag=${tag}`} className="tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                <Tag size={11} /> {tag}
              </Link>
            ))}
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <div className={styles.meta}>
            <Link href={`/autores/${article.authorId}`} className={styles.authorLink}>
              <div className={styles.authorAvatar}>{article.authorName.charAt(0)}</div>
              <div>
                <div className={styles.authorName}>{article.authorName}</div>
                <div className={styles.authorRole}>Redator Conexão</div>
              </div>
            </Link>
            <div className={styles.metaRight}>
              <span className={styles.metaItem}><Calendar size={14} /> {formattedDate}</span>
              {article.views && <span className={styles.metaItem}><Eye size={14} /> {article.views} views</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={`container ${styles.contentWrapper}`}>
        <div className={styles.content}>
          <div
            className={`article-content ${styles.body}`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className={styles.tagsSection}>
            <h4 className={styles.tagsLabel}><Tag size={15} /> Tags relacionadas</h4>
            <div className={styles.tagList}>
              {article.tags.map(tag => (
                <Link key={tag} href={`/materias?tag=${tag}`} className="tag">{tag}</Link>
              ))}
            </div>
          </div>

          {/* Author Card */}
          <div className={styles.authorCard}>
            <div className={styles.authorCardAvatar}>{article.authorName.charAt(0)}</div>
            <div className={styles.authorCardInfo}>
              <div className={styles.authorCardLabel}>Escrito por</div>
              <Link href={`/autores/${article.authorId}`} className={styles.authorCardName}>
                {article.authorName}
              </Link>
              <p className={styles.authorCardBio}>Redator do projeto Conexão · Colégio Marista Irmão Acácio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className={`section ${styles.related}`}>
          <div className="container">
            <h2 className="section-title">Matérias Relacionadas</h2>
            <div className={`grid grid-3 ${styles.relatedGrid}`}>
              {related.map(a => (
                <ArticleCard key={a.id} article={a} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
