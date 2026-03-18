<template>
    <div class="wrap-main-block">
        <div class="main-block">
            <img class="block-image" src="../assets/main-block.jpg" alt="">
            <div class="badge">VIP FLOT</div>
            <h1 class="title-main-block">Аренда яхты и катера <br>в Санкт-Петербурге</h1>
            <span class="subtitle-main-block">Ваш идеальный отдых на воде без лишних забот</span>
        </div>
        <div class="blocks">
            <div class="block block-1" role="button" tabindex="0" @click="scrollToId('tours')" @keydown.enter="scrollToId('tours')">
                <img class="block-image" src="../assets/block-1.png" alt="">
                <div class="block-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                    </svg>
                </div>
                <h2 class="title-block">Выбираем маршрут</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
            <div class="block block-2" role="button" tabindex="0" @click="scrollToId('activities')" @keydown.enter="scrollToId('activities')">
                <img class="block-image" src="../assets/block-2.png" alt="">
                <div class="block-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" fill="white"/>
                    </svg>
                </div>
                <h2 class="title-block">Выбираем повод</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
            <div class="block block-3" role="button" tabindex="0" @click="scrollToId('boats')" @keydown.enter="scrollToId('boats')">
                <img class="block-image" src="../assets/block-3.png" alt="">
                <div class="block-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" fill="white"/>
                    </svg>
                </div>
                <h2 class="title-block">Выбираем судно</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { useRouter } from 'vue-router'

// const router = useRouter()

function scrollToId(id) {
    const el = document.getElementById(id)
    if (el) {
        const headerOffset = 100
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
    }
}
</script>
<style scoped>
.wrap-main-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.main-block {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 97px 40px 97px 40px;
    border-radius: 24px;
    overflow: hidden;
}

/* Затемнение поверх изображения */
.main-block::before, .block::before {
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


.block-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    z-index: 0;
}

.badge {
    width: fit-content;
    background-color: #0076FC;
    padding: 12px 16px;
    border-radius: 12px;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    line-height: 16px;
    letter-spacing: 0;
    position: relative;
    z-index: 2;
}

.title-main-block {
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    color: #fff;
    text-transform: uppercase;
    position: relative;
    z-index: 2;
}

.subtitle-main-block {
    font-weight: 500;
    font-size: 14px;
    line-height: 17.5px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    z-index: 2;
}

.blocks {
    display: flex;
    gap: 10px;
    align-items: center;
}

.block {
    position: relative;
    width: 33%;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
}

.block-icon {
    position: relative;
    z-index: 2;
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

.go-into {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    padding: 16px 14px;
    z-index: 2;
}

.title-block {
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    color: #fff;
    z-index: 2;
}

/* Responsive */
@media (max-width: 1024px) {
    .main-block {
        padding: 60px 30px;
    }
    
    .title-main-block {
        font-size: 32px;
        line-height: 40px;
    }
    
    .blocks {
        flex-wrap: wrap;
    }
    
    .block {
        width: calc(50% - 5px);
    }
    
    .block-3 {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .wrap-main-block {
        gap: 8px;
        min-height: calc(100vh - 72px);
        display: flex;
        flex-direction: column;
    }
    
    .main-block {
        padding: 28px 20px;
        gap: 12px;
        flex: 1;
        min-height: 0;
    }
    
    .title-main-block {
        font-size: 24px;
        line-height: 30px;
    }
    
    .title-main-block br {
        display: none;
    }
    
    .subtitle-main-block {
        font-size: 11px;
        letter-spacing: 1px;
    }
    
    .blocks {
        flex-direction: row;
        gap: 8px;
        flex-shrink: 0;
    }
    
    .block {
        width: 33%;
        height: 130px;
        padding: 16px 12px;
    }
    
    .block-3 {
        width: 33%;
    }

    .block-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        margin-bottom: 4px;
    }
    
    .go-into {
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        padding: 8px 6px;
    }
    
    .title-block {
        font-size: 13px;
    }
    
    .title-block br {
        display: none;
    }
}

@media (max-width: 480px) {
    .main-block {
        padding: 24px 16px;
    }
    
    .title-main-block {
        font-size: 20px;
        line-height: 25px;
    }
    
    .badge {
        padding: 8px 12px;
        font-size: 12px;
    }
    
    .block {
        height: 110px;
        padding: 12px 10px;
    }

    .block-icon {
        width: 28px;
        height: 28px;
    }
    
    .go-into {
        top: 10px;
        right: 10px;
        width: 24px;
        height: 24px;
        padding: 6px 5px;
    }
    
    .title-block {
        font-size: 11px;
    }
}
</style>