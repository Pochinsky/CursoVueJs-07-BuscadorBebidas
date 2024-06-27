import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useDrinksStore } from "./drinks";
import { useModalStore } from "./modal";
import { useNotificationsStore } from "./notifications";

export const useFavoritesStore = defineStore("favorites", () => {
  const drinksStore = useDrinksStore();
  const modalStore = useModalStore();
  const notificationsStore = useNotificationsStore();

  const favorites = ref([]);

  onMounted(() => {
    favorites.value = JSON.parse(localStorage.getItem("favorites")) ?? [];
  });

  watch(
    favorites,
    () => {
      localStorageSync();
    },
    { deep: true }
  );

  function localStorageSync() {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  }

  function deleteFavorite() {
    favorites.value = favorites.value.filter(
      (favorite) => favorite.idDrink !== drinksStore.recipe.idDrink
    );
    notificationsStore.show = true;
    notificationsStore.text = "La receta se ha eliminado de favoritos";
    setTimeout(() => {
      notificationsStore.$reset();
    }, 3000);
  }

  function addFavorite() {
    favorites.value.push(drinksStore.recipe);
    notificationsStore.show = true;
    notificationsStore.text = "La receta se ha agregado a favoritos";
    setTimeout(() => {
      notificationsStore.$reset();
    }, 3000);
  }

  function handleClickFavorites() {
    if (favoriteExists()) deleteFavorite();
    else addFavorite();
    modalStore.modal = false;
  }

  function favoriteExists() {
    const favoritesLocalStorage =
      JSON.parse(localStorage.getItem("favorites")) ?? [];
    return favoritesLocalStorage.some(
      (favorite) => favorite.idDrink === drinksStore.recipe.idDrink
    );
  }

  const favoritesNotExists = computed(() => favorites.value.length === 0);

  return {
    favorites,
    favoritesNotExists,
    handleClickFavorites,
    favoriteExists,
  };
});
