const express = require('express')
const router = express.Router()
const Author = require('../models/author.js')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ limit: "10mb", extended: false})

// All authors Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// Create Authors Route
router.post('/', urlencodedParser, (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = author.save(Author)
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router