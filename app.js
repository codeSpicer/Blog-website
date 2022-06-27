// NPM MODULES ----------------------------------------------------------->
const express = require("express");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");

// USING MODULES---------------------------------------------------------->
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(
  "mongodb+srv://akshat123:akshat123@cluster0.zeuj48k.mongodb.net/blog-site?retryWrites=true&w=majority"
);

//  MONGODB SETUP-------------------------------------------------------------------->
const postSchema = new mongoose.Schema({ title: String, content: String });
const Post = mongoose.model("Post", postSchema);

// LISTENING TO SERVER--------------------------------------------------------------->
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

// VARIABLES AND CONSTANTS------------------------------------------------------------>
const homeStartingContent =
  "Doggo ipsum the neighborhood pupper heckin fat boi snoot, fat boi wow such tempt. You are doin me a concern length boy long woofer shoob fat boi puggorino lotsa pats, borkdrive length boy floofs fluffer wow very biscit. doggo corgo doggo. Very hand that feed shibe woofer wow very biscit long bois, wrinkler wow very biscit. Boof tungg the neighborhood pupper mlem, heck. Floofs extremely cuuuuuute puggorino pupperino puggorino, puggo the neighborhood pupper very jealous pupper clouds, porgo borking doggo aqua doggo.";
const aboutContent =
  "Doggo ipsum dat tungg tho adorable doggo you are doing me a frighten very taste wow pupper long bois sub woofer doggo, borkf wow such tempt thicc long bois clouds. Heckin good boys and girls long water shoob he made many woofs big ol pupper shooberino, tungg the neighborhood pupper. Boof pats the neighborhood pupper wow very biscit borking doggo shoober borkf, doggorino pats long water shoob super chub. adorable doggo doge clouds. Shibe fluffer blep wow very biscit wow such tempt, waggy wags pupper shoober. Long water shoob you are doing me a frighten clouds long water shoob maximum borkdrive blep dat tungg tho, super chub yapper mlem fat boi. Adorable doggo maximum borkdrive pupperino dat tungg tho much ruin diet lotsa pats big ol pupper, I am bekom fat fluffer floofs puggo.  floofs puggo very good spot. Long woofer shibe ruff, lotsa pats.";
const contactContent =
  "Doggo ipsum vvv mlem clouds pupper fat boi long bois, blep fluffer fat boi smol. Maximum borkdrive extremely cuuuuuute sub woofer what a nice floof boofers puggorino, wrinkler very taste wow noodle horse corgo. Ruff floofs clouds ruff length boy ruff, stop it fren you are doing me the shock wow such tempt doge, big ol pupper very hand that feed shibe blop woofer. What a nice floof heckin good boys super chub blep blop very good spot shoob noodle horse vvv, shoob mlem the neighborhood pupper noodle horse doge heck boofers. Ruff noodle horse what a nice floof long bois waggy wags, I am bekom fat floofs.";

// GET REQUESTS--------------------------------------------------------------->

app.get("/", (req, res) => {
  Post.find({}, (err, foundItems) => {
    if (!err) {
      res.render("home", { content: homeStartingContent, posts: foundItems });
    } else {
      console.log(err);
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", { content: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:postId", (req, res) => {
  let postId = req.params.postId;
  //   postname = _.lowerCase(postname);    // was used when we were using post name

  Post.findOne({ _id: postId }, (err, foundItems) => {
    if (!err) {
      res.render("post", { post: foundItems });
    } else {
      console.log(err);
    }
  });
});

// POST REQUESTS ------------------------------------------------------------->

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.postContent,
  });

  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});
