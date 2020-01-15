var express = require("express");
var path = require("path");

let tableNum =  0;

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//sends user to home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
//sends user to table page
app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
//sends user to reservations page
app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
  });


app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });


class Table{
    constructor(name,id,email,phone){
        this.name = name;
        this.id = id;
        this.email = email;
        this.phone = phone;
    }
}

let tables = [

];



app.post("/api/tables", function(req, res) {
    tableNum++;
    if(tableNum <= 5){
        var newTable = req.body;
    
        newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
    
        tables.push(newTable);
    
        res.json(newTable);
    }
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });