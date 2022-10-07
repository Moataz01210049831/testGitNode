const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogs=require('./models/blog');
const laws = require('./models/law');

//edit for git
// express app
const app = express();
const database='mongodb+srv://moataz:01210049831@cluster0.bvysjsn.mongodb.net/node-test?retryWrites=true&w=majority';
mongoose.connect(database,
   { useNewUrlParser: true, useUnifiedTopology: true }
 ).then(
   (res)=>{

     app.listen(4000)
   }
 ).catch((error)=>console.log(error))
// listen for requests


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.get('/add-blog',(req,res)=>{
  const blog=new blogs({
    title:'moataz'

  });
  blog.save().then(result=>{
    res.send(result);
  }).catch((error)=>{
    console.log(error);
  })
})
app.get('/getall',(req,res)=>{
  blogs.find().then(rese=>{
    res.send(rese)
  })
})

app.get('/add-law',(req,res)=>{
  const law = new laws({
    lawName:'american law2'
  });
  law.save().then(rese=>{
    res.send(rese);
  })
});
app.get('/',(req,res)=>{
  res.redirect('/getall');
})
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(express.urlencoded());
app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new blogs(req.body);

  blog.save()
    .then(result => {
      res.redirect('/getall');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
