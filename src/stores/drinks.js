import { ref, reactive, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import APIServices from "../services/APIServices";
import { useModalStore } from "./modal";

export const useDrinksStore = defineStore("drinks", () => {
  const modalStore = useModalStore();
  const categories = ref([]);
  const search = reactive({
    name: "",
    category: "",
  });
  const recipes = ref([]);
  const recipe = ref({});

  onMounted(async function () {
    const {
      data: { drinks },
    } = await APIServices.getCategories();
    categories.value = drinks;
  });

  async function getRecipes() {
    const {
      data: { drinks },
    } = await APIServices.getRecipes(search);
    recipes.value = drinks;
  }

  async function selectDrink(id) {
    const {
      data: { drinks },
    } = await APIServices.getRecipe(id);
    recipe.value = drinks[0];
    modalStore.handleClickModal();
  }

  const recipesNotExists = computed(() => recipes.value.length === 0);

  return {
    categories,
    search,
    recipes,
    recipe,
    recipesNotExists,
    getRecipes,
    selectDrink,
  };
});
