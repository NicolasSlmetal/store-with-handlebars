const express = require('express');
const app = express();
const products = require("./route").products
const productsRoutes = require('./route').router;
const exphbs = require('express-handlebars');
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

app.use(productsRoutes)

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.render("home", {pageName: "Home", products: products,
        productsIsNotEmpty: products.length > 0, isSearch: false})
})

app.use((req, res) => {
    res.render("notFound", {pageName: "Não encontrado"})
})

app.listen(3000, () => {
    console.log("Express server started on port 3000");
})


