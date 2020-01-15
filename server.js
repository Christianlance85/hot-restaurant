var express = require("express");
var path = require("path");

let tableNum =  0;

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//sends user to home page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
//sends user to table page
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
//sends user to reservations page
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });


app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlis", function(req, res) {
  return res.json(waitlist);
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

let waitlist = [

];

app.post("/api/tables", function(req, res) {
    tableNum++;
    var newTable = req.body;
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
    res.json(newTable);

    if(tableNum <= 5){
      tables.push(newTable);
    }
  });

app.post("/api/waitlist", function(req, res) {
  tableNum++;
  var newTable = req.body;
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  res.json(newTable);
  waitlist.push(newTable);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });