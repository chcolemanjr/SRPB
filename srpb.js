var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (request, response) {
    response.send("Simple Rest Phone Book");
});

// Add an entry
app.post('/addEntry', function (request, response) {
    var jsonIn = request.body;
    var fileData = fs.readFileSync(__dirname + "/" + "pb.json").toString();
    var jsonObj = JSON.parse(fileData);

    var entryLength = jsonObj["entries"].length;

    // Normalize index ids 
    for (var i = 0; i < entryLength; i++) {
        jsonObj["entries"][i].id = i;
    }

    jsonIn["id"] = i;
    jsonObj["entries"].push(jsonIn);

    fs.writeFileSync(__dirname + "/" + "pb.json", JSON.stringify(jsonObj));

    response.status(200);
    response.end();
});

// Get all entries
app.get('/getAllEntries', function (request, response) {
    var fileData = fs.readFileSync(__dirname + "/" + "pb.json").toString();
    response.status(200);
    response.send(fileData);
});

// Get entry by id
app.get('/:id', function (request, response) {
    var fileData = fs.readFileSync(__dirname + "/" + "pb.json").toString();
    var jsonObj = JSON.parse(fileData);
    var entryLength = jsonObj["entries"].length;

    if (request.params.id > (entryLength - 1)) {
        response.status(400).end();
        console.log("Index out of range");
    } else {
        response.status(200);
        response.end(JSON.stringify(jsonObj["entries"][request.params.id]));
    }
});

// Update an entry
app.put('/updateEntry', function (request, response) {
    var jsonIn = request.body;
    var fileData = fs.readFileSync(__dirname + "/" + "pb.json").toString();
    var jsonObj = JSON.parse(fileData);

    var entryLength = jsonObj["entries"].length;

    if (jsonIn.id > (entryLength - 1)) {
        response.status(400).end();
        console.log("Index out of range");
    } else {
        for (var i = 0; i < entryLength; i++) {
            var entry = jsonObj["entries"][i];
            if (entry.id == jsonIn.id) {
                jsonObj["entries"][i].fname = jsonIn.fname;
                jsonObj["entries"][i].lname = jsonIn.lname;
                jsonObj["entries"][i].pnum = jsonIn.pnum;
                break;
            }
        }
        fs.writeFileSync(__dirname + "/" + "pb.json", JSON.stringify(jsonObj));
        response.status(200);
        response.end();
    }
});

// Delete an entry
app.delete('/:id', function (request, response) {
    var fileData = fs.readFileSync(__dirname + "/" + "pb.json").toString();
    var jsonObj = JSON.parse(fileData);
    var entryLength = jsonObj["entries"].length;

    if (request.params.id > (entryLength - 1)) {
        response.status(400).end();
        console.log("Index out of range");
    } else {
        for (var i = 0; i < entryLength; i++) {
            var entry = jsonObj["entries"][i];
            if (entry.id == request.params.id) {
                jsonObj["entries"].splice(i, 1);
                entryLength--;
                break;
            }
        }

        // Normalize index ids 
        for (var i = 0; i < entryLength; i++) {
            jsonObj["entries"][i].id = i;
        }

        fs.writeFileSync(__dirname + "/" + "pb.json", JSON.stringify(jsonObj));
        response.status(200);
        response.end();
    }
});

var server = app.listen(8081, function () {
    console.log("SRPB listening on port 8081");
});
