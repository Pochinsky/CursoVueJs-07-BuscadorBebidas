<script setup>
import { useDrinksStore } from "../stores/drinks";

const store = useDrinksStore();

defineProps({
  recipe: {
    type: Object,
  },
});
</script>

<template>
  <div class="border shadow-lg">
    <div class="overflow-hidden">
      <img
        class="hover:scale-125 transition-transform hover:rotate-2"
        :src="recipe.strDrinkThumb"
        :alt="'imagen de ' + recipe.strDrink"
      />
    </div>
    <div class="p-5">
      <h2 class="text-2xl truncate font-extrabold">{{ recipe.strDrink }}</h2>
      <button
        class="bg-orange-400 mt-5 w-full p-3 font-bold text-white text-lg hover:bg-orange-600"
        type="button"
        @click="store.selectDrink(recipe.idDrink)"
      >
        Ver Receta
      </button>
    </div>
  </div>
</template>
