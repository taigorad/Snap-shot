import './App.css';
import { useEffect, useRef, useState } from 'react';
import Header from "./components/Header/Header"
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {
    //method key cat/mountain/ sort per_page:40 format xml/json
    const params = {
      method: "flickr.photos.search",
      api_key: "c27b8e10538a15d51b3037b38a277331",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm id secret server
    const parameters = new URLSearchParams(params);
    //?per_page=24&
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
      console.log(arr)
    }).catch((err)=> {
      console.log(err)
    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size)=> {
    //farm66.staticflickr.com/server/id_
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <>
    <Header/>
   <div className='searchbar'>
   <input className='search-form' type="search" onChange={(e)=> {searchData.current = e.target.value} }/>
    <button className='search-form button' onClick={()=> {setSearchText(searchData.current)}}>Search</button>
   </div>
    <section>
      <button className='buttons' onClick={()=> {setSearchText("mountains")}}>Mountains</button>
      <button className='buttons' onClick={()=> {setSearchText("beaches")}}>Beaches</button>
      <button className='buttons' onClick={()=> {setSearchText("birds")}}>Birds</button>
      <button className='buttons' onClick={()=> {setSearchText("food")}}>Food</button>
    </section>
    <div className='image-container'>
        {imageData.map((imageurl, key)=> {
          return (
            <ul className='flickr-image'>
              <li><img src={imageurl} key={key}/></li>
            </ul>
          )
          
        })}
      
    </div>
    </>
  );
}

export default App;
