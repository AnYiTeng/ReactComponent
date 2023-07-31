import React from "react";

interface IProps {
  name?: string;
  onClick?: (T: any) => void;
  userInfo?: {
    name: string;
    age: number;
  };
}

function Children({ name, onClick, userInfo }: IProps) {
  console.info("子组件渲染");
  return (
    <>
      <div>子组件</div>
      <button onClick={() => onClick && onClick("小红")}>改变{name}值</button>
      <div>
        <div>姓名: {userInfo?.name}</div>
        <div>年龄: {userInfo?.age}</div>
      </div>
    </>
  );
}

export default React.memo(Children);
