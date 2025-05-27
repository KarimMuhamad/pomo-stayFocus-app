import {useEffect, useState} from "react";
import SessionTitle from "./SessionTitle.jsx";
import Timer from "./Timer.jsx";

const Pomodoro = () => {
  const [session, setSession] = useState('FOCUS');
  const [seconds, setSeconds] = useState(0);
  const [currentSession, setCurrentSession] = useState(0);

  const sessionType = ['FOCUS', 'BREAK', 'LONG BREAK'];

  const switchSession = (type) => {
    setSession(type);

    switch (type) {
      case 'FOCUS':
        setSeconds(5);
        break;
      case 'BREAK':
        setSeconds(6);
        break;
      case 'LONG BREAK':
        setSeconds(8);
        break;
      default:
        setSeconds(5);
        break;
    }
  }

  useEffect(() => {
    if (currentSession === 0 || currentSession === 2 || currentSession === 4 || currentSession === 6) {
      switchSession(sessionType[0]);
    } else if (currentSession === 1 || currentSession === 3 || currentSession === 5) {
      switchSession(sessionType[1]);
    } else if (currentSession === 7) {
      switchSession(sessionType[2]);
    } else {
      setCurrentSession(0);
      switchSession(sessionType[0]);
    }
  }, [currentSession])

  return (
    <>
      <SessionTitle sessionType={session}/>
      <div className="flex bg-transparent backdrop-blur-md border shadow-md border-gray-700 rounded-full p-1">
        {sessionType.map((type) => (
          <button key={type}
                  className={`btn w-50 rounded-full font-semibold ${session === type ? 'bg-[#01f501] font-bold text-gray-950' : 'btn-ghost hover:bg-gray-800/20'}`}
                  onClick={() => switchSession(type)}
          >{type}</button>
        ))}
      </div>
      <Timer sessionType={session} initialTime={seconds} onTimerEnd={() => setCurrentSession(currentSession + 1)}/>
    </>
  );
}

export default Pomodoro;