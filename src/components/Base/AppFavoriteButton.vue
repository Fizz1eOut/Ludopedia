<script setup lang="ts">
  import { ref, computed }  from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/Auth/AuthForm.vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';
  import { useAuthStore } from '@/stores/authStore';
  import type { GameResponse } from '@/interface/game.interface';

  interface AppFavoriteButtonProps {
    game: GameResponse;
    type?: 'button' | 'icon';
  }
  const props = withDefaults(defineProps<AppFavoriteButtonProps>(), {
    type: 'button',
  });

  const authStore = useAuthStore();
  const favoritesStore = useFavoritesStore();
  const isModalOpen = ref(false);

  const isFavorite = computed(() => favoritesStore.isFavorite(props.game.id.toString()));

  const toggleFav = async (itemId: string) => {
    if (authStore.isAuthenticated) {
      await favoritesStore.toggleFavorite(itemId);
    } else {
      isModalOpen.value = true;
    }
  };

  const onAuthSuccess = async (itemId: string) => {
    isModalOpen.value = false;
    await favoritesStore.toggleFavorite(itemId);
  };
</script>

<template>
  <div class="favorites-button">
    <app-button
      v-if="type === 'button'"
      secondary 
      class="favorites-button__btn"
      @click="toggleFav(game.id.toString())"
    >
      <app-icon 
        :name="isFavorite ? 'heartfull' : 'heart'"
        size="20px"
        color="var(--white)"
      />
      {{ isFavorite ? 'Added' : 'Add to favourites' }}
    </app-button>
    <app-button
      v-else-if="type === 'icon'"
      @click="toggleFav(game.id.toString())"
      class="favorites-button__icon"
    >
      <app-icon 
        :name="isFavorite ? 'heartfull' : 'heart'"
        size="20px"
        color="var(--white)"
      />
    </app-button>

    <app-modal
      :model-value="isModalOpen"
      @update:model-value="isModalOpen = $event"
    >
      <auth-form @close="isModalOpen = false"  @authSuccess="() => onAuthSuccess(game.id.toString())"  />
    </app-modal>
  </div>
</template>

<style scoped>
  .favorites-button__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .favorites-button__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background-color: var(--black-300);
    border: 1px solid var(--slate-700);
    cursor: pointer;
  }
</style>
