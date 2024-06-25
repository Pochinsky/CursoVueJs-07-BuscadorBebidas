<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const homePage = computed(() => route.name === "home");
</script>

<template>
  <header class="bg-slate-800" :class="{ header: homePage }">
    <div class="mx-auto container px-5 py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="/img/logo.svg" alt="logo" />
          </RouterLink>
        </div>
        <nav class="flex gap-4">
          <RouterLink
            class="text-white uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'home' }"
            >Inicio</RouterLink
          >
          <RouterLink
            class="text-white uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'favorites' }"
            >Favoritos</RouterLink
          >
        </nav>
      </div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="homePage"
      >
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingredient"
            >Nombre o ingredientes</label
          >
          <input
            class="p-3 w-full rounded-lg focus:outline-none"
            type="text"
            name="ingredient"
            id="ingredient"
            placeholder="Ej: Vodka, tequila"
          />
        </div>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="category"
            >Categoría</label
          >
          <select
            class="p-3 w-full rounded-lg focus:outline-none"
            name="category"
            id="category"
          >
            <option value="">-- Seleccione --</option>
          </select>
        </div>
        <input
          class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
          type="submit"
          value="Buscar Recetas"
        />
      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("/img/bg.jpg");
  background-size: cover;
  background-position: center;
}
</style>
