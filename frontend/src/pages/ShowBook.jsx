import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function ShowBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`book-app-brown.vercel.app/${id}`)
      .then((res) => {
        setBook(res.data.book);
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      });
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-sky-800 font-bold text-center py-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : book ? ( 
        <div className='flex justify-center items-center'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id:</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Title:</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Author:</span>
              <span>{book.author}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Publish Year:</span>
              <span>{book.publishYear}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <p>Book not found.</p>
        </div>
      )}
    </div>
  );
}

export default ShowBook;
