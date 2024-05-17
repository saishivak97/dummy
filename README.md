# Movie Database API

This project is a simple API for managing a movie database using Express.js and SQLite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Sample Data](#sample-data)
- [Running the Server](#running-the-server)

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Database Schema

The database contains a single table called `movie` with the following schema:

| Column  | Type   | Description                                |
| ------- | ------ | -----------------------------------------  |
| id      | INTEGER| The unique identifier for the movie.       |
| name    | TEXT   | The name of the movie.                     |
| img     | TEXT   | The URL of the movie's image.              |
| summary | TEXT   | A brief summary of the movie.              |

## Usage

### Starting the Server

1. Ensure you are in the project directory.
2. Run the server:

   ```bash
   node index.js
   or 
   npm run start
   ```

   The server will start and listen on `http://localhost:3000`.

### API Endpoints

#### Create Table

- **Path**: `/create`
- **Method**: `GET`
- **Description**: Creates the `movie` table in the database.
- **Response**: A success message indicating the table has been created.

  **Sample Request:**

  ```bash
  curl -X GET http://localhost:3000/create
  ```

  **Sample Response:**

  ```json
  "table created"
  ```

#### Get All Movies

- **Path**: `/movie`
- **Method**: `GET`
- **Description**: Retrieves all movies from the database.
- **Response**: JSON array of movie objects.

  **Sample Request:**

  ```bash
  curl -X GET http://localhost:3000/movie
  ```

  **Sample Response:**

  ```json
  [
      {
          "id": 1,
          "name": "Harry Potter and the Order of the Phoenix",
          "img": "https://bit.ly/2IcnSwz",
          "summary": "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
      },
      ...
  ]
  ```



#### Add a New Movie

- **Path**: `/movie`
- **Method**: `POST`
- **Description**: Adds a new movie to the database.
- **Request Body**: JSON object with `name`, `img`, and `summary`.
- **Response**: A success message indicating the movie has been added.

  **Sample Request:**

  ```bash
  curl -X POST http://localhost:3000/movie -H "Content-Type: application/json" -d '{"name":"The Matrix","img":"https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg","summary":"A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."}'
  ```

  **Sample Response:**

  ```json
  "Movie Added"
  ```

#### Update Movie Details

- **Path**: `/movie/:id`
- **Method**: `PUT`
- **Description**: Updates details of an existing movie.
- **Request Body**: JSON object with `name`, `img`, and `summary`.
- **Response**: A success message indicating the movie details have been updated.

  **Sample Request:**

  ```bash
  curl -X PUT http://localhost:3000/movie/1 -H "Content-Type: application/json" -d '{"name":"Harry Potter and the Order of the Phoenix","img":"https://bit.ly/2IcnSwz","summary":"Updated summary."}'
  ```

  **Sample Response:**

  ```json
  "Movie Details Updated"
  ```

#### Delete a Movie

- **Path**: `/movie/:id`
- **Method**: `DELETE`
- **Description**: Deletes a movie from the database by ID.
- **Response**: A success message indicating the movie has been removed.

  **Sample Request:**

  ```bash
  curl -X DELETE http://localhost:3000/movie/1
  ```

  **Sample Response:**

  ```json
  "Movie Removed"
  ```

#### Delete Table

- **Path**: `/delete/table`
- **Method**: `DELETE`
- **Description**: Deletes the `movie` table from the database.
- **Response**: A success message indicating the table has been deleted.

  **Sample Request:**

  ```bash
  curl -X DELETE http://localhost:3000/delete/table
  ```

  **Sample Response:**

  ```json
  "table deleted successfully"
  ```

## Running the Server

Ensure the SQLite database file `movie.db` is in the same directory as your project.

Run the following command to start the server:

```bash
node index.js
or
npm run start
```

The server will start running on `http://localhost:3000/`.

## Sample Data

The following sample data is used in the database:

```json
[
    {
        "id": 1,
        "name": "Harry Potter and the Order of the Phoenix",
        "img": "https://bit.ly/2IcnSwz",
        "summary": "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
    },
    {
        "id": 2,
        "name": "The Lord of the Rings: The Fellowship of the Ring",
        "img": "https://bit.ly/2tC1Lcg",
        "summary": "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
    },
    {
        "id": 3,
        "name": "Avengers: Endgame",
        "img": "https://bit.ly/2Pzczlb",
        "summary": "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
    },
    {
        "id": 4,
        "name": "Inception",
        "img": "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
        "summary": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
    },
    {
        "id": 5,
        "name": "The Dark Knight",
        "img": "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
        "summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        "id": 6,
        "name": "Interstellar",
        "img": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        "summary": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        "id": 7,
        "name": "The Matrix",
        "img": "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
        "summary": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
        "id": 8,
        "name": "Gladiator",
        "img": "https://upload.wikimedia.org/wikipedia/en/8/8d/Gladiator_ver1.jpg",
        "summary": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
    },
    {
        "id": 9,
        "name": "Titanic",
        "img": "https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg",
        "summary": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
    },
    {
        "id": 10,
        "name": "Jurassic Park",
        "img": "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
        "summary": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose."
    }
]
```

