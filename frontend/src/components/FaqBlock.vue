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
                <p :ref="el => setAnswerRef(el, idx)" class="item-answer">
                    <span class="answer-inner" v-html="item.a"></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const faqs = [
    { q: 'С капитаном или без?', a: 'Мы рекомендуем прогулки с капитаном — он обеспечит безопасность и комфорт. Однако при желании возможна аренда без капитана для опытных шкиперов.' },
    { q: 'Какой маршрут?', a: `Вы можете выбрать любой маршрут и обговорить его с капитаном на борту.<br>Основные направления: тур по рекам и каналам, Нева и выход в Финский залив, прогулка под разводными мостами. Для дальних туров обсуждаем детали заранее.` },
    { q: 'Отдых на яхте с детьми', a: 'Дети на борту приветствуются. Рекомендуем взять спасательные жилеты и соблюдать инструкции капитана. Для маленьких детей возможны дополнительные меры безопасности.' },
    { q: 'Можно ли приносить свою еду?', a: 'Разрешается приносить еду и напитки. Просим не оставлять мусор и учитывать правила приличия на борту.' },
    { q: 'С каких причалов отходят суда?', a: 'Отправление обычно из центральных причалов города. Точный причал указан в подтверждении брони и может зависеть от выбранного маршрута.' },
    { q: 'Какое минимальное время аренды?', a: 'Минимальное время прогулки — 1 час. Для специальных программ и дальних маршрутов обсуждаем длительность индивидуально.' },
    { q: 'Как обеспечивается безопасность на судне?', a: 'На борту есть необходимое спасательное оборудование, капитан контролирует состояние судна и погодные условия. Перед отправлением проводится краткий инструктаж.' }
];


const open = ref(faqs.map(() => false));
const answersRefs = ref([]);

function setAnswerRef(el, idx) {
    answersRefs.value[idx] = el;
    if (!el) return;
    // ensure element has correct maxHeight according to current open state
    if (open.value[idx]) {
        el.style.maxHeight = el.scrollHeight + 'px';
    } else {
        el.style.maxHeight = '0px';
    }
}

function toggle(i) {
    const willOpen = !open.value[i];
    // close all, then open only the target if willOpen
    open.value = open.value.map((_, idx) => (idx === i ? willOpen : false));
    nextTick(() => {
        // update maxHeight for all answer elements
        answersRefs.value.forEach((el, idx) => {
            if (!el) return;
            if (open.value[idx]) {
                el.style.maxHeight = el.scrollHeight + 'px';
            } else {
                el.style.maxHeight = '0px';
            }
        });
    });
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
    font-size: 18px;
    font-weight: 600;
    color: #1A1A1A;
    letter-spacing: 0px;
}

.item-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.22s ease;
}

.item-icon.rotated {
    transform: rotate(180deg);
}

.item-answer {
    overflow: hidden;
    max-height: 0px;
    transition: max-height 0.28s ease;
    color: #333;
    margin: 0;
    margin-top: 0; /* no gap when closed */
}

.item-faq.open .item-answer {
    /* max-height is set inline on toggle to exactly match content height */
    margin-top: 12px; /* add spacing when open */
}

.item-faq {
    cursor: pointer;
}

/* inner content animation: slide+fade */
.answer-inner {
    display: block;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.22s ease, transform 0.22s ease;
}

.item-faq.open .answer-inner {
    opacity: 1;
    transform: translateY(0);
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
        width: 18px;
        height: 18px;
    }
}
</style>