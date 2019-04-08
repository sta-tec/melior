<template>
  <div class="card-wrp">
    <router-link :to="`/book/${bookData.id}`">
      <div class="card">
        <div v-if="bookData.isbn" class="card__cover">
          <img :src="bookCoverUrl" :alt="bookData.title">
        </div>
        <div v-else class="card__cover card__cover_no-data">No data provided</div>

        <div class="card__meta">
          <div class="card__title">{{ bookData.title }}</div>
          <div class="card__author">{{ bookData.author }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BookCard",
  props: {
    bookData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    bookCoverUrl() {
      const ISBN = this.bookData.isbn;
      return `http://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg`;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrp {
  padding: 0 15px;
  display: flex;
  margin-bottom: 16px;
  height: 400px;
}
.card {
  display: inline-block;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  height: 100%;
  padding: 10px 12px;
  width: 220px;
  transition: all 0.15s ease;
  &:hover {
    background-color: #d9f0ff;
    box-shadow: 0px 5px 36px -4px rgba(159, 212, 255, 0.67);
  }
}
.card__cover {
  flex: 2;
  position: relative;
  overflow: hidden;
  height: 300px;
  &_no-data {
    text-align: center;
    line-height: 300px;
    color: #bbb;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
.card__meta {
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
}
.card__cover img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.card__title {
  font-size: 22px;
  font-weight: bold;
  max-height: 52px;
}
.card__author {
  font-size: 18px;
  max-height: 42px;
}
</style>