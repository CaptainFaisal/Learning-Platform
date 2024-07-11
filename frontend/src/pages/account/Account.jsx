import React from 'react'
import "./account.css"
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const Account = () => {
  return (
    <div className="profile">
        <h2>My profile</h2>
        <div className="profile-info">
            <p>
                <strong>Name - </strong>
            </p>

            <p>
                <strong>Email- </strong>
            </p>
            <button className='btn'><MdDashboard />Dashboard</button>
            <br/>
            <button
              className="btn"
              style={{ background: "red" }}
            ><IoMdLogOut />Logout</button>

        </div>
    </div>
  )
}

export default Account