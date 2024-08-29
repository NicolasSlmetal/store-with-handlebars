const express = require('express');

const router = express.Router();

const products = []
let lastId = 0

router.get("/about", (req, res) => {
    res.render('about', {pageName: "Sobre"});
})

router.get("/search", (req, res) => {
    const name = req.query.name;
    console.log(name)
    const filteredProducts = []
    const upperNameParameter = name.toUpperCase();
    for (let product of products){
        const upperNome = product.name.toUpperCase()
        if (upperNome === upperNameParameter || upperNome.includes(upperNameParameter))
            filteredProducts.push(product)
    }
    res.render('home', {pageName: "Home", isSearch: true,
        search: name, products: filteredProducts, productsIsNotEmpty: filteredProducts.length > 0})
})

router.get("/products/insert", (req, res) => {
    res.status(200).render("cadastro", {pageName: "Cadastrar produto"})
})

router.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const indexProduto = products.findIndex(produto => produto.id === id)
    if (indexProduto !== -1) {
        const product = products[indexProduto]
        res.status(200).render("produto", {product:product, found: true, pageName: product.name})
    } else {
        res.status(404).render("produto", {found: false, pageName: "Produto não encontrado"})
    }
})

router.post("/products", (req, res) => {
    const body = req.body;
    if (body == null || body === "") {
        const message = "Informações não enviadas"
        res.status(400).render("error", {message})
    } else {
        products.push({id: lastId++,
            name: body.name,
            price: body.price,
            description: body.description,
            image: body.image})
        res.status(201).redirect("/")
    }
})

module.exports = {router, products: products}