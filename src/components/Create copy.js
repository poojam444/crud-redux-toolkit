import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../features/UserDataSlice'

const Create = () => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const getUserData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    console.log(user, "user")

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        dispatch(createUser(user))
    }


    return (
        <>
            <form className='w-50 mx-auto' onSubmit={handleFormSubmit}>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" name='email' aria-describedby="emailHelp" onChange={getUserData} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" name='password' onChange={getUserData} />
                </div>
                <div class="mb-3">
                    <label class="form-label">Age</label>
                    <input type="number" class="form-control" name='age' onChange={getUserData} />
                </div>
                <div class="mb-3">
                    <input type="checkbox" class="form-check-input" name='gender' onChange={getUserData} />
                    <label class="form-check-label" >Male</label>
                </div>
                <div class="mb-3">
                    <input type="checkbox" class="form-check-input" name='gender' onChange={getUserData} />
                    <label class="form-check-label" >Female</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}


export default Create
