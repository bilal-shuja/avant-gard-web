import React from 'react'
import './LoaderStyles.scss'

const NavbarSkeleton = () => {
    return (
        <div>
            <div className='mt-1 d-flex'>
                <div className="video m-1"></div>
                <div className="video m-1"></div>
                <div className="video m-1"></div>
                <div className="video m-1"></div>
            </div>
        </div>
    )
}

export default NavbarSkeleton