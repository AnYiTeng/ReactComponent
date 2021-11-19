import React from 'react'

export default class ClassTest extends React.Component {
    constructor(props: any){
        super(props)
        this.state = {
            number: 0
        }
    }
    handerClick=()=>{
    //    for(let i = 0 ;i<5;i++){
    //        setTimeout(()=>{
    //            this.setState({ number: ((this.state) as unknown as any).number + 1 })
    //            console.log(((this.state) as unknown as any).number)
    //        },1000)
    //    }
        // for (let i = 0; i < 5; i++) {
        //     this.setState({ number: ((this.state) as unknown as any).number + 1 })
        //     console.log(((this.state) as unknown as any).number)
        // }
        this.setState({ number: ((this.state) as unknown as any).number + 1 })
        console.log(((this.state) as unknown as any).number)
    }

    render(){
        return <div>
            <button onClick={ this.handerClick } >num++</button>
        </div>
    }
}