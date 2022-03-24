<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, watch, ref } from 'vue';
import { clamp, isMouseEvent, isTouchEvent } from './utils';

export default defineComponent({
    name: 'VSlider',
    props: {
        modelValue: { type: Number, default: 0 },
    },
    emits: ['update:modelValue', 'mouseup', 'mousedown', 'mousemove'],
    setup(props, { emit }) {
        const sliderElement = ref<HTMLDivElement | null>(null);
        const handleElement = ref<HTMLDivElement | null>(null);
        const trackLeftElement = ref<HTMLDivElement | null>(null);
        const trackRightElement = ref<HTMLDivElement | null>(null);

        const handlePos = ref(0);

        onMounted(() => {
            changeSliderStyle(props.modelValue);
        });

        watch(
            () => props.modelValue,
            (newVal) => {
                changeSliderStyle(newVal);
            }
        );

        function changeSliderStyle(pos: number) {
            if (
                handleElement.value &&
                sliderElement.value &&
                trackLeftElement.value &&
                trackRightElement.value
            ) {
                const bbox = sliderElement.value.getBoundingClientRect();
                const handleShift =
                    ((handleElement.value.offsetWidth / 2) * 100) / bbox.width;
                handleElement.value.style.left =
                    pos - handleShift + '%';
                trackLeftElement.value.style.width = pos + '%';
                trackRightElement.value.style.width =
                    100 - pos + '%';
            }
        }

        function moveHandle(e: MouseEvent | TouchEvent) {
            if (
                sliderElement.value &&
                trackLeftElement.value &&
                trackRightElement.value &&
                handleElement.value
            ) {
                const bbox = sliderElement.value.getBoundingClientRect();
                let point = 0;
                if (isMouseEvent(e)) {
                    point = e.clientX;
                } else if (isTouchEvent(e)) {
                    point = e.changedTouches[0].clientX;
                }
                handlePos.value = clamp(
                    ((point - bbox.left) * 100) / bbox.width,
                    0,
                    100
                );
                emit('update:modelValue', handlePos.value);
            }
        }

        function handleMouseDown(e: MouseEvent | TouchEvent) {
            if (
                sliderElement.value &&
                trackLeftElement.value &&
                trackRightElement.value &&
                handleElement.value
            ) {
                moveHandle(e);
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseup', handleMouseUp);
                window.addEventListener('touchmove', handleMouseMove);
                window.addEventListener('touchend', handleMouseUp);
                emit('mousedown', handlePos.value);
            }
        }

        function handleMouseMove(e: MouseEvent | TouchEvent) {
            if (
                sliderElement.value &&
                trackLeftElement.value &&
                trackRightElement.value &&
                handleElement.value
            ) {
                moveHandle(e);
                emit('mousemove', handlePos.value);
            }
        }

        function handleMouseUp() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
            emit('mouseup', handlePos.value);
        }

        onBeforeUnmount(() => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        });

        return {
            sliderElement,
            handleElement,
            trackLeftElement,
            trackRightElement,
            handleMouseDown,
        };
    },
});
</script>

<template>
    <div
        ref="sliderElement"
        class="slider"
        @mousedown="handleMouseDown"
        @touchstart="handleMouseDown"
    >
        <div ref="handleElement" class="slider__handle"></div>
        <div class="slider__track-container">
            <div ref="trackLeftElement" class="slider__track-left"></div>
            <div ref="trackRightElement" class="slider__track-right"></div>
        </div>
    </div>
</template>

<style scoped>
.slider {
    --color-slider-left: orange;
    --color-slider-right: green;
    --color-slider-handle: gray;
    --slider-border-radius: 0.25rem;
    --slider-height: 0.25rem;
    --slider-size: 1rem;
    --slider-handle-transition: left 0.05s linear;

    width: 100%;
    position: relative;
    min-height: 2rem;
    display: flex;
    align-items: center;
}
.slider__handle {
    top: 50%;
    transform: translateY(-50%);
    width: var(--slider-size);
    height: var(--slider-size);
    position: absolute;
    background: var(--color-slider-handle);
    z-index: 2;
    border-radius: 100%;
    transition: var(--slider-handle-transition);
}
.slider__track-container {
    width: 100%;
    display: flex;
    height: var(--slider-height);
    border-radius: var(--slider-border-radius);
}
.slider__track-left {
    background: var(--color-slider-left);
    transition: width 0.05s linear;
    border-radius: var(--slider-border-radius);
}
.slider__track-right {
    background: var(--color-slider-right);
    transition: width 0.05s linear;
    border-radius: var(--slider-border-radius);
}
</style>

