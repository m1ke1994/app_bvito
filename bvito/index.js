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
},{
    timestamps:true
});

let Product = mongoose.model('product', schema);

// Роуты


/* app.get(`/add`, async function (req, res) {
 let product=new Product({
    title:'Полет в дубаи',
    description: "Полет на бизнес джете в город песков и больших TЦ",
    price: 131141,
    category: "Туризм",
    image: 'https://img.freepik.com/free-photo/aerial-view-dubai-city-from-top-tower_268835-1059.jpg?t=st=1715357561~exp=1715361161~hmac=e27eed42a3d4d7b1f2891247ba26d7ac9aa1cd62fcc29f8f1bbb3c011009d04c&w=1060',
    isMine: true
 });
 await product.save();
 res.send(product)

}); */


/* app.get(`/remove`, async function (req, res) {
    let data= await Product.deleteOne({ title: "Полет в дубаи" });
    res.send(data);
   
   }); */
   


// Задание 1: Получение объявлений
app.get(`/products`, async function (req, res) {
    let title=req.query.title;
    let category=req.query.category;
    let sort=Number(req.query.sort);
    let search={};
    let sorting={};

    if(title){
        search.title=title;
    }
    if(category){
        search.category=category;
    }
    if(sort){
        sorting.price=sort;//1 or -1
    }

let data=await Product.find(search).sort(sorting).limit(50);
res.send(data);
});


// Задание 2: Мои объявления
app.get(`/products/my`, async function (req, res) {
let data = await Product.find({isMine:true});
res.send(data);
});


// Задание 2: Создаём объявление
app.post(`/products`, async function (req, res) {
    let product=new Product({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        isMine:true,
    });
    await product.save();
    res.sendStatus(201);
});


// Задание 3: Удаление
app.delete(`/products`, async function (req, res) {
let id= req.query.id;
await Product.deleteOne({_id:id});
res.sendStatus(200);
});