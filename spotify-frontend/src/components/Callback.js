import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { push } from 'react-router-dom'
import HomePage from './HomePage';

function Callback(props) {

    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const code = window.location.href.split('/')[3].split('=')[1]

    useEffect(() => {
        this.props.history.push('home')
    }, [])

    return (
        <div>

        </div>
    )
}

export default Callback;