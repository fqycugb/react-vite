import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface NumberProps {
  value: string;
  index: number;
  total: number;
  delay?: number;
  className?: string;
  getHeight: () => number;
}

function Number({
  value,
  index,
  total,
  delay,
  className,
  getHeight,
}: NumberProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 150 - index * 2,
    damping: 15,
  });

  // 检查是否为非数字字符（如小数点）
  const isNonNumeric = String(+value) !== value;

  useEffect(() => {
    if (isNonNumeric || !numberRef.current) {
      return;
    }

    const update = () => {
      const height = getHeight();
      springValue.set(-height * +value);
    };

    if (!delay) {
      update();
      return;
    }

    const timer = setTimeout(
      update, 
      (total - index) * Math.floor(Math.random() * delay)
    );

    return () => clearTimeout(timer);
  }, [value, isNonNumeric, springValue, getHeight, index, total, delay]);

  if (isNonNumeric) {
    return <span>{value}</span>;
  }

  return (
    <motion.div
      ref={numberRef}
      style={{
        translateY: springValue,
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div className={className} key={i}>
          {i}
        </div>
      ))}
    </motion.div>
  );
}

interface TickerProps {
  value: number | string;
  className?: string;
  numberClassName?: string;
  delay?: number;
}

function Ticker({
  value,
  delay = 50,
  className,
  numberClassName,
}: TickerProps) {
  const parts = String(value).split("");
  const divRef = useRef<HTMLDivElement>(null);
  const getHeight = useCallback(
    () => divRef.current?.getBoundingClientRect().height ?? 0,
    []
  );

  return (
    <div
      className={`relative overflow-hidden whitespace-pre tabular-nums ${className}`}
    >
      <div className="absolute inset-0 flex min-w-fit">
        {parts.map((part, index) => (
          <Number
            getHeight={getHeight}
            index={index}
            key={index}
            value={part}
            total={parts.length}
            className={numberClassName}
            delay={delay}
          />
        ))}
      </div>
      <div ref={divRef} className="invisible min-w-fit">
        {value}
      </div>
    </div>
  );
}
function App() {
    const [value, setValue] = useState(0);
  
    return (
      <div>
        <Ticker 
          value={value.toFixed(2)} 
          className="text-2xl font-bold"
          numberClassName="h-8" // 设置数字高度
          delay={50} // 设置动画延迟
        />
        <button 
          onClick={() => setValue(prev => prev + 10.55)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          增加 10.55
        </button>
      </div>
    );
  }
  export default App