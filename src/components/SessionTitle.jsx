const sessionData = {
  'FOCUS': {
    title: 'ZERO DISTRACTION ZONE',
    subtitle: 'Close tabs, silence notifications, and dive in'
  },
  'BREAK': {
    title: 'QUICK RECHARGE',
    subtitle: 'Stay away from your screen and take a deep breath'
  },
  'LONG BREAK': {
    title: 'FULL REBOOT',
    subtitle: 'Do a quick stretch, walk, or hydrate. Your body will thank you!'
  }
}

const SessionTitle = ({sessionType}) => {
  const {title, subtitle} = sessionData[sessionType];

  return (
    <div className="text-center space-y-2 mb-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-gray-300 text-xl font-semibold italic">{subtitle}</p>
    </div>
  );
};

export default SessionTitle;