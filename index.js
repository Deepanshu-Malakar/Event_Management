const express = require("express")
const path = require("path")
const mysql = require("mysql2")
const { urlencoded } = require("body-parser")

app = express()

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"practice"
})

conn.connect((err)=>{
    if (err) throw err;
    console.log("Database connected");
})

app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));

app.post("/add_student",(req,res)=>{
    const {name,age,marks} = req.body
    conn.query("insert into student (name,age,marks) values (?,?,?)",[name,age,marks],(err,result)=>{
        if (err) throw err;
        res.send("Added Successfully")
    })
})

app.post("/view_student",(req,res)=>{
    const {search} = req.body;
    conn.query("select * from student where name like ? ",[`%${search}%`],(err,result)=>{
        if (err) throw err;
        console.log(result);
        // let span = document.createElement("span");
        // span.innerHTML = `${result[0].name} ${result[0].age} ${result[0].marks}`;
        // document.body.appendChild(span)
        res.send(`<div>${result[0].name} ${result[0].age} ${result[0].marks}</div>`)
    })
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
});
app.get("/add_student",(req,res)=>{
    res.sendFile(path.join(__dirname,"add_student.html"))
});
app.get("/view_student",(req,res)=>{
    res.sendFile(path.join(__dirname,"view_student.html"))
});

app.listen(3000)