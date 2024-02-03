import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useSnackbar } from 'notistack'

function DeleteBook() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const deleteBook = () => {
        setLoading(true)
        axios
            .delete(`book-app-brown.vercel.app/${id}`)
            .then(() => {
                setLoading(false)
                enqueueSnackbar("Book Deleted Successfully", { variant: 'success' })
                navigate('/')
            })
            .catch((error) => {
                setLoading(false)
                enqueueSnackbar("Error", { variant: 'error' })
                console.log(error)
            })
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4 py-4 text-sky-800 font-bold text-center'>Delete Book</h1>
            {loading ? (<Spinner />) :
                (
                    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 m-auto'>
                        <h3 className='text-2xl'>Are you sure to delete this book?</h3>
                        <button className='p-2 bg-red-600 text-white mt-8 w-full' onClick={deleteBook}>Delete Book</button>
                    </div>
                )
            }

        </div>
    )
}

export default DeleteBook
