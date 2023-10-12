import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from "../features/UserDataSlice";
import CustomModel from './customModel';
import { Link } from 'react-router-dom';
const Read = () => {
    const [id, setId] = useState()
    const [showPopUp, setShowPopUp] = useState(false)
    const [radioData, setRadioData] = useState("")
    const dispatch = useDispatch()
    const { users, isLoading, searchUser } = useSelector((state) => state.user)
    console.log(users, isLoading, "state")

    useEffect(() => {
        dispatch(showUser())
    }, [])
    if (isLoading) {
        return <h2>Loading...</h2>
    }
    return (
        <>
            {showPopUp && <CustomModel id={id} showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
            <div className='w-100 mx-auto my-5'>
                <h2>All Data</h2>
                <input className='form-check-input' name='gender' type='radio' checked={radioData === ""} onChange={(e) => setRadioData("")} />
                <label className='form-check-label'>All</label>
                <input className='form-check-input' name='gender' type='radio' value="Male" checked={radioData === "Male"} onChange={(e) => setRadioData(e.target.value)} />
                <label className='form-check-label'>Male</label>
                <input className='form-check-input' name='gender' type='radio' value="Female" checked={radioData === "Female"} onChange={(e) => setRadioData(e.target.value)} />
                <label className='form-check-label'>Female</label>
            </div>
            {
                users &&
                users.filter((ele) => {
                    if (searchUser.length === 0) {
                        return ele;
                    } else {
                        return ele.name.toLowerCase().includes(searchUser.toLowerCase())
                    }
                }).filter((ele) => {
                    if (radioData === "Male") {
                        return ele.gender === radioData
                    }
                    else if (radioData === "Female") {
                        return ele.gender === radioData
                    }
                    else return ele
                })
                    .map((user) => (
                        <>
                            <div>
                                <div className="card mx-auto my-2" style={{ width: "18rem" }} key={user.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                                        <p className="card-text">{user.gender}</p>
                                        <button href="#" className="card-link" onClick={() => [setId(user.id), setShowPopUp(true)]}>View</button>
                                        <Link to={`/edit/${user.id}`} className="card-link">Edit</Link>
                                        <Link onClick={() => dispatch(deleteUser(user.id))} className="card-link">Delete</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
            }
        </>
    )
}

export default Read
