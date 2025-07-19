<script setup lang="ts"></script>

<template>
  <!--  모달 뒷배경-->
  <div class="fixed inset-0 bg-black/30 z-50 w-screen h-screen flex items-center justify-center">
    <div
      class="bg-white p-2 rounded shadow z-50 w-1/2 h-1/3 flex flex-col items-center justify-center gap-2 relative translate-y-1/2 translate-x-1/2 top-1/2 left-1/2"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
