import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useSnackbar } from 'notistack'


function EditBook() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:4000/books/${id}`)
            .then((res) => {
                const bookData = res.data.book;
                setTitle(bookData.title);
                setAuthor(bookData.author);
                setPublishYear(bookData.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("Error, Check Console");
                console.log(error);
            });
    }, []);


    const editBook = () => {

        const parsedPublishYear = parseInt(publishYear, 10);

        if (isNaN(parsedPublishYear)) {
            alert("Invalid 'publishYear'. Please enter a valid number.");
        } else {
            const data = {
                title,
                author,
                publishYear
            }
            setLoading(true);
            axios
                .put(`http://localhost:4000/books/${id}`, data)
                .then(() => {
                    setLoading(false)
                    enqueueSnackbar("Book Updated Successfully", { variant: 'success' })
                    navigate('/')
                })
                .catch((error) => {
                    setLoading(false)
                    enqueueSnackbar("Error", { variant: 'error' })
                    console.log(error)
                })
        }
    }


    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl mt-5 text-sky-800 font-bold text-center py-4'>Edit Book</h1>
            {loading ? (<Spinner />) :
                (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>Author</label>
                            <input
                                type='text'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                            <input
                                type='text'
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>
                        <button className='p-2 bg-sky-300 text-sky-800 m-8' onClick={editBook}>Save</button>
                    </div>
                )
            }

        </div>
    )
}

export default EditBook
