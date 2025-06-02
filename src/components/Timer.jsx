import {useEffect, useRef, useState} from "react";

const Timer = ({initialTime, onTimerEnd}) => {
  const [time, setTime] = useState(initialTime);
  const [isActivated, setIsActivated] = useState(false);
  const timer = useRef(null);
  const autoStart = true;

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isActivated) {
      timer.current = setInterval(() => {
        setTime(time => time - 1);
        if (time === 0) {
          if (!autoStart) {
            setIsActivated(!isActivated);
            clearInterval(timer.current);
          }
          console.log('test')
          onTimerEnd();
          clearInterval(timer.current);
        }
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [isActivated, time])

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formatTime = (time) => time.toString().padStart(2, '0');

  const handleTimer = () => {setIsActivated(!isActivated);}

  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="flex font-digital text-center text-white">
        <h1 className="countdown text-9xl">{formatTime(minutes)}</h1>
        <h1 className="text-9xl">:</h1>
        <h1 className="countdown text-9xl">{formatTime(seconds)}</h1>
      </div>
      <div className="flex mt-8">
        <button onClick={handleTimer} className="btn w-25 shadow-md bg-[#01f501] font-bold text-gray-950 rounded-full">
          {isActivated ? (< i className='bx  bxs-pause text-3xl'/>) : (< i className='bx  bxs-play text-3xl' />)}
        </button>
        {isActivated && (
          <button className="w-25 bg-transparent font-bold text-white">
            < i className='bx  bxs-skip-next text-3xl'  />
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;