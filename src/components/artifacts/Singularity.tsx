
interface SingularityProps {
  isClimax: boolean;
}

export function Singularity({ isClimax }: SingularityProps) {
  const size = isClimax ? 300 : 200;
  
  return (
    <div 
      className="absolute rounded-full transition-all duration-1000 ease-out flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'radial-gradient(circle, #000 0%, #050507 40%, transparent 80%)',
        boxShadow: isClimax ? 'inset 0 0 100px #000, 0 0 50px rgba(10,10,15,0.8)' : 'inset 0 0 50px #000',
        transform: isClimax ? 'scale(1.2)' : 'scale(1)',
        opacity: 0.9
      }}
    >
      <div className="w-1/2 h-1/2 rounded-full bg-void animate-pulse opacity-80 filter blur-md"></div>
    </div>
  );
}
