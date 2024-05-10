<script>
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3000";
export default {
    data() {
        return {
            products: [],
            isMine: false,
            sort: null,
            title: '',
            category: '',
            description: '',
            price: '',
            image: '',
            error: false,
            success: false
        };
    },
    methods: {
        async loadProducts() {
            let response = await axios.get('/products', {
                params: {
                    sort: this.sort,
                    title: this.title,
                    category: this.category
                }
            });
            this.products = response.data;
            this.isMine = false;
        },
        async myProducts() {
            let response = await axios.get('/products/my');
            this.products = response.data;
            this.isMine = true;
        },
        async removeProduct(id) {
            await axios.delete('/products', {
                params: {
                    id: id
                }
            })
            this.myProducts();
        },
        async createProduct() {
            try {
                await axios.post('/products', {
                    title: this.title,
                    category: this.category,
                    description: this.description,
                    price: this.price,
                    image: this.image
                });
                this.success = true;
                this.error = false;
                this.myProducts();
            } catch (err) {
                this.success = false;
                this.error = true;
            }

        }
    },
    mounted() {
        this.loadProducts()
    }
};
</script>

<template>
    <div>
        <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span class="fs-4">Bvito</span>
            </a>

            <div>
                <a class="btn btn-outline-dark" @click="myProducts" v-if="!isMine">Мои объявления</a>
                <a class="btn btn-outline-dark" @click="loadProducts" v-if="isMine">Все объявления</a>
            </div>
        </header>
    </div>

    <main>
        <div class="container products-container">
            <div class="row g-3 products-row">

                <!-- Форма поиска  -->
                <div class="col-4" v-if="!isMine">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Поиск
                            </h5>

                            <form @submit.prevent="loadProducts">
                                <!-- Название  -->
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="Что ищете?" v-model="title">
                                </div>

                                <!-- Категория  -->
                                <select class="form-select" v-model="category">
                                    <option value="">Без категории</option>
                                    <option value="Одежда">Одежда</option>
                                    <option value="Для дома">Для дома</option>
                                    <option value="Техника">Техника</option>
                                </select>

                                <!-- Сортировка по цене  -->
                                <div class="my-3 d-flex justify-content-between align-items-center">
                                    <div>Цена: </div>

                                    <div>
                                        <!-- стрелка вверх -->
                                        <input value="1" type="radio" class="btn-check" id="sort-up" autocomplete="off"
                                            v-model="sort">
                                        <label class="btn btn-outline-secondary m-1" for="sort-up">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                            </svg>
                                        </label>

                                        <!-- стрелка вниз -->
                                        <input value="-1" type="radio" class="btn-check" id="sort-down"
                                            autocomplete="off" v-model="sort">
                                        <label class="btn btn-outline-secondary m-1" for="sort-down">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                            </svg>
                                        </label>
                                    </div>

                                </div>

                                <!-- Кнопка Найти -->
                                <div class="d-flex justify-content-end">
                                    <button type="submit" class="btn btn-primary">Найти</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Форма создания -->
                <div class="col-4" v-if="isMine">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Новое объявление
                            </h5>

                            <form @submit.prevent="createProduct">
                                <!-- Название-->
                                <div class="mb-3">
                                    <input v-model="title" type="text" class="form-control"
                                        placeholder="Название товара">
                                </div>

                                <!-- Категория -->
                                <select v-model="category" class="form-select mb-3">
                                    <option value="Одежда">Одежда</option>
                                    <option value="Для дома">Для дома</option>
                                    <option value="Техника">Техника</option>
                                </select>

                                <!-- Описание -->
                                <div class="mb-3">
                                    <textarea v-model="description" class="form-control"
                                        placeholder="Описание"></textarea>
                                </div>


                                <!-- Цена -->
                                <div class="mb-3">
                                    <input v-model="price" type="number" class="form-control" placeholder="Цена">
                                </div>


                                <!-- Изображение -->
                                <div class="mb-3">
                                    <input v-model="image" type="url" class="form-control"
                                        placeholder="Ссылка на изображение">
                                </div>

                                <!-- Кнопка Опубликовать -->
                                <div class="d-flex justify-content-end mb-3">
                                    <button class="btn btn-primary">Опубликовать</button>
                                </div>


                                <!-- Сообщения -->

                                <div class="alert alert-danger" v-if="error">Произошла ошибка, попробуйте ещё раз</div>


                                <div class="alert alert-primary" v-if="success">Объявление добавлено</div>

                            </form>
                        </div>
                    </div>
                </div>

                <!-- Список товаров  -->
                <div class="col-8 products-list">
                    <div class="card mb-3" v-for="(product) in products" :key="product">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img :src="product.image">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">

                                    <h5 class="card-title">
                                        <div>{{ product.title }}</div>
                                        <div v-if="isMine">
                                            <a @click="removeProduct(product._id)" class="btn btn-primary">Удалить</a>
                                        </div>
                                    </h5>

                                    <div class="text-muted">
                                        {{ product.category }}: {{ product.price }} руб
                                    </div>
                                    <h6 class="card-subtitle my-2 text-muted">{{ product.description }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </div>
    
</template>

<style>
.card-link {
    cursor: pointer;
}

body {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

main {
    flex: 1;
    overflow: hidden;
}

.products-container,
.products-row,
.products-list {
    height: 100%;
}

.products-list {
    overflow: auto;
}

.btn-check:checked+.btn {
    outline: 4px solid lightgreen;
    background-color: transparent;
    color: gray;
}

.card img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

/* .products-list {} */

.card {
    overflow: hidden;
}
</style>