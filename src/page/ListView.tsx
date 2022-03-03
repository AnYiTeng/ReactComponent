import React, { useEffect } from 'react'

export default function ListView() {
    useEffect(() => {
        window.addEventListener('popstate', function(e) {
            console.log(e,'eee')
        })
    }, [])

    return (
        <div>列表页面</div>
    )
}