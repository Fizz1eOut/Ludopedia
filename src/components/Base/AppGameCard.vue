<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppFavoriteButton from '@/components/Base/AppFavoriteButton.vue';
  import AppTag from '@/components/Base/AppTag.vue';
  import AppImage from '@/components/Base/AppImage.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface AppGameCardProps {
    game: GameResponse;
  }
  defineProps<AppGameCardProps>();
</script>

<template>
  <div class="wrapper game-card__wrapper">
    <app-underlay>
      <app-container>
        <div class="game-card">
          <div class="game-card__image">
            <app-image 
              :url="game.cover?.url" 
              size="t_cover_big" 
              class="game-card__img"
            />
            <app-tag
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
          <div class="game-card__button">
            <app-button primary>View Product</app-button>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .wrapper {
    max-width: 300px;
    width: 100%;
  }
  .game-card {
    max-width: 300px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
  }
  .game-card__image {
    position: relative;
    max-width: 300px;
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
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    color: var(--text-primary);
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
</style>
