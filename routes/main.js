module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html");
    });
    app.get("/about", function (req, res) {
        res.render("about.html");
    });
    app.get("/showdevice", function (req, res) {
        //query database to get all the devices
        let sqlquery = "SELECT * FROM devices";
        //execute sql query to get all devices
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            res.render("showdevice.html", { availableDevices: result });
        });
    });

    //ADD DEVICES
    app.get("/adddevice", function (req, res) {
        res.render("adddevice.html");
    })
    app.post("/deviceadded", function (req, res) {
        //saving data of fields in database
        let sqlquery = "INSERT INTO devices (name, type, switch, timer, intensity, volume) VALUES (?,?,?,?,?,?)";
        //execute sql insert query into database
        let newrecord = [req.body.name, req.body.type, req.body.switch, req.body.timer, req.body.intensity, req.body.volume];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send("This device has been added into the database - Name: " + req.body.name);
            }
        });
    });

    //UPDATE DEVICES
    app.get("/updatedevice", function (req, res) {
        res.render("updatedevice.html");
    })
    app.post("/deviceupdated", function (req, res) {
        //saving data of fields in database
        let sqlquery = "UPDATE devices SET name=?, type=?, switch=?, timer=?, intensity=?, volume=? WHERE id=?"

        //execute the update query into the database
        let newrecord = [req.body.name, req.body.type, req.body.switch, req.body.timer, req.body.intensity, req.body.volume, req.body.id];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send("This device has been updated - Name: " + req.body.name);
            }
        });
    });

    //DELETE DEVICES
    app.get("/deletedevice", function (req, res) {
        res.render("deletedevice.html")
    });
    app.post("/devicedeleted", function (req, res) {
        //getting data of field in database 
        let sqlquery = "DELETE FROM devices WHERE id=" + req.body.id;

        //execute sql delete query from the database
        let newrecord = [req.body.id];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                res.send("This device has been deleted - Device ID: " + req.body.id + ", " + req.body.name);
            }
        });
    });
}