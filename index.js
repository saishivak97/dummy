const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { request } = require("http");

const databasePath = path.join(__dirname, "movie.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();



app.get("/movie", async (request, response) => {
  try {
    const getMoviesQuery = `
      SELECT *
      FROM movie;`; 
    const moviesArray = await database.all(getMoviesQuery);
    response.send(moviesArray);
  } catch (error) {
    console.error(`Error fetching movies: ${error.message}`);
    response.status(500).send("Internal Server Error");
  }
});


app.get("/create",async (request,response) => {
    try {
        const createTable = `create table movie(id int,name text,img text,summary text);`;
        await database.run(createTable)
        response.send("table created")
    }catch(e){
        console.log(e.message)
    }
})



app.post("/movie", async (request, response) => {

  try {
    const { name, img, summary } = request.body;

    const resultQuery = `select name from movie where name =?;`;
    const getMovieName = await database.get(resultQuery,[name])
    console.log(getMovieName)
    if(getMovieName !== undefined) {
        if (getMovieName.name === name) {
            response.send("movie already exists")
        }
    } 
    else {
      const lengthQuery = `select count(*) from movie;`;
      const length = await database.get(lengthQuery)
      const count = length["count(*)"]

      const postMovieQuery = `
      INSERT INTO movie (id,name, img, summary)          
      VALUES (?,?, ?, ?);`;
      await database.run(postMovieQuery, [count+1,name, img, summary]);
      response.send("Movie Added");
    }
    

    
  } catch (error) {
    console.error(`Error adding movie: ${error.message}`);
    response.status(500).send("Internal Server Error");
  }
});




app.put("/movie/:id", async (request, response) => {
  try {
    const { name, img, summary } = request.body;
    const { id } = request.params;
    const updateMovieQuery = `
      UPDATE movie
      SET name = ?, img = ?, summary = ?
      WHERE id = ?;`;
    await database.run(updateMovieQuery, [name, img, summary, id]);
    response.send("Movie Details Updated");
  } catch (error) {
    console.error(`Error updating movie: ${error.message}`);
    response.status(500).send("Internal Server Error");
  }
});




app.delete("/movie/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteMovieQuery = `
      DELETE FROM movie
      WHERE id = ?;`;
    await database.run(deleteMovieQuery, [id]);
    response.send("Movie Removed");
  } catch (error) {
    console.error(`Error deleting movie: ${error.message}`);
    response.status(500).send("Internal Server Error");
  }
});




app.delete("/delete/table",async (request,response) => {

    try {
        const deleteQuery = `drop table movie;`;
        const result = await database.run(deleteQuery)
        response.send("table deleted succesfully")

    }catch(e) {
        console.log(e.message)
    }
    
}
)

module.exports = app;
