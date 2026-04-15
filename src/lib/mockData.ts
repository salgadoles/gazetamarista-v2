export type ArticleStatus = 'pending' | 'published' | 'featured';

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  tags: string[];
  status: ArticleStatus;
  featured?: boolean;
  views?: number;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'festival-cultural-2025',
    title: 'Festival Cultural Marista: Uma Celebração de Talentos',
    excerpt: 'O maior evento do colégio reuniu centenas de alunos em apresentações de música, teatro e dança que emocionaram toda a comunidade escolar.',
    content: `<p>O Festival Cultural Marista 2025 foi um marco na história do Colégio Irmão Acácio. Por três dias consecutivos, os corredores e pátios se transformaram em palcos de expressão artística, reunindo alunos do 6º ano ao 3º ano do Ensino Médio.</p>
    <p>As apresentações incluíram grupos de teatro, conjuntos musicais, exposições de artes visuais e performances de dança contemporânea. Cada turma preparou seu número com semanas de antecedência, sob a orientação dos professores das áreas de Artes e Educação Física.</p>
    <h2>Destaques da programação</h2>
    <p>A peça "Conexões", apresentada pelos alunos do 9º ano, foi considerada o ponto alto do evento. Com roteiro criado coletivamente pelos próprios alunos, a obra abordou temas como amizade, diversidade e inclusão de forma poética e sensível.</p>
    <p>"Participar do Festival foi uma experiência transformadora. Aprendi mais sobre mim mesmo e sobre meus colegas do que em qualquer sala de aula", contou Lucas Ferreira, do 9º ano B.</p>`,
    coverImage: '/images/festival.jpg',
    authorId: 'u1',
    authorName: 'Ana Carolina Silva',
    authorAvatar: '/avatars/ana.jpg',
    date: '2025-11-15',
    tags: ['cultura', 'eventos', 'arte'],
    status: 'published',
    featured: true,
    views: 342,
  },
  {
    id: '2',
    slug: 'time-futsal-campeonato',
    title: 'Time de Futsal Avança para as Semifinais dos Jogos Escolares',
    excerpt: 'Com uma campanha invicta na fase de grupos, nossa equipe se classifica para as semifinais e sonha com o título estadual.',
    content: `<p>A equipe de futsal do Colégio Marista Irmão Acácio garantiu sua vaga nas semifinais dos Jogos Escolares do Paraná com uma campanha impressionante na fase de grupos: cinco vitórias e nenhuma derrota.</p>
    <p>O time, comandado pelo professor Marcos, soma 23 gols marcados e apenas 4 sofridos, demonstrando equilíbrio entre o ataque veloz e uma defesa sólida.</p>`,
    coverImage: '/images/futsal.jpg',
    authorId: 'u2',
    authorName: 'Pedro Henrique Matos',
    authorAvatar: '/avatars/pedro.jpg',
    date: '2025-11-10',
    tags: ['esportes', 'futsal', 'jogos escolares'],
    status: 'published',
    featured: false,
    views: 218,
  },
  {
    id: '3',
    slug: 'projeto-horta-sustentavel',
    title: 'Projeto Horta Sustentável Transforma o Espaço do Colégio',
    excerpt: 'Alunos do Ensino Fundamental criam horta orgânica que já abastece a cantina com legumes e ervas frescas.',
    content: `<p>Uma parceria entre a disciplina de Ciências e a gestão do colégio deu origem ao Projeto Horta Sustentável, que em apenas seis meses já produziu mais de 50kg de alimentos orgânicos consumidos na própria cantina.</p>
    <p>Os alunos do 7º e 8º anos são responsáveis por todo o ciclo: preparo do solo, plantio, rega, adubação e colheita. O projeto também inclui compostagem, transformando os resíduos orgânicos da cantina em adubo natural.</p>`,
    coverImage: '/images/horta.jpg',
    authorId: 'u3',
    authorName: 'Beatriz Oliveira',
    authorAvatar: '/avatars/beatriz.jpg',
    date: '2025-11-05',
    tags: ['sustentabilidade', 'ciências', 'projetos'],
    status: 'published',
    featured: false,
    views: 156,
  },
  {
    id: '4',
    slug: 'olimpiada-matematica-medalhas',
    title: 'Alunos Conquistam Medalhas na Olimpíada Brasileira de Matemática',
    excerpt: 'Três estudantes do Ensino Médio são premiados na OBMEP, colocando o colégio entre as melhores escolas da região.',
    content: `<p>O Colégio Marista Irmão Acácio celebra mais uma conquista acadêmica: três alunos do Ensino Médio foram premiados na Olimpíada Brasileira de Matemática das Escolas Públicas (OBMEP), obtendo uma medalha de prata e duas menções honrosas.</p>`,
    coverImage: '/images/matematica.jpg',
    authorId: 'u1',
    authorName: 'Ana Carolina Silva',
    authorAvatar: '/avatars/ana.jpg',
    date: '2025-10-28',
    tags: ['matemática', 'olimpíadas', 'acadêmico'],
    status: 'published',
    featured: false,
    views: 289,
  },
  {
    id: '5',
    slug: 'visita-museu-arte-londrina',
    title: 'Turmas do 8º Ano Visitam Museu de Arte de Londrina',
    excerpt: 'Projeto pedagógico leva alunos para experiência cultural enriquecedora no Museu de Arte de Londrina.',
    content: `<p>As turmas do 8º ano realizaram uma visita ao Museu de Arte de Londrina como parte do projeto interdisciplinar que une Arte, História e Português. A exposição "Memórias do Paraná" apresentou obras que retratam a história e cultura do estado.</p>`,
    coverImage: '/images/museu.jpg',
    authorId: 'u3',
    authorName: 'Beatriz Oliveira',
    authorAvatar: '/avatars/beatriz.jpg',
    date: '2025-10-20',
    tags: ['cultura', 'arte', 'passeios'],
    status: 'published',
    featured: false,
    views: 127,
  },
  {
    id: '6',
    slug: 'radio-conexao-aniversario',
    title: 'Rádio Conexão Completa 3 Anos com Programação Especial',
    excerpt: 'A rádio escolar do Colégio Marista celebra três anos de transmissões com um dia especial de programação ao vivo.',
    content: `<p>A Rádio Conexão, voz da comunidade do Colégio Marista Irmão Acácio, comemora três anos de transmissões ininterruptas. Para celebrar, uma programação especial foi preparada pelos próprios alunos locutores.</p>`,
    coverImage: '/images/radio.jpg',
    authorId: 'u2',
    authorName: 'Pedro Henrique Matos',
    authorAvatar: '/avatars/pedro.jpg',
    date: '2025-10-15',
    tags: ['rádio', 'conexão', 'comunicação'],
    status: 'published',
    featured: false,
    views: 198,
  },
];

export const mockTags = [
  { id: 't1', name: 'cultura', slug: 'cultura', count: 12 },
  { id: 't2', name: 'esportes', slug: 'esportes', count: 9 },
  { id: 't3', name: 'eventos', slug: 'eventos', count: 15 },
  { id: 't4', name: 'acadêmico', slug: 'academico', count: 8 },
  { id: 't5', name: 'sustentabilidade', slug: 'sustentabilidade', count: 5 },
  { id: 't6', name: 'arte', slug: 'arte', count: 11 },
  { id: 't7', name: 'rádio', slug: 'radio', count: 7 },
  { id: 't8', name: 'projetos', slug: 'projetos', count: 6 },
  { id: 't9', name: 'ciências', slug: 'ciencias', count: 4 },
  { id: 't10', name: 'matemática', slug: 'matematica', count: 3 },
  { id: 't11', name: 'futsal', slug: 'futsal', count: 5 },
  { id: 't12', name: 'olimpíadas', slug: 'olimpiadas', count: 3 },
];

export const mockAuthors = [
  {
    id: 'u1',
    name: 'Ana Carolina Silva',
    avatar: '/avatars/ana.jpg',
    bio: 'Redatora do 3º ano do Ensino Médio. Apaixonada por jornalismo e fotografia.',
    turma: '3º Ano A',
    articlesCount: 8,
  },
  {
    id: 'u2',
    name: 'Pedro Henrique Matos',
    avatar: '/avatars/pedro.jpg',
    bio: 'Locutor da Rádio Conexão e redator esportivo. Fã de futsal e música.',
    turma: '2º Ano B',
    articlesCount: 5,
  },
  {
    id: 'u3',
    name: 'Beatriz Oliveira',
    avatar: '/avatars/beatriz.jpg',
    bio: 'Curiosa por natureza e sustentabilidade. Escreve sobre ciências e meio ambiente.',
    turma: '1º Ano C',
    articlesCount: 4,
  },
];

export const mockEditions = [
  {
    id: 'e1',
    title: 'Edição de Novembro 2025',
    number: 12,
    date: '2025-11-01',
    coverImage: '/images/jornal-nov.jpg',
    pdfUrl: '#',
  },
  {
    id: 'e2',
    title: 'Edição de Outubro 2025',
    number: 11,
    date: '2025-10-01',
    coverImage: '/images/jornal-out.jpg',
    pdfUrl: '#',
  },
  {
    id: 'e3',
    title: 'Edição de Setembro 2025',
    number: 10,
    date: '2025-09-01',
    coverImage: '/images/jornal-set.jpg',
    pdfUrl: '#',
  },
];

export const mockEvents = [
  { id: 'ev1', title: 'Formatura do Ensino Médio', date: '2025-12-10', location: 'Teatro Municipal de Londrina' },
  { id: 'ev2', title: 'Feira de Ciências', date: '2025-11-28', location: 'Pátio Central do Colégio' },
  { id: 'ev3', title: 'Gincana Solidária', date: '2025-11-20', location: 'Quadra Poliesportiva' },
];

export const mockPrograms = [
  { id: 'p1', title: 'Acordes da Manhã', time: '07h - 08h', host: 'Pedro Henrique', days: 'Segunda a Sexta' },
  { id: 'p2', title: 'Notícias em Foco', time: '08h - 09h', host: 'Ana Carolina', days: 'Segunda a Sexta' },
  { id: 'p3', title: 'Tarde com Música', time: '13h - 14h', host: 'Beatriz Oliveira', days: 'Terça e Quinta' },
  { id: 'p4', title: 'Pauta Livre', time: '14h - 15h', host: 'Equipe Conexão', days: 'Sexta-Feira' },
];
