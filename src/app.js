const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
// This is change to be made for git commit

const app = express();
// Herolu is going to assign a port to this app by its own, which is an environment variable and can be accessed by "process.env.PORT", but in case if are running it locally, so using pipe sign and providing a port no manually, i.e. 3000
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
// console.log(viewsPath);
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve, Firstly static pages will be rendered if any,bcoz it comes first in order, as we put here on the top before handlebars(dynamic web pages)
app.use(express.static(publicDirectoryPath));

// To use our handlebar views, we must do =>
// Now as we accessing our handlebar view, so we can go and delete the static html page from public directory
// These are known as Route-Handlers, which route us to designated url, "" means root or just localhost:3000
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abhishek Sharma",
    // footer: "Root Desk",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Abhishek Sharma",
    // footer: "About Desk",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abhishek Sharma",
    helpText: "The Source Code For This Application can be accessed at: ",
    // footer: "Help Desk",
  });
});

// it takes the route(partial url), i.e. help/abput
// giving empty string in get() means, we setting for root (home page)

// Now we need not this =>
// app.get("", (req, res) => {
//   res.send("<h1>Abhishek Sharma</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Abhishek",
//       age: 22,
//     },
//     {
//       name: "Sharma",
//       age: 22,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("About Page!");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // console.log(req.query.address);
  // res.send({
  //   forecast: "It is snowing",
  //   location: "Jaipur",
  //   address: req.query.address,
  // });
});
// app.com
// app.com/help
// app.com/about

// Provisioning the 404 Logs, when encountered wrong route
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek Sharma",
    errorMessage: "Help article not found",
  });
});

// WildCard Route Handling
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abhishek Sharma",
    errorMessage: "Page not found",
  });
});

// starting the server up
app.listen(port, () => {
  console.log("Server is up on port" + port);
});
