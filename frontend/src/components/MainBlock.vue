<template>
    <div class="wrap-main-block">
        <div class="main-block">
            <img class="block-image" src="../assets/main-block.jpg" alt="">
            <div class="badge">VIP FLOT</div>
            <h1 class="title-main-block">Аренда яхты и катера <br>в Санкт-Петербурге</h1>
            <span class="subtitle-main-block">Прогулки по городу и организация яхт-туров</span>
        </div>
        <div class="blocks">
            <div class="block block-1" role="button" tabindex="0" @click="goToCatalog" @keydown.enter="goToCatalog">
                <img class="block-image" src="../assets/block-1.png" alt="">
                <h2 class="title-block">Аренда катера <br>с капитаном</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
            <div class="block block-2" role="button" tabindex="0" @click="goToCatalog" @keydown.enter="goToCatalog">
                <img class="block-image" src="../assets/block-2.png" alt="">
                <h2 class="title-block">Аренда яхты</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
            <div class="block block-3" role="button" tabindex="0" @click="goToCatalog" @keydown.enter="goToCatalog">
                <img class="block-image" src="../assets/block-3.png" alt="">
                <h2 class="title-block">Аренда парусных яхт</h2>
                <button class="go-into"><img src="../assets/go-into.svg" alt=""></button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCatalog() {
    router.push({ name: 'Catalog' })
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
        min-height: 200px;
    }
    
    .block-3 {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .wrap-main-block {
        gap: 8px;
    }
    
    .main-block {
        padding: 40px 24px;
        gap: 24px;
    }
    
    .title-main-block {
        font-size: 28px;
        line-height: 34px;
    }
    
    .title-main-block br {
        display: none;
    }
    
    .subtitle-main-block {
        font-size: 12px;
        letter-spacing: 1px;
    }
    
    .blocks {
        flex-direction: column;
        gap: 8px;
    }
    
    .block {
        width: 100%;
        height: 200px;
        padding: 24px;
    }
    
    .block-3 {
        width: 100%;
    }
    
    .go-into {
        top: 24px;
        right: 24px;
        width: 40px;
        height: 40px;
    }
    
    .title-block {
        font-size: 20px;
    }
    
    .title-block br {
        display: none;
    }
}

@media (max-width: 480px) {
    .main-block {
        padding: 32px 20px;
    }
    
    .title-main-block {
        font-size: 24px;
        line-height: 30px;
    }
    
    .badge {
        padding: 10px 14px;
        font-size: 13px;
    }
}
</style>