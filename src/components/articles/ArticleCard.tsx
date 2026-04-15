import Link from 'next/link';
import { Calendar, User, Eye } from 'lucide-react';
import styles from './ArticleCard.module.css';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  authorName: string;
  date: string;
  tags: string[];
  views?: number;
  featured?: boolean;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'hero' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  if (variant === 'hero') {
    return (
      <Link href={`/materias/${article.slug}`} className={styles.hero} id={`article-hero-${article.id}`}>
        {/* Background image or gradient */}
        <div className={styles.heroBg}>
          {article.coverImage ? (
            <div className={styles.heroImg} style={{ backgroundImage: `url(${article.coverImage})` }} />
          ) : (
            <div className={styles.heroGradient} />
          )}
          <div className={styles.heroOverlay} />
        </div>

        {/* Content */}
        <div className={styles.heroContent}>
          {article.featured && (
            <div className={`badge badge-featured ${styles.featuredBadge}`}>
              ⭐ Destaque
            </div>
          )}
          <div className={styles.heroTags}>
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className={`tag ${styles.heroTag}`}>{tag}</span>
            ))}
          </div>
          <h1 className={styles.heroTitle}>{article.title}</h1>
          <p className={styles.heroExcerpt}>{article.excerpt}</p>
          <div className={styles.heroMeta}>
            <span className={styles.metaItem}>
              <User size={14} /> {article.authorName}
            </span>
            <span className={styles.metaItem}>
              <Calendar size={14} /> {formattedDate}
            </span>
            {article.views !== undefined && (
              <span className={styles.metaItem}>
                <Eye size={14} /> {article.views} visualizações
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/materias/${article.slug}`} className={styles.compact} id={`article-compact-${article.id}`}>
        <div className={styles.compactImg}>
          {article.coverImage ? (
            <div style={{ backgroundImage: `url(${article.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', borderRadius: 'var(--radius-sm)' }} />
          ) : (
            <div className={`img-placeholder ${styles.compactPlaceholder}`}>
              {article.title.charAt(0)}
            </div>
          )}
        </div>
        <div className={styles.compactBody}>
          <div className={styles.compactTag}>{article.tags[0]}</div>
          <h3 className={styles.compactTitle}>{article.title}</h3>
          <div className={styles.compactMeta}>{formattedDate}</div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/materias/${article.slug}`} className={`card ${styles.card}`} id={`article-card-${article.id}`}>
      <div className={styles.cardImg}>
        {article.coverImage ? (
          <div style={{ backgroundImage: `url(${article.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }} />
        ) : (
          <div className={`img-placeholder ${styles.imgPlaceholder}`}>
            {article.title.charAt(0)}
          </div>
        )}
        {article.featured && (
          <div className={`badge badge-featured ${styles.cardFeaturedBadge}`}>⭐ Destaque</div>
        )}
      </div>
      <div className="card-body">
        <div className={styles.cardTags}>
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <h2 className={styles.cardTitle}>{article.title}</h2>
        <p className={styles.cardExcerpt}>{article.excerpt}</p>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <User size={13} /> {article.authorName}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={13} /> {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
}
