import React, { useEffect, useState } from "react";
import Axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const ImageGallery = () => {
    const [images, setImages] = useState([])
    const [page , setPage] = useState(1)
    const [hasMore , sethasMore] = useState(true)
    const [query , setQuery] = useState('nature')
    const [searchQuery , setsearchQuery] = useState('')

useEffect(()=>{
    fetchImages()
},[searchQuery])  

const handleSubmit = (e) => {
   e.preventDefault();
//    console.log('hello');
   
   setImages([]);
   setPage(1);
   sethasMore(true);
   setsearchQuery(query)

}
const your_unsplash_access_key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const fetchImages = () => {
        Axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${your_unsplash_access_key}&page=${page}&per_page=20`)
            .then((res) => {
                console.log(query);
                console.log(res.data.results);
                // setImages(prevImages => [...prevImages , ...res.data])               
                console.log(res.data.results.length);
                if(res.data.results.length === 0){
                    sethasMore(false)
                } else {
                    setImages([...images , ...res.data.results]);
                    setPage(prevPage=> prevPage + 1);
                }
            })
            .catch((err) => {
                console.error('Error fetching data from Unsplash API:', err);
                alert('Failed to fetch images. Please check the console for more details.');
              });
    }
    return (
        <>
            <div className="form-item">
                <form onSubmit={handleSubmit} className="form">                   
                <input
                 type="text"
                 required
                 value={query}
                 onChange={(e)=>setQuery(e.target.value)}
                />
                <button>search</button>
                </form>
            </div>
            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>You have seen it all</p>}
            >
                <div className="gallery">
                    {images.map((image, index) => (
                        <img key={index} src={image.urls.full} alt={image.alt_description}></img>
                    ))}
                </div>
            </InfiniteScroll>
            
        </>
    )
}

export default ImageGallery