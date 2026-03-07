<template>
  <div class="board-services">
    <div class="wrap-title">
      <h2 class="title">Услуги на борту</h2>
      <h3 class="subtitle">Дополнительные услуги, доступные при аренде:</h3>
    </div>
    <div class="cards">
      <div class="row-cards">
        <div class="row-1-card card">
          <img class="image-card" src="../assets/services-1.png" alt="" />
          <span class="card-title">Кейтеринг</span>
        </div>
        <div class="row-1-card card">
          <img class="image-card" src="../assets/services-2.png" alt="" />
          <span class="card-title">Гид</span>
        </div>
        <div class="row-1-card card">
          <img class="image-card" src="../assets/services-3.png" alt="" />
          <span class="card-title">Повар</span>
        </div>
        <div class="row-1-card card">
          <img class="image-card" src="../assets/services-4.png" alt="" />
          <span class="card-title">Бармен</span>
        </div>
        <div class="row-1-card card">
          <img class="image-card" src="../assets/services-5.png" alt="" />
          <span class="card-title">Фотограф</span>
        </div>
      </div>
      <div class="row-cards">
        <div class="row-2-card card">
          <img class="image-card" src="../assets/services-6.png" alt="" />
          <span class="card-title">Украшение палубы</span>
        </div>
        <div class="row-2-card card">
          <img class="image-card" src="../assets/services-7.png" alt="" />
          <span class="card-title">Ведущий</span>
        </div>
        <div class="row-2-card card">
          <img class="image-card" src="../assets/services-8.png" alt="" />
          <span class="card-title">Диджей</span>
        </div>
        <div class="row-2-card card">
          <img class="image-card" src="../assets/services-9.png" alt="" />
          <span class="card-title">Живая музыка</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-services {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.wrap-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
}
.subtitle {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  color: #1a1a1a;
  opacity: 0.7;
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.row-cards {
  display: flex;
  gap: 12px;
}
.row-1-card {
  flex: 1;
}
.row-2-card {
  flex: 1;
}
.card {
  position: relative;
  width: 100%;
  height: 192px;
  display: flex;
  align-items: flex-end;
  padding: 16px 24px;
  border-radius: 12px;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      232deg,
      rgba(0, 0, 0, 0) 28.07%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    linear-gradient(
      207.02deg,
      rgba(0, 0, 0, 0) 47.19%,
      rgba(0, 0, 0, 0.8) 89.84%
    );
  z-index: 1;
  pointer-events: none;
}

.image-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  z-index: 0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0;
  z-index: 2;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .subtitle {
        font-size: 16px;
    }
    
    .card {
        height: 160px;
    }
}

@media (max-width: 768px) {
    .board-services {
        gap: 24px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .subtitle {
        font-size: 14px;
    }
    
    .cards {
        gap: 8px;
    }
    
    .row-cards {
        flex-direction: column;
        gap: 8px;
    }
    
    .row-1-card,
    .row-2-card {
        width: 100%;
        height: 140px;
    }
    
    .card {
        padding: 12px 20px;
    }
    
    .card-title {
        font-size: 15px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .subtitle {
        font-size: 13px;
    }
    
    .card {
        height: 120px;
        padding: 12px 16px;
    }
    
    .card-title {
        font-size: 14px;
    }
}
</style>
