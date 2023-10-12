import React from 'react'
import "./customModel.css";
import { useSelector } from 'react-redux';

const CustomModel = ({ id, showPopUp, setShowPopUp }) => {
    const allData = useSelector((state) => state.user.users)
    const singleUser = allData.filter((ele) => ele.id === id)
    return (
        <>
            <div className='modalBackground'>
                <div className='modalContainer'>
                    <button onClick={() => setShowPopUp(false)}>Close</button>
                    <h2>{singleUser[0].name}</h2>
                    <h3>{singleUser[0].email}</h3>
                    <h4>{singleUser[0].age}</h4>
                    <p>{singleUser[0].gender}</p>
                </div>
            </div>

        </>
    )
}

export default CustomModel
