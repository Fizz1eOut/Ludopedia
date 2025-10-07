<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppFavoriteButton from '@/components/Base/AppFavoriteButton.vue';
  import AppTag from '@/components/Base/AppTag.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import type { GameResponse } from '@/interface/game.interface';
  import { useRouter } from 'vue-router';

  interface AppGameCardProps {
    game: GameResponse;
  }
  defineProps<AppGameCardProps>();

  const router = useRouter();
  const goToGameDetails = (id: number) => {
    router.push({ name: 'game', params: { id } });
  };
</script>

<template>
  <div class="wrapper">
    <app-underlay class="underlay">
      <app-container class="container">
        <div class="game-card">
          <div class="game-card__group">
            <div class="game-card__image">
              <app-image 
                :url="game.cover?.url" 
                size="t_cover_big" 
                class="game-card__img"
              />
              <app-tag
                v-if="game.rating"
                type="chip"
                :rating="game.rating"
                class="game-card__rating"
              />
              <app-favorite-button type="icon" :game="game" class="game-card__favorite" />
            </div>
            <div class="game-card__content">
              <div class="game-card__name">{{ game.name }}</div>
              <div v-if="game.first_release_date" class="game-card__released">
                <app-icon 
                  name="date"
                  size="14px"
                  color="var(--text-secondary)"
                />
                {{ new Date(game.first_release_date * 1000).toLocaleDateString() }}
              </div>
              <div class="game-card__platform">
                <app-tag 
                  v-for="platform in game.platforms"
                  :key="platform.id"
                  type="badge"
                  :text="platform.name"
                />
              </div>
              <div class="game-card__genres">
                <app-tag 
                  v-for="genre in game.genres"
                  :key="genre.id"
                  type="success"
                  :text="genre.name"
                />
              </div>
            </div>
          </div>
          <div class="game-card__button">
            <app-button primary @click="goToGameDetails(game.id)">View Product</app-button>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .wrapper,
  .underlay {
    display: flex;
    flex: 1 1 auto;
    height: auto;
  }
  .container {
    width: 100%;
  }
  .game-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    height: 100%;
  }
  .game-card__image {
    position: relative;
  }
  .game-card__img {
    height: 300px;
  }
  :deep(.app-tag--chip) {
    padding: 4px 8px;
  }
  :deep(.app-tag--badge),
  :deep( .app-tag--success) {
    padding: 4px 8px;
    font-size: var(--font-size-xs);
    border-radius: var(--radius-sm)
  }
  .game-card__rating {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .game-card__favorite {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .game-card__content > *:not(:last-child) {
    margin-bottom: 10px;
  }
  .game-card__name {
    margin-top: var(--space-sm);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    color: var(--text-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 42px;
  }
  .game-card__platform,
  .game-card__genres {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .game-card__released {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    color: var(--text-primary);
  }
  @media (max-width: 768px) {
     :deep(.image) {
      object-fit: fill;
    }
  }
  @media (max-width: 500px) {
     .game-card__img {
      height: 350px;
    }
    :deep(.image) {
      object-fit: fill;
    }
  }
</style>
