var express =require("express");
var session=require("express-session");
var MongoDBSession=require("connect-mongodb-session")(session);
var path=require('path');
var ejs=require('ejs');
var bodyParser=require('body-parser');

var mongoose=require("mongoose");
var app=express();

var mongoURI="mongodb://localhost:27017/sessions";

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
.then(res=>{
    console.log("Mongodb Connected");
});

var store=new MongoDBSession({
          uri:mongoURI,
          collection:"mySessions",
});

var staticPath=path.join(__dirname,'../views');
app.use(express.static(staticPath));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'key that will sign cookie',
    resave:false,
    saveUninitialized:false,
    store:store,
}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login",(req,res)=>{
});

app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",(req,res)=>{
});

app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
});

//app.get("/",(req,res)=> {
   // req.session.isAuth=true;
   // res.send("Hello Sessions Tut");
//});

app.listen(5000,console.log("Server running on 5000"));