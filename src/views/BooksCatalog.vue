<template>
  <div class="catalog-page">
    <div class="container">
      <div class="books-catalog-wrp">
        <BookCard v-for="(book, index) in books" :key="book.id" :book-data="book" :index="index"/>
        <div class="btn-create-wrp">
          <router-link :to="`/book/create`">
            <div class="btn-create-book"></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from "@/components/BookCard";
import ApiService from "@/common/api.service";

export default {
  name: "BookCatalog",
  components: {
    BookCard
  },

  data() {
    return {
      books: null
    };
  },

  created() {
    this.getBooks();
  },

  methods: {
    async getBooks() {
      const { data } = await ApiService.get("books");
      this.books = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  padding: 8px 14px;
  margin: 22px auto;
  font-size: 16px;

  color: rgb(255, 99, 71);
  background-color: rgba(255, 99, 71, 0.2);
  border-radius: 4px;
}
.err-title {
  font-weight: bold;
}
.books-catalog-wrp {
  padding: 24px 0;
  display: flex;
  flex-wrap: wrap;
}
.btn-create-wrp {
  padding: 0 15px;
}
.btn-create-book {
  display: inline-block;
  border: 1px dashed #e1e1e1;
  border-radius: 3px;
  height: 100%;
  padding: 10px 12px;
  width: 220px;
  height: 400px;
  transition: all 0.15s ease;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #d9f0ff;
    box-shadow: 0px 5px 36px -4px rgba(159, 212, 255, 0.67);
    &:after {
      opacity: 0.5;
    }
  }
  &:after {
    content: "";
    position: absolute;
    width: 82px;
    height: 82px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.35;
    transition: all 0.15s ease;
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 52 52' style='enable-background:new 0 0 52 52;' xml:space='preserve'%3E%3Cpath d='M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z'/%3E%3C/svg%3E%0A");
  }
}
</style>