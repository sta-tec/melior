<template>
  <div class="book-page">
    <div class="container">
      <div class="form-wrp">
        <ElForm
          v-if="book"
          ref="bookFrom"
          :model="book"
          :action="submitChanges"
          :rules="validationRules"
        >
          <FormItem label="Author" prop="author">
            <ElInput v-model="book.author"/>
          </FormItem>

          <FormItem label="Title" prop="title">
            <ElInput v-model="book.title"/>
          </FormItem>

          <FormItem label="ISBN" prop="isbn">
            <ElInput v-model="book.isbn"/>
          </FormItem>

          <FormItem label="Pages" prop="pages">
            <InputNumber :min="1" v-model="book.pages"/>
          </FormItem>

          <FormItem label="Format" prop="formatId">
            <ElSelect v-model="book.formatId">
              <ElOption
                v-for="format in formats"
                :key="format.id"
                :value="format.id"
                :label="format.name"
              />
            </ElSelect>
          </FormItem>

          <FormItem label="Description" prop="description">
            <ElInput type="textarea" v-model="book.description" :rows="4"/>
          </FormItem>

          <FormItem label="Price" prop="price">
            <ElInput v-model="book.price"/>
          </FormItem>

          <FormItem label="Country" prop="countryId">
            <ElSelect v-model="book.countryId" @change="countryChanged">
              <ElOption
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
                :label="country.name"
              />
            </ElSelect>
          </FormItem>

          <FormItem label="City" prop="cityId">
            <ElSelect :disabled="!book.countryId" v-model="book.cityId" @change="cityChanged">
              <ElOption v-for="city in cities" :key="city.id" :value="city.id" :label="city.name"/>
            </ElSelect>
          </FormItem>

          <FormItem label="Company" prop="companyId">
            <ElSelect :disabled="!book.cityId" v-model="book.companyId">
              <ElOption
                v-for="company in companies"
                :key="company.id"
                :value="company.id"
                :label="company.name"
              />
            </ElSelect>
          </FormItem>

          <div class="form-controls">
            <FormItem>
              <ElButton
                v-if="!isCreate"
                class="controls__btn controls__btn_delete"
                type="danger"
                @click="deleteBook"
                icon="el-icon-delete"
              >Delete</ElButton>
            </FormItem>
            <FormItem>
              <ElButton
                class="controls__btn controls__btn_delete"
                type="warning"
                @click="goBack"
                icon="el-icon-close"
              >Cancel</ElButton>
            </FormItem>
            <FormItem>
              <ElButton
                class="controls__btn controls__btn_save"
                type="primary"
                @click="submitChanges"
                icon="el-icon-edit"
              >Save</ElButton>
            </FormItem>
          </div>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Input as ElInput,
  InputNumber,
  Select as ElSelect,
  Option as ElOption,
  FormItem,
  Form as ElForm,
  Button as ElButton,
  Loading
} from "element-ui";
import ApiService from "@/common/api.service";

export default {
  name: "BookPage",
  components: {
    ElInput,
    InputNumber,
    ElSelect,
    ElOption,
    FormItem,
    ElForm,
    ElButton,
    Loading
  },
  data() {
    return {
      book: {
        id: null,
        author: null,
        title: null,
        isbn: null,
        pages: null,
        countryId: null,
        cityId: null,
        companyId: null,
        formatId: null,
        description: null,
        price: null
      },

      formats: null,
      countries: null,
      cities: null,
      companies: null,

      loadingInstance: null,

      validationRules: {
        author: [
          {
            required: true,
            message: "Please input Author's name",
            trigger: "blur"
          }
        ],
        title: [
          { required: true, message: "Please input title", trigger: "blur" }
        ],
        isbn: [
          { required: true, message: "Please input ISBN", trigger: "blur" },
          { len: 10, message: "ISBN requires 10 digits" }
        ],
        pages: [
          {
            required: true,
            message: "Please input number of the pages",
            trigger: "change"
          }
        ],
        formatId: [
          {
            required: true,
            message: "Wrong format selected",
            trigger: "change"
          }
        ],
        description: [
          {
            required: true,
            message: "Description is required",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "Please input price", trigger: "blur" }
        ],
        countryId: [
          {
            required: true,
            message: "Please select country",
            trigger: "change"
          }
        ],
        cityId: [
          {
            required: true,
            message: "Please select city",
            trigger: "change"
          }
        ],
        companyId: [
          {
            required: true,
            message: "Please select company",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.loadingSwitch();
    if (!this.isCreate) {
      this.getBook();
    }
    this.getFormats();

    (async () => {
      await this.getCountries();
      if (!this.isCreate) {
        await this.getCities();
        await this.getCompanies();
      }
    })();

    this.loadingSwitch();
  },
  computed: {
    isCreate() {
      return this.$route.params.id ? false : true;
    }
  },
  methods: {
    loadingSwitch() {
      if (this.loadingInstance) this.loadingInstance.close();
      else this.loadingInstance = Loading.service({ fullscreen: true });
    },
    async getBook() {
      const { data } = await ApiService.query("books", {
        id: this.$route.params.id
      });
      this.book = data[0];
    },
    submitChanges() {
      this.$refs.bookFrom.validate(valid => {
        if (!valid) return false;
        this.saveData();
        this.$router.push({ name: "BooksCatalog" });
      });
    },
    saveData() {
      if (this.isCreate) {
        this.book.id = Date.now();
        ApiService.post("books", this.book);
      } else {
        ApiService.update("books", this.$route.params.id, this.book);
      }
    },
    deleteBook() {
      ApiService.delete("books", this.$route.params.id);
      this.$router.push({ name: "BooksCatalog" });
    },
    goBack() {
      this.$router.push({ name: "BooksCatalog" });
    },
    async getFormats() {
      const { data } = await ApiService.get("formats");
      this.formats = data;
    },
    async getCountries() {
      const { data } = await ApiService.get("countries");
      this.countries = data;
    },
    async getCities() {
      const { data } = await ApiService.query("cities", {
        countryId: this.book.countryId
      });
      this.cities = data;
    },
    async getCompanies() {
      const { data } = await ApiService.query("companies", {
        cityId: this.book.cityId
      });
      this.companies = data;
    },
    countryChanged() {
      this.getCities();
      this.book.cityId = null;
      this.book.companyId = null;
    },
    cityChanged() {
      this.getCompanies();
      this.book.companyId = null;
    }
  }
};
</script>

<style lang='scss' scoped>
.form-controls {
  display: flex;
  justify-content: flex-end;
}
.controls__btn {
  margin-left: 12px;
}
.form-wrp {
  width: 480px;
  margin: 0 auto;
  padding-top: 120px;
}
.el-form-item {
  display: flex;
}
</style>,