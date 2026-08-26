<template>
    <div class="faq-block">
        <h2 class="title">Популярные вопросы</h2>
        <div class="faq">
            <div
                v-for="(item, idx) in faqs"
                :key="idx"
                class="item-faq"
                :class="{ open: open[idx] }"
                role="button"
                :aria-expanded="open[idx] ? 'true' : 'false'"
                @click="toggle(idx)"
            >
                <div class="qa">
                    <span class="item-question">{{ item.q }}</span>
                    <img class="item-icon" :class="{ rotated: open[idx] }" src="../assets/arrow-faq.svg" alt="">
                </div>
                <div class="item-answer">
                    <p class="answer-inner" v-html="item.a"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const faqs = [
    { q: 'С капитаном или без?', a: 'Большинство прогулок проходит с капитаном: так отдых получается спокойнее, а маршрут можно обсуждать прямо по ходу поездки. Если вас интересует аренда без капитана, подскажем, для каких судов и при каких условиях это возможно.' },
    { q: 'Какой маршрут?', a: `Маршрут подбирается под ваш формат отдыха: камерная прогулка по каналам, выход на Неву, вечер под развод мостов или более длинная поездка в сторону залива.<br>Если есть особые пожелания по времени, видам или остановкам, мы заранее включим их в программу.` },
    { q: 'Отдых на яхте с детьми', a: 'Семейные прогулки на борту проходят регулярно. Мы советуем заранее сообщить возраст детей, чтобы подобрать подходящее судно и подготовить все необходимое для безопасной и комфортной поездки.' },
    { q: 'Можно ли приносить свою еду?', a: 'Да, вы можете взять с собой еду и напитки, если это удобно вашему формату отдыха. При желании также организуем сервировку, кейтеринг или фуршетное сопровождение на борту.' },
    { q: 'С каких причалов отходят суда?', a: 'Точка отправления зависит от выбранного судна, маршрута и даты. После подтверждения брони мы сообщаем точный причал, время подачи и все детали по посадке.' },
    { q: 'Какое минимальное время аренды?', a: 'Минимальная длительность зависит от типа судна и сценария прогулки. Для коротких городских поездок это один формат, для вечерних программ и дальних выходов — другой, поэтому мы всегда уточняем это при бронировании.' },
    { q: 'Как обеспечивается безопасность на судне?', a: 'Каждое судно выходит в рейс с обязательным комплектом спасательного оборудования, а экипаж следит за погодой и техническим состоянием борта. Перед отправлением гости получают краткие понятные рекомендации по безопасности.' }
];


const open = ref(faqs.map(() => false));

function toggle(i) {
    const willOpen = !open.value[i];
    open.value = open.value.map((_, idx) => (idx === i ? willOpen : false));
}
</script>
<style>
.faq-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 240px;
}

.title {
    color: #1A1A1A;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 36px;
    letter-spacing: 0px;
    text-align: center;
}

.faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.item-faq {
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    /* use spacing only when answer is open to avoid empty bottom gap */
}

.qa {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.item-question {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1A1A1A;
    letter-spacing: 0px;
}

.item-icon {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    transition: transform 0.22s ease;
}

.item-icon.rotated {
    transform: rotate(180deg);
}

.item-answer {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: grid-template-rows 0.24s ease, opacity 0.2s ease, margin-top 0.24s ease;
    color: #333;
    margin: 0;
    margin-top: 0;
}

.item-faq.open .item-answer {
    grid-template-rows: 1fr;
    opacity: 1;
    margin-top: 12px;
}

.item-faq {
    cursor: pointer;
}

/* inner content animation: slide+fade */
.answer-inner {
    display: block;
    min-height: 0;
    overflow: hidden;
    margin: 0;
    font-size: 16px;
    line-height: 1.35;
    overflow-wrap: anywhere;
}

/* Responsive */
@media (max-width: 1200px) {
    .faq-block {
        padding: 0 120px;
    }
}

@media (max-width: 1024px) {
    .faq-block {
        padding: 0 60px;
    }
    
    .title {
        font-size: 28px;
    }
}

@media (max-width: 768px) {
    .faq-block {
        padding: 0 20px;
        gap: 24px;
    }
    
    .title {
        font-size: 24px;
        text-align: left;
    }
    
    .item-faq {
        padding: 20px;
    }
    
    .item-question {
        font-size: 16px;
    }
    
    .answer-inner {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .faq-block {
        padding: 0;
    }
    
    .title {
        font-size: 20px;
    }
    
    .item-faq {
        padding: 16px;
        border-radius: 12px;
    }
    
    .item-question {
        font-size: 15px;
    }
    
    .item-icon {
        flex-basis: 18px;
        width: 18px;
        height: 18px;
    }
}
</style>
