const express=require("express");
const bodyParser=require("body-parser");
const { generateFile } = require("./generateFile");
const {executeCpp} = require("./executeCpp");
var cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",function(req,res){
  return res.json("hello world");
});

 app.post("/run",async (req,res) => {
   const {language = "cpp", code} =req.body;
   if(code === undefined){
     return res.status(400).json({ success: false, error: "Empty code body!"});
   }
try {
//we need to generate a c++ file with content from the request
const filepath =await generateFile(language, code);

//we need to run the file and send the response
const output = await executeCpp(filepath);



   return res.json({filepath,output});
}catch(err){
  res.status(500).json({err});
}
 });

 if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
 }

app.listen(process.env.PORT||5000,function(){
  console.log("server started at 5000");
});
