<template>
  <div class="how-to-order">
    <h2 class="title">Как заказать</h2>
    <div class="cards">
      <div class="card">
        <div class="count">1</div>
        <span class="card-title">Оформление заявки</span>
        <p class="card-desc">
          Свяжитесь с нами удобным способом: по телефону, в мессенджерах или
          через форму на сайте. Мы быстро примем запрос и уточним детали
          поездки.
        </p>
      </div>
      <div class="card">
        <div class="count">2</div>
        <span class="card-title">Подбор судна под ваш запрос</span>
        <p class="card-desc">
          Мы предлагаем не один случайный вариант, а несколько подходящих
          судов с учетом маршрута, числа гостей, формата отдыха, даты и нужных
          услуг на борту.
        </p>
      </div>
      <div class="card">
        <div class="count">3</div>
        <span class="card-title">Резервирование и оплата</span>
        <p class="card-desc">
          После согласования программы фиксируем бронь и отправляем понятные
          условия оплаты. Доступны карта, наличный расчет и безналичная оплата
          для компаний.
        </p>
      </div>
      <div class="card">
        <div class="count">4</div>
        <span class="card-title">Прогулка в назначенное время</span>
        <p class="card-desc">
          В день выхода экипаж заранее подготовит судно, а посадка пройдет без
          спешки. Вам останется только приехать к причалу и отправиться на
          воду.
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
