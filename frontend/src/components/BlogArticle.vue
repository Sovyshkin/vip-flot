<template>
  <div v-if="article" class="article-detail">
    <div class="hero-section">
      <div class="hero-image">
        <img :src="article.image" :alt="article.title">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="article-meta">
            <span class="article-category">{{ article.category }}</span>
            <span class="article-date">{{ article.date }}</span>
          </div>
          <h1 class="article-title">{{ article.title }}</h1>
          <p class="article-description">{{ article.description }}</p>
        </div>
      </div>
    </div>

    <div class="article-content">
      <div class="content-wrapper">
        <article class="article-body" v-html="article.content"></article>
        
        <div class="article-footer">
          <button @click="goBack" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Вернуться к блогу
          </button>
        </div>
      </div>
      
      <div class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">Другие статьи</h3>
          <div class="related-articles">
            <div v-for="relatedArticle in relatedArticles" :key="relatedArticle.id" 
                 class="related-item"
                 @click="goToArticle(relatedArticle.slug)">
              <img :src="relatedArticle.image" :alt="relatedArticle.title" class="related-thumb">
              <div class="related-info">
                <span class="related-category">{{ relatedArticle.category }}</span>
                <span class="related-title">{{ relatedArticle.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DetailPageSections />
  </div>
  
  <div v-else class="not-found">
    <h1>Статья не найдена</h1>
    <button @click="goBack" class="back-btn">Вернуться к блогу</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleBySlug, articles } from '../data/blog-articles'
import DetailPageSections from './DetailPageSections.vue'

const route = useRoute()
const router = useRouter()
const article = ref(null)

onMounted(() => {
  const slug = route.params.slug
  article.value = getArticleBySlug(slug)
  
  if (article.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return articles
    .filter(a => a.id !== article.value.id)
    .slice(0, 3)
})

function goBack() {
  router.push({ name: 'Main', hash: '#blog' })
}

function goToArticle(slug) {
  router.push({ name: 'BlogArticle', params: { slug } })
  article.value = getArticleBySlug(slug)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.article-detail {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}

.hero-section {
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 120px;
  color: white;
  z-index: 1;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.article-category {
  background: rgba(0, 102, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.article-date {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.article-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  max-width: 900px;
}

.article-description {
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.95;
  max-width: 800px;
}

.article-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 120px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  align-items: start;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-body {
  color: #1A1A1A;
  font-size: 18px;
  line-height: 1.8;
}

.article-body :deep(h2) {
  font-size: 32px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #1A1A1A;
}

.article-body :deep(h3) {
  font-size: 24px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 16px;
  color: #1A1A1A;
}

.article-body :deep(p) {
  margin-bottom: 20px;
  color: #333;
}

.article-body :deep(ul) {
  margin: 20px 0;
  padding-left: 24px;
}

.article-body :deep(li) {
  margin-bottom: 12px;
  color: #333;
}

.article-body :deep(strong) {
  color: #1A1A1A;
  font-weight: 600;
}

.article-footer {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e0e0e0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0066FF;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.back-btn:hover {
  background: #0052CC;
  transform: translateY(-2px);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.sidebar {
  position: sticky;
  top: 120px;
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1A1A1A;
}

.related-articles {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-item {
  display: flex;
  gap: 16px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.3s;
}

.related-item:hover {
  background: #f8f9fa;
}

.related-thumb {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.related-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.related-category {
  color: #0066FF;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.related-title {
  color: #1A1A1A;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 60px 20px;
}

.not-found h1 {
  font-size: 36px;
  font-weight: 700;
  color: #1A1A1A;
}

@media (max-width: 1200px) {
  .hero-content {
    padding: 40px 60px;
  }
  
  .article-content {
    padding: 40px 60px;
    gap: 40px;
  }
  
  .content-wrapper {
    padding: 36px;
  }
}

@media (max-width: 1024px) {
  .article-content {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-content {
    padding: 30px 20px;
  }
  
  .article-category {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .article-date {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .article-title {
    font-size: 32px;
  }
  
  .article-description {
    font-size: 16px;
  }
  
  .article-content {
    padding: 30px 20px;
  }
  
  .content-wrapper {
    padding: 24px;
  }
  
  .article-body {
    font-size: 16px;
  }
  
  .article-body :deep(h2) {
    font-size: 24px;
  }
  
  .article-body :deep(h3) {
    font-size: 20px;
  }
  
  .sidebar-card {
    padding: 24px;
  }
  
  .sidebar-title {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 350px;
  }
  
  .hero-content {
    padding: 24px 16px;
  }
  
  .article-meta {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .article-category {
    font-size: 11px;
    padding: 6px 10px;
  }
  
  .article-date {
    font-size: 11px;
    padding: 6px 10px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-description {
    font-size: 14px;
  }
  
  .article-content {
    padding: 24px 16px;
  }
  
  .content-wrapper {
    padding: 20px;
  }
  
  .article-body {
    font-size: 15px;
  }
  
  .article-body :deep(h2) {
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 16px;
  }
  
  .article-body :deep(h3) {
    font-size: 18px;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  
  .article-body :deep(p) {
    margin-bottom: 16px;
  }
  
  .article-body :deep(ul) {
    margin: 16px 0;
  }
  
  .back-btn {
    padding: 12px 20px;
    font-size: 14px;
  }
  
  .sidebar-card {
    padding: 20px;
  }
  
  .sidebar-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .related-thumb {
    width: 60px;
    height: 60px;
  }
  
  .related-category {
    font-size: 11px;
  }
  
  .related-title {
    font-size: 13px;
  }
  
  .not-found h1 {
    font-size: 24px;
  }
}
</style>
