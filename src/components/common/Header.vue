<script setup lang="ts">
defineOptions({
  name: 'Header',
})
</script>

<template>
  <header class="w-full bg-gray-600 flex px-8 py-4 text-white relative">
    <div class="bg-gray-800 rounded px-4 py-2 font-bold">로고</div>
    <div
      class="absolute text-[1.25rem] font-medium left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      OOO 회원관리 (총 : 00명)
    </div>
  </header>
</template>

<style scoped></style>
