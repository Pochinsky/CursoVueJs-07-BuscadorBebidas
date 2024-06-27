<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useDrinksStore } from "../stores/drinks";
import { useNotificationsStore } from "../stores/notifications";

const route = useRoute();
const drinksStore = useDrinksStore();
const notificationsStore = useNotificationsStore();

const homePage = computed(() => route.name === "home");

const handleSubmit = () => {
  if (Object.values(drinksStore.search).includes("")) {
    notificationsStore.$patch({
      text: "Todos los campos son obligatorios",
      show: true,
      error: true,
    });
    return;
  }
  drinksStore.getRecipes();
};
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
        <nav class="flex gap-4 text-white">
          <RouterLink
            class="uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'home' }"
            >Inicio</RouterLink
          >
          <RouterLink
            class="uppercase font-bold"
            active-class="text-orange-500"
            :to="{ name: 'favorites' }"
            >Favoritos</RouterLink
          >
        </nav>
      </div>
      <form
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        v-if="homePage"
        @submit.prevent="handleSubmit"
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
            v-model="drinksStore.search.name"
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
            v-model="drinksStore.search.category"
          >
            <option value="">-- Seleccione --</option>
            <option
              v-for="category in drinksStore.categories"
              :key="category.strCategory"
              :value="category.strCategory"
            >
              {{ category.strCategory }}
            </option>
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
