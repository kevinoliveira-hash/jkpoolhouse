/* ============================================================
   BLOG.JS - News & Tips Section
   JK Pool House
   ============================================================ */

'use strict';

// ============================================================
// BLOG POSTS DATA
// ============================================================
const blogPosts = [
    {
        id: 1,
        title: 'Como organizar a festa perfeita na JK Pool House',
        excerpt: 'Descubra dicas essenciais para planejar um evento inesquecível, desde a lista de convidados até a decoração ideal.',
        image: 'imagens/area gourmet.jpg',
        category: 'Dicas',
        date: 'Fevereiro 2026',
        readTime: '5 min',
        featured: true
    },
    {
        id: 2,
        title: 'Day Use vs Pernoite: Qual escolher?',
        excerpt: 'Entenda as diferenças entre as modalidades e descubra qual experiência combina mais com seu evento ou hospedagem.',
        image: 'imagens/piscina com hidro.jpg',
        category: 'Informações',
        date: 'Janeiro 2026',
        readTime: '4 min',
        featured: false
    },
    {
        id: 3,
        title: 'Benefícios de alugar uma casa com piscina para eventos',
        excerpt: 'Saiba por que uma casa particular oferece mais privacidade, conforto e liberdade que espaços tradicionais.',
        image: 'imagens/area lazer.jpg',
        category: 'Dicas',
        date: 'Dezembro 2025',
        readTime: '6 min',
        featured: false
    },
    {
        id: 4,
        title: 'O que levar para seu Day Use na JK Pool House',
        excerpt: 'Preparamos uma lista completa do que você precisa levar para aproveitar ao máximo seu dia de lazer conosco.',
        image: 'imagens/churrasqueira e  cozinha.jpg',
        category: 'Tutoriais',
        date: 'Novembro 2025',
        readTime: '3 min',
        featured: false
    }
];

// ============================================================
// INIT BLOG SECTION
// ============================================================
function initBlogSection() {
    // Find where to insert blog section (before FAQ)
    const faqSection = document.getElementById('faq');
    if (!faqSection) return;

    const blogSection = document.createElement('section');
    blogSection.className = 'section blog';
    blogSection.id = 'blog';
    blogSection.setAttribute('aria-label', 'Blog e Novidades');
    blogSection.innerHTML = `
        <div class="container">
            <div class="section-header reveal">
                <span class="section-label">✦ Blog</span>
                <h2 class="section-title">Dicas & Novidades</h2>
                <div class="section-divider"></div>
                <p class="section-subtitle">
                    Fique por dentro das melhores dicas para aproveitar ao máximo sua experiência na JK Pool House.
                </p>
            </div>

            <div class="blog-grid" id="blogGrid">
                ${renderBlogPosts()}
            </div>

            <div class="blog-cta reveal">
                <button class="btn btn-gold-border" onclick="showAllPosts()">
                    Ver todos os artigos
                </button>
            </div>
        </div>
    `;

    faqSection.parentNode.insertBefore(blogSection, faqSection);
    addBlogStyles();
}

// ============================================================
// RENDER BLOG POSTS
// ============================================================
function renderBlogPosts() {
    // Show only first 2 posts initially
    const postsToShow = blogPosts.slice(0, 2);
    
    return postsToShow.map(post => `
        <article class="blog-card reveal" style="transition-delay: ${post.id * 0.1}s">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-category">${post.category}</span>
                ${post.featured ? '<span class="blog-featured">⭐ Destaque</span>' : ''}
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${post.date}</span>
                    <span class="blog-read-time">⏱ ${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="blog-read-more" onclick="openBlogPost(${post.id})">
                    Ler mais →
                </button>
            </div>
        </article>
    `).join('');
}

// ============================================================
// SHOW ALL POSTS
// ============================================================
function showAllPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    const allPostsHtml = blogPosts.map(post => {
        return `
        <article class="blog-card reveal active" style="transition-delay: ${post.id * 0.1}s">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-category">${post.category}</span>
                ${post.featured ? '<span class="blog-featured">⭐ Destaque</span>' : ''}
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${post.date}</span>
                    <span class="blog-read-time">⏱ ${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="blog-read-more" onclick="openBlogPost(${post.id})">
                    Ler mais →
                </button>
            </div>
        </article>`;
    }).join('');

    grid.innerHTML = allPostsHtml;

    // Hide the "see all" button
    const cta = document.querySelector('.blog-cta');
    if (cta) cta.style.display = 'none';
}

// ============================================================
// OPEN BLOG POST (WhatsApp share simulation)
// ============================================================
function openBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    const message = `Olá! Vi o artigo "${post.title}" no site da JK Pool House e gostaria de mais informações!`;
    const url = `https://wa.me/5511966152805?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ============================================================
// ADD BLOG STYLES
// ============================================================
function addBlogStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .blog { background: linear-gradient(180deg, #0a0a0a, #050505); }
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .blog-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.4s ease;
        }
        .blog-card:hover {
            transform: translateY(-8px);
            border-color: rgba(212,175,55,0.2);
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .blog-image {
            position: relative;
            height: 220px;
            overflow: hidden;
        }
        .blog-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.6s ease;
        }
        .blog-card:hover .blog-image img { transform: scale(1.08); }
        .blog-category {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: rgba(5,5,5,0.8);
            backdrop-filter: blur(10px);
            padding: 0.25rem 1rem;
            border-radius: 999px;
            font-size: 0.7rem;
            color: #D4AF37;
            letter-spacing: 1px;
            text-transform: uppercase;
            border: 1px solid rgba(212,175,55,0.2);
        }
        .blog-featured {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: linear-gradient(135deg, #B8960F, #D4AF37);
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            font-size: 0.7rem;
            color: #050505;
            font-weight: 600;
        }
        .blog-content {
            padding: 1.5rem;
        }
        .blog-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.75rem;
            font-size: 0.75rem;
            color: #6B6B6B;
        }
        .blog-title {
            font-family: 'Cinzel', serif;
            font-size: 1.1rem;
            color: #fff;
            margin-bottom: 0.75rem;
            line-height: 1.4;
        }
        .blog-excerpt {
            font-size: 0.85rem;
            color: #C8C8C8;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        .blog-read-more {
            background: none;
            border: none;
            color: #D4AF37;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            padding: 0;
            transition: 0.3s ease;
            font-family: inherit;
        }
        .blog-read-more:hover {
            color: #F4D27A;
            transform: translateX(5px);
        }
        .blog-cta {
            text-align: center;
            margin-top: 2rem;
        }

        @media (max-width: 767px) {
            .blog-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            .blog-image { height: 180px; }
            .blog-content { padding: 1rem; }
            .blog-title { font-size: 1rem; }
        }
    `;
    document.head.appendChild(style);
}

// Expose functions globally
window.showAllPosts = showAllPosts;
window.openBlogPost = openBlogPost;

// Auto-init
document.addEventListener('DOMContentLoaded', initBlogSection);

