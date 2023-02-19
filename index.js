import express from 'express';
import bodyParser from "body-parser";
import ejs, { render }  from "ejs";
import { authenticate, userData, Donations,InsertDono ,InsertUser} from './database.js';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

  app.get("/",function(req,res){
    res.render("login");
    });

  app.get("/Err404",function(req,res){
    res.render("notfound");
      });

  app.get("/adminsection",function(req,res){
    res.render("Donations");
  })

  app.get("/signup",function(req,res){
    res.render("signup");
  })
  
  app.post("/profile", async (req,res) =>{
    const email = req.body.mail;
    const key = req.body.pass;
    try{
    const pass = await authenticate(email);
    const data = await userData(email);
    const id = data.id;
    const dono = await Donations(id);
    if(key === pass){
    res.render("profile",{name:data.name , address:data.address,
       group: data.blood_group, contact:data.contact, email:data.email ,donations:dono ,id:data.id});}
    else{res.redirect("/Err404")};}
    catch(err){
      res.redirect("/Err404");
    }
    })

  app.post("/donoDetails",async(req,res)=>{
    const id = req.body.id;
    const date = req.body.date;
    const place =req.body.place;
    InsertDono(id,date,place);
    res.render("sucess");
  })

  app.post("/userData",async(req,res)=>{
    const name = req.body.name;
    const group = req.body.group;
    const address =req.body.address;
    const contact =req.body.contact;
    const email =req.body.mail;
    const password = req.body.pass;
    InsertUser(name,group,email,address,contact,password);
    res.render("sucess");
  })