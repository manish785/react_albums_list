import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';

import Navbar from './Navbar';
import AddAlbum from './AddAlbum';
import UpdateAlbum from './UpdateAlbum';
import Home from './Home';

function App() {

    const [posts, setPosts] = useState([]);
    const [album, setAlbums] = useState({});
    
  //  console.log('posts', posts);
    useEffect(()=> {
      fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
    }, [])
     
    //  console.log('postx', posts);
    
    const addAlbumToList = (userId, title) => {
      const length = posts.length;
      const lastIndex = posts[length - 1].id;
      
      fetch("https://jsonplaceholder.typicode.com/albums", {
        method: 'POST',
        body: JSON.stringify({
          userId : userId,
          id: lastIndex+1,
          title: title
        })
      }).then((response) => response.json()).then((data)=> data);

      const newPost = {
        userId: userId,
        id: lastIndex+1,
        title: title
      }
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
    }

    const setUpdateAlbum = (post) =>{
      setAlbums(post);
    }


    const updateAlbum = (id, userId, title, album) => {
      const index = posts.indexOf(album);
      let updatedAlbum = fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{
        method:'PUT',
        body: JSON.stringify({
          userId: userId,
          id: id,
          title: title,
        })
      }).then((response) => response.json()).then((json) => json);

      updatedAlbum = {
        userId: userId,
        id: id,
        title: title
      }
      // console.log(updatedAlbum);
      posts[index] = updatedAlbum;
    }

   const deleteAlbumFromList = (id) =>{
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,{method:'DELETE',})
    const newAlbum = posts.filter((post) => post.id !== id)
    setPosts(newAlbum);
   }

    return (
      <div className="App" style={{backgroundColor:"brown"}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={ <Home posts={posts} deleteAlbum = {deleteAlbumFromList} setUpdateAlbum= {setUpdateAlbum} /> } />
          <Route exact path="/add-album" element={ <AddAlbum addAlbum={addAlbumToList} /> } />
          <Route exact path="/update-album" element={ <UpdateAlbum posts={posts} updateAlbum={updateAlbum} album={album} /> } />
        </Routes>
      </Router>
      </div>
    );
}

export default App;
