<template>
    <div class="routes-tours-block">
        <div class="wrap-title">
            <h1 class="title">Мероприятия на воде</h1>
            <div class="actions">
                <button type="button" class="action-btn active">Праздники</button>
                <button type="button" class="action-btn">Развлекательные программы</button>
            </div>
        </div>

        <div class="row-cards">
                <div class="row-1-card card">
                    <img class="image-card" src="../assets/activities-water-1.png" alt="">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img src="../assets/activities-water-icon-1.svg" alt="">
                            </div>
                            <h2 class="title-card">Ваш банкет фуршет</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            <div class="row-1-card card">
                <img class="image-card" src="../assets/activities-water-2.png" alt="">
                <div class="card-content">
                    <div class="card-info">
                        <div class="wrap-icon">
                            <img src="../assets/activities-water-icon-2.svg" alt="">
                        </div>
                        <h2 class="title-card">День рождения</h2>
                    </div>
                    <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                </div>
            </div>
            <div class="row-1-card card">
                <img class="image-card" src="../assets/activities-water-3.png" alt="">
                <div class="card-content">
                    <div class="card-info">
                        <div class="wrap-icon">
                            <img src="../assets/activities-water-icon-3.svg" alt="">
                        </div>
                        <h2 class="title-card">Корпоративы</h2>
                    </div>
                    <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                </div>
            </div>
        </div>
        <div class="row-cards">
                <div class="row-2-card card">
                    <img class="image-card" src="../assets/activities-water-4.png" alt="">
                    <div class="card-content">
                        <div class="card-info">
                            <div class="wrap-icon">
                                <img src="../assets/activities-water-icon-4.svg" alt="">
                            </div>
                            <h2 class="title-card">Выпускной</h2>
                        </div>
                        <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                    </div>
                </div>
            <div class="row-2-card card">
                <img class="image-card" src="../assets/activities-water-5.png" alt="">
                <div class="card-content">
                    <div class="card-info">
                        <div class="wrap-icon">
                            <img src="../assets/activities-water-icon-5.svg" alt="">
                        </div>
                        <h2 class="title-card">Свадьба</h2>
                    </div>
                    <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                </div>
            </div>
            <div class="row-2-card card">
                <img class="image-card" src="../assets/activities-water-6.png" alt="">
                <div class="card-content">
                    <div class="card-info">
                        <div class="wrap-icon">
                            <img src="../assets/activities-water-icon-6.svg" alt="">
                        </div>
                        <h2 class="title-card">Девичник</h2>
                    </div>
                    <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                </div>
            </div>
              <div class="row-2-card card">
                <img class="image-card" src="../assets/activities-water-7.png" alt="">
                <div class="card-content">
                    <div class="card-info">
                        <div class="wrap-icon">
                            <img src="../assets/activities-water-icon-7.svg" alt="">
                        </div>
                        <h2 class="title-card">Мальчишник</h2>
                    </div>
                    <img class="go-into-card" src="../assets/go-into-card.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.routes-tours-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.wrap-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    color: #1A1A1A;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 700;
}

.actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.action-btn {
    width: fit-content;
    border-radius: 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    font-weight: 600;
    font-size: 20px;
    color: #1A1A1A;
}

.active {
    background-color: #0076FC;
    color: #fff;
}

.row-cards {
    display: flex;
    align-items: center;
    gap: 12px;
}


.row-1-card {
    height: 350px;
}

.row-2-card {
    height: 240px;
}
.card {
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    border-radius: 16px;
    padding: 16px;
    overflow: hidden;
}

/* Затемнение поверх изображения */
.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(232deg, rgba(0, 0, 0, 0) 28.07%, rgba(0, 0, 0, 0.8) 100%),
                linear-gradient(207.02deg, rgba(0, 0, 0, 0) 47.19%, rgba(0, 0, 0, 0.8) 89.84%);
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
    border-radius: 24px;
    z-index: 0;
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.card-info {
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 2;
}

.wrap-icon {
    width: 50px;
    height: 48px;
    background-color: #0076FC;
    padding: 12px 13px;
    border-radius: 12px;
    z-index: 2;
}

.title-card {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
}

.go-into-card {
    width: 24px;
    height: 24px;
    z-index: 2;
}

/* Responsive */
@media (max-width: 1024px) {
    .title {
        font-size: 28px;
    }
    
    .actions {
        flex-wrap: wrap;
    }
    
    .action-btn {
        font-size: 16px;
        padding: 12px 16px;
    }
    
    .row-cards {
        gap: 8px;
    }
    
    .row-1-card {
        height: 300px;
    }
    
    .row-2-card {
        height: 200px;
    }
}

@media (max-width: 768px) {
    .routes-tours-block {
        gap: 24px;
    }
    
    .wrap-title {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    
    .title {
        font-size: 24px;
    }
    
    .actions {
        width: 100%;
        flex-wrap: wrap;
    }
    
    .action-btn {
        font-size: 14px;
        padding: 10px 14px;
    }
    
    .row-cards {
        flex-direction: column;
        gap: 8px;
    }
    
    .row-1-card,
    .row-2-card {
        height: 180px;
        width: 100%;
    }
    
    .title-card {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }
    
    .card {
        padding: 12px;
    }
    
    .wrap-icon {
        width: 40px;
        height: 40px;
        padding: 8px;
    }
    
    .wrap-icon img {
        width: 100%;
        height: 100%;
    }
    
    .title-card {
        font-size: 16px;
    }
    
    .go-into-card {
        width: 20px;
        height: 20px;
    }
}
</style>