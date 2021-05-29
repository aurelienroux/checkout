<template>
  <header class="header">
    <div class="header__top">
      <span>allbirds</span>
      <a href="https://www.allbirds.ca/" target="_blank" rel="noopener noreferrer">visit allbirds.ca --></a>
    </div>
    <h1>Jenny's outfit</h1>
    <h2>Dress like your idole with this super bundle and be the star you always wanted to be!</h2>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;

  &__top {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;

    span {
      font-size: 2rem;
    }
  }

  h2 {
    max-width: 40rem;
  }
}
</style>
