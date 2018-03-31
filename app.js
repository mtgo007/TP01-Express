let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let app = express();
let firebase = require("firebase");

//firebase Keys
var config = {
    
  };
  firebase.initializeApp(config)

  let db = firebase.database();
  let reference = db.ref("users");
  let users
  reference.on('value', function(data){
    users = data.val();
    console.log(users);
    }, function(err){
    console.log(err);
    });
  
  
//   console.log(ref);

  

//init firebase

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
    res.render("index", {erro:""});
});

app.get("/user/singin", function(req, res){
    res.render("index", {erro:""});
});

app.post("/user/singin", function(req, res){
    
        let user = req.body;
        if(users[user.username]){
            let senha = ""+users[user.username]["senha"];
            console.log(senha);
            if(senha.localeCompare(user.senha)==0){
                res.render("user_home", {username:user.username});
            }else{
                res.render("index",{erro:"Senha ou Usuario invalido"});
            }
        } else{
            res.render("index",{erro:"Senha ou Usuario invalido"});
        } 
        // console.log(req.body);
});

app.post("/user/singup", function(req, res){
    let nuser = req.body;
    console.log(req.body);
    let username = nuser.username;
    let ref = db.ref(`users/${username}`).set(nuser);
    res.redirect("/");
});

app.get("/user", function(req, res){
    res.send("Olá");
});

app.listen(3000, function(){
    console.log("Server startted on port 3000");
});