import React, {useState, useEffect, useMemo} from 'react'

interface IProps {
    visible?: boolean
    info?: number
}

function areEqual(preProps: any, nextProps: any): any {
    console.log('preProps:', preProps)
    console.log('nextProps:', nextProps)
    return true
}

export default React.memo(function FnTest(props: IProps) {
    const { info } = props

    const showMessage = () => {
        console.log("定时器props中info为?? " + info);
    }

    // useEffect(() => {
    //     setTimeout(showMessage, 3000)
    // }, [props.info])

    const handleClick = () => {
        // setTimeout(showMessage, 3000)
        console.log(`点击里的props info: ${info}`)
    }
    return <div onClick={() => handleClick()}>点击函数组件</div>
})


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