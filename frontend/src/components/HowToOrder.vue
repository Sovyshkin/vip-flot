<template>
  <div class="how-to-order">
    <h2 class="title">Как заказать</h2>
    <div class="cards">
      <div class="card">
        <div class="count">1</div>
        <span class="card-title">Оформление заявки</span>
        <p class="card-desc">
          Забронировать судно можно по телефону +7 (812) 660-55-16, написав нам
          в WhatsApp и Telegram или оставив заявку через формы
        </p>
      </div>
      <div class="card">
        <div class="count">2</div>
        <span class="card-title">Подбор судна под ваш запрос</span>
        <p class="card-desc">
          Специалист в течение 10 минут подберёт подходящие варианты исходя из
          ваших потребностей: маршрут, количество человек, дата и время, цель
          прогулки, услуги
        </p>
      </div>
      <div class="card">
        <div class="count">3</div>
        <span class="card-title">Резервирование и оплата</span>
        <p class="card-desc">
          Бронирование осуществляется по предоплате. Оплатить можно: картой,
          наличными, по безналичному расчёту (для юр. лиц)
        </p>
      </div>
      <div class="card">
        <div class="count">4</div>
        <span class="card-title">Прогулка в назначенное время</span>
        <p class="card-desc">
          Прогулка в назначенное время Подготовленное судно будет ждать вас в
          назначенное время на причале!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.how-to-order {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
}

.cards {
  display: flex;
  gap: 12px;
}

.card {
    flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
}

.count {
    background-color: #0076FC;
    border-radius: 16px;
    width: 64px;
    height: 64px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 32px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0px;
  padding-top: 12px;
}

.card-desc {
    color: rgba(26, 26, 26, 0.7);
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 0px;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .cards {
        gap: 10px;
    }
    
    .count {
        width: 56px;
        height: 56px;
        font-size: 28px;
    }
    
    .card-title {
        font-size: 18px;
    }
    
    .card-desc {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    .how-to-order {
        gap: 24px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .cards {
        flex-direction: column;
        gap: 12px;
    }
    
    .card {
        width: 100%;
        padding: 20px;
    }
    
    .count {
        width: 48px;
        height: 48px;
        font-size: 24px;
    }
    
    .card-title {
        font-size: 17px;
        padding-top: 8px;
    }
    
    .card-desc {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        padding: 16px;
    }
    
    .count {
        width: 44px;
        height: 44px;
        font-size: 22px;
    }
    
    .card-title {
        font-size: 16px;
    }
    
    .card-desc {
        font-size: 13px;
    }
}
</style>
