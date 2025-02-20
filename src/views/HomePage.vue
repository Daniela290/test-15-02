<template>
  <div class="home-page">
    <div class="home-page__list flex flex-wrap">
      <router-link v-for="link in sections"
                   :to="link.link"
                   class="home-page__link">
        {{ link.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

const sections = Array.from({length: 5}).map((_, i) => ({
  title: `Секция ${i + 1}`,
  link: `/section-${i + 1}`
}));
</script>

<style scoped lang="scss">
.home-page {
  &__list {
    @include value('gap', 10px, 30px)
  }

  &__link {
    flex-grow: 1;
    flex-basis: 40%;
    text-decoration: none;
    width: fit-content;
    background: $grey;
    color: $dark-grey;
    transition: 300ms;
    @include value('border-radius', 6px, 20px);
    @include value('font-size', 16px, 28px);
    @include value('padding', 20px, 30px);

    &:hover {
      background: $primary;
      color: $grey;
    }
  }
}
</style>