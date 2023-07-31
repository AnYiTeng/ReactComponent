import React from "react";

interface IProps {
  [x: string]: any;
}
export default class ClassTest extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 0,
    };
    // console.log('类组件进来')
  }

  showMessage = () => {
    // console.log("定时器，props中info为 " + this.props.info);
  };

  handerClick = () => {
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
    // this.setState({ number: ((this.state) as unknown as any).number + 1 })
    // console.log(((this.state) as unknown as any).number)

    setTimeout(this.showMessage, 3000);
    // console.log(`点击里的props info: ${this.props.info}`)
  };

  render() {
    return (
      <div>
        <button onClick={this.handerClick}>点击类组件</button>
      </div>
    );
  }
}
