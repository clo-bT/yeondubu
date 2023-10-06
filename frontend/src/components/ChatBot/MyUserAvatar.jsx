import React from 'react';

const MyUserAvatar = () => {
    const image = localStorage.getItem('image')
    const avatar = image ? (
        <img src={image} alt="User Avatar" />
    ) : (
        <p>No Image Found</p>
    );

    return (
        <div>
            {avatar}
        </div>
    );
};

export default MyUserAvatar;