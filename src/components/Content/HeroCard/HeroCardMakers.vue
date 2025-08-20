<script setup lang="ts">
  import { computed } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface GameCardMakersProps {
    game: GameResponse;
  }
  const props = defineProps<GameCardMakersProps>();

  const developers = computed(() => {
    return props.game.involved_companies?.filter(company => company.developer === true) || [];
  });
  const publishers = computed(() => {
    return props.game.involved_companies?.filter(company => company.publisher === true) || [];
  });
</script>

<template>
  <div v-if="game.involved_companies" class="game-card__makers card-makers">
    <app-underlay class="card-makers__underlay">
      <app-container>
        <div class="card-makers__items">
          <div v-if="developers.length > 0" class="card-makers__group">
            <div class="card-makers__title">Developers:</div>

            <ul class="card-makers__list">
              <li 
                v-for="dev in developers"
                :key="dev.id"
                class="card-makers__item"
              >
                - {{ dev.company.name }}
              </li>
            </ul>
          </div>
          <div v-if="publishers.length > 0" class="card-makers__group">
            <div class="card-makers__title">Publishers:</div>

            <ul class="card-makers__list">
              <li 
                v-for="pub in publishers"
                :key="pub.id" 
                class="card-makers__item"
              >
                - {{ pub.company.name }}
              </li>
            </ul>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .card-makers__underlay {
    background-color: var(--black-300);
    border: 1px solid var(--slate-700);
  }
  .card-makers__items {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  .card-makers__group {
    flex: 0 1 50%;
  }
  .card-makers__title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    color: #9ca3af;
  }
  .card-makers__list {
    margin-top: var(--space-xs);
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
  }
  .card-makers__item {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--white);
  }
</style>
