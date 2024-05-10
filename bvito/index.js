let express = require(`express`);
let app = express();
let cors = require('cors')
let port = 3000;
app.listen(port, function () {
    console.log(`Сервер запущен: http://localhost:${port}`)
});

app.use(cors())
app.use(express.json())
app.use(express.static('public'));



// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bvito');


// Схемы
let schema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    isMine: Boolean
});

let Product = mongoose.model('product', schema);

// Роуты



// Задание 1: Получение объявлений
app.get(`/products`, async function (req, res) {
let data=await Product.find();
res.send(data);
});


// Задание 2: Мои объявления
app.get(`/products/my`, async function (req, res) {

});


// Задание 2: Создаём объявление
app.post(`/products`, async function (req, res) {

});


// Задание 3: Удаление
app.delete(`/products`, async function (req, res) {

});