import React, {
  useEffect,
  useState,
  Profiler,
  useCallback,
  useMemo,
} from "react";
import Children from "./children";

export default function Playground() {
  const [count, setCount] = useState(0);
  // const [name, setName] = useState("小明");
  const userInfo = useMemo(() => ({ name: "小明", age: 18 }), []);

  const increment = () => setCount(count + 1);

  // const onClick = useCallback((name: string) => {
  //   setName(name);
  // }, []);

  const onRender = (
    id: string,
    phase: any,
    actualDuration: number,
    baseDuration: number
  ) => {
    console.info("组件实际render一次的时间：", actualDuration);
    console.info("组件在不命中任何缓存时render一次的时间", baseDuration);
  };

  return (
    <div>
      <button onClick={increment}>点击次数：{count}</button>
      <Profiler id="test" onRender={onRender}>
        <Children userInfo={userInfo} />
      </Profiler>
    </div>
  );
}
