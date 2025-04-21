import React, { useEffect, useState } from 'react';

import './App.css';
import { Auth } from './components/auth';
import { db, auth } from './config/firebase'; 
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

function App() {

  const [movieList, setMovieList] = useState([]);
  const movieListRef = collection(db, "movies");

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [ isOscar, setIsOscar] = useState(true);
  //UPDATE TITLE STATE
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateReleaseDate, setUpdateReleaseDate] = useState(0);
  const [updateOscar, setUpdateOscar] = useState(false);


  //move getmovie function outside of useEffect
  const getMovieList = async () => {
    // READ DATA
    //SET THE MOVIE LIST
    try {
    const data = await getDocs(movieListRef);
    const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setMovieList(filteredData);
    console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
};

  useEffect(() => {
   

  getMovieList();
  }, []);

  const onSubmit = async () => {
    try {
    await addDoc(movieListRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receviedAnOscar: isOscar,
      userId: auth?.currentUser?.uid
    });
    getMovieList();
  } catch (error) {
    console.log(error);
  }
  };
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
   const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        title: updateTitle
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      FIREBASE COURSE
      <Auth />
      <div>
        <h1>Add Movie</h1>
        <input type='text' placeholder='Movie Title' onChange={(event) => {setNewMovieTitle(event.target.value )}} />
        <input type="number" placeholder='Release Date' onChange={(event) => {setNewReleaseDate(Number(event.target.value))}} />
        <input type='checkbox' placeholder='Oscar' checked={isOscar} onChange={(event) => {setIsOscar(event.target.checked)}} />
        <label>Received Oscar</label>
        <button onClick={onSubmit}>Submit</button>
      </div>
       <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receviedAnOscar ? "green" : "red"}}> {movie.title} </h1>
            <p> Date: {movie.releaseDate}</p>
            <button onClick={() => {deleteMovie(movie.id)}}>Delete</button>
            <input type="text" placeholder='new title' onChange={(event) => {setUpdateTitle(event.target.value)}} />
            <button onClick={() => {updateMovieTitle(movie.id)}}>Update Title</button>
          </div>
        ))}
       </div>
    </div>
  );
}

export default App;
