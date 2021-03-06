//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = 3009;
const execSync = require('child_process').execSync;
const _ = require('lodash');

const homeStartingContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts =[];


app.get("/", function(req,res){
  res.render('home', {Content:homeStartingContent, posts:posts});
  // console.log(posts);
});

app.get("/about", function(req, res){
  res.render('about', { aboutText:aboutContent});

});

app.get("/contact", function(req, res){
  res.render('contact', { contactText:contactContent});
});

app.get("/compose", function(req,res){
  res.render('compose');
});

app.post("/", function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    link:"/posts/postID"
  }
  posts.push(post);

  res.redirect("/");
});

// app.get('/post/:postID', function(req, res){
//   console.log(req.params.postID);
//   // console.log(req.params.userID);
// });

app.get('/posts/:postID', function(req,res){
  var postID = _.lowerCase(req.params.postID);

  // console.log(postID);
  var postIDlength = postID.length;
  // console.log(postIDlength);

  // console.log(postIDstring);
  // var arrayLength =  posts.length;
  // console.log()
  // if(posts.includes(postIDstring) == true){

  for(var i=0; i<(posts.length); i++){

    if((_.lowerCase(posts[i].title)) == postID){

      res.render('post',{
        newPostTitle:posts[i].title,
        newPostContent:posts[i].content
          // (posts[i].content).slice(0, 100).concat('...')
      }
    );

    }else{

//*******************************DOUBTS************************************************

      //doubt, both if and else are working here LOL
      //truncating a string that it appears in 2 lines on the home page ,
      // instead of a slider being added to adjust it in one line
//*************************************************************************************


      console.log("NO match found");
    };
  }

    // console.log(post.title(postIDstring));
  // };
  // var arrayIndex = arrayLength-1;
  // if(postIDstring == posts[arrayIndex]){
  //   console.log("Match found");
  // }


});

//using bash commands in js, to kill the process already occupying the port
var command = "lsof -t -i:" + port + " | awk '{print$1}END{if(NR==0)print 0}'";
const PID = execSync(command);
if(PID != 0){
  command = "kill -9 " + PID;
  execSync(command);
  console.log("Killed existing process on port:"+port);
}

app.listen(port, function() {

  console.log("Server started on port "+port);
});
