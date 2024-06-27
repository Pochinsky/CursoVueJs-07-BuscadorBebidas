<script setup>
import { useDrinksStore } from "../stores/drinks";
import Recipe from "../components/Recipe.vue";

const drinksStore = useDrinksStore();
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recetas</h1>
  <p class="my-10 text-center text-2xl" v-if="drinksStore.recipesNotExists">
    No hay resultados
  </p>
  <div
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-16 my-10"
  >
    <Recipe
      v-for="recipe in drinksStore.recipes"
      :key="recipe.idDrink"
      :recipe="recipe"
    />
  </div>
</template>
