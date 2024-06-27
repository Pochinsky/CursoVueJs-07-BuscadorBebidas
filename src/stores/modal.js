import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFavoritesStore } from "./favorites";
import { useDrinksStore } from "./drinks";

export const useModalStore = defineStore("modal", () => {
  const favoritesStore = useFavoritesStore();
  const drinksStore = useDrinksStore();

  const modal = ref(false);

  function handleClickModal() {
    modal.value = !modal.value;
  }

  const getButtonText = computed(() => {
    return favoritesStore.favoriteExists(drinksStore.recipe.idDrink)
      ? "Eliminar de Favoritos"
      : "Agregar a Favoritos";
  });

  return { modal, handleClickModal, getButtonText };
});
