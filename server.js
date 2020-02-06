const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [
            {email_aadress: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/2e204e425c",
        method: "POST",
        headers: {
            "Authorization" : "whateverstring 4337e19ad9c4ad855843f07e38304a9e-us4"
        },
        //body: jsonData
    }

    request(options, function(error,response,body){
        if(error){
            console.log(error);
        }else{
            console.log(response.statusCode);
        }
    });

    console.log(firstName, lastName, email);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});