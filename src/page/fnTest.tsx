import React, {useState, useEffect} from 'react'

interface IProps {
    visible?: boolean
}

function areEqual(preProps: any, nextProps: any): any {
    console.log('preProps:', preProps)
    console.log('nextProps:', nextProps)
    return true
}

export default  function FnTest(props: IProps) {
    const { visible } = props
    const [num, setNum] = useState(0)
    console.log('子组件', visible)
    useEffect(() => {
        console.log('effect渲染', visible)
    }, [])
    return (
        <div>这里是力王的天{num}</div>
    )
}

// export default React.memo(FnTest, areEqual)
// export default function FnTest(props: IProps) {
//     const { visible } = props
//     const [num, setNum] = useState(0)
//     console.log('子组件', visible)
//     useEffect(() => {
//         console.log('effect渲染', visible)
//     }, [])
//     return (
//         <div>这里是子组件{num}</div>
//     )
// }