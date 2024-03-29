<template>
  <div
    ref="container"
    id="card"
    class="cursor-grab overflow-hidden relative flex items-center justify-center bg-gray-100 w-64 h-64"
  >
    <div
      ref="box"
      class="h-16 w-16 bg-blue-400 border-4 border-blue-600 rounded-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useGesture } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import type { PermissiveMotionProperties } from '@vueuse/motion'

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 20

const container = ref()
const box = ref()

const { motionProperties } = useMotionProperties(container, {
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  x: 0,
  y: 0,
})

const { motionProperties: boxProperties } = useMotionProperties(box, {
  y: 0,
  x: 0,
})

const { set } = useSpring(
  motionProperties as Partial<PermissiveMotionProperties>,
)

const { set: boxSet } = useSpring(
  boxProperties as Partial<PermissiveMotionProperties>,
)

useGesture(
  {
    onDrag: ({ movement: [x, y] }) =>
      set({ x, y, rotateX: 0, rotateY: 0, scale: 1 }),
    onDragEnd: () =>
      set({
        x: 0,
        y: 0,
        scale: 1.2,
      }),
    onHover: ({ hovering }) =>
      !hovering && set({ rotateX: 0, rotateY: 0, scale: 1 }),
    onMove: ({ xy: [px, py], dragging }) =>
      !dragging &&
      set({
        rotateX: calcX(py, motionProperties.y),
        rotateY: calcY(px, motionProperties.x),
        scale: 1.2,
      }),
    onPinch: ({ offset: [d, a] }) => {
      console.log(d, a)
    },
    onWheel: ({ movement: [x, y] }) =>
      boxSet({
        y,
        x,
      }),
    onWheelEnd: () =>
      boxSet({
        y: 0,
        x: 0,
      }),
  },
  {
    domTarget: container,
  },
)
</script>

<style lang="postcss">
* {
  box-sizing: border-box;
  user-select: none;
}

#card {
  transition: box-shadow 0.5s, opacity 0.5s;
  border: 10px solid white;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  cursor: grab;
  touch-action: none;
  border-radius: 5px;

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
}
</style>
