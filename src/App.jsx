import { useState } from 'react'
import './App.css'
import { Post } from './Post'
import { useEffect } from 'react';
import { Filter } from './Filter';
function App() {
  const [posts, setPost] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch('https://dummyapi.io/data/v1/post', {method: 'GET', headers: {
          'app-id': '631251d815c778ad0b7301b6 '
        }}); 
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const result = await response.json();
        setPost(result.data); 
      } catch (error) {
        setError(error.message); 
      }
    };

    const fetchDataTag = async () => {
      try {

        const response = await fetch('https://dummyapi.io/data/v1/tag', {method: 'GET', headers: {
          'app-id': '631251d815c778ad0b7301b6 '
        }}); 
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const result = await response.json();
        setTags(result.data); 
        console.log(result)
      } catch (error) {
        setError(error.message); 
      }
    };
    fetchData();
    fetchDataTag();
  }, []); 
  return (
    <>
    <Filter />
      <div className='post-page col-12'>
        <h1>Hola post</h1>
        <div className='row'>
        {
          posts.map(post => <Post key={post.id} props={post}/>)
        }
        </div>

      </div>
    </>
  )
}

export default App
