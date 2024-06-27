<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "../stores/modal";
import { useDrinksStore } from "../stores/drinks";
import { useFavoritesStore } from "../stores/favorites";

const modalStore = useModalStore();
const drinksStore = useDrinksStore();
const favoritesStore = useFavoritesStore();

const ingredientsFormat = () => {
  const ingredientsDiv = document.createElement("DIV");
  for (let i = 1; i <= 15; i++) {
    if (drinksStore.recipe[`strIngredient${i}`]) {
      const ingredient = drinksStore.recipe[`strIngredient${i}`];
      const measure = drinksStore.recipe[`strMeasure${i}`];
      const ingredientMeasure = document.createElement("P");
      ingredientMeasure.classList.add("text-lg", "text-gray-500");
      ingredientMeasure.textContent = `${ingredient} - ${measure}`;
      ingredientsDiv.appendChild(ingredientMeasure);
    }
  }
  return ingredientsDiv;
};
</script>

<template>
  <TransitionRoot as="template" :show="modalStore.modal">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modalStore.handleClickModal()"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle
                    class="text-gray-900 text-4xl font-extrabold my-5"
                    as="h3"
                    >{{ drinksStore.recipe.strDrink }}</DialogTitle
                  >
                  <img
                    class="mx-auto w-96"
                    :src="drinksStore.recipe.strDrinkThumb"
                    :alt="'imagen de ' + drinksStore.recipe.strDrink"
                  />
                  <DialogTitle
                    class="text-gray-900 text-4xl font-extrabold my-5"
                    as="h3"
                    >Ingredientes y Cantidades</DialogTitle
                  >
                  <div v-html="ingredientsFormat().outerHTML"></div>
                  <DialogTitle
                    class="text-gray-900 text-4xl font-extrabold my-5"
                    as="h3"
                    >Instrucciones</DialogTitle
                  >
                  <p class="text-lg text-gray-500">
                    {{ drinksStore.recipe.strInstructions }}
                  </p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                <button
                  class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500"
                  type="button"
                  @click="modalStore.handleClickModal()"
                >
                  Cerrar
                </button>
                <button
                  class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow hover:bg-orange-500"
                  type="button"
                  @click="favoritesStore.handleClickFavorites()"
                >
                  {{ modalStore.getButtonText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
