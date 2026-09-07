
interface OrbitalRingProps {
  time: number;
}

export function OrbitalRing({ time }: OrbitalRingProps) {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
      <div 
        className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-ash"
        style={{ transform: `rotate(${time * 10}deg)` }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full border border-dotted border-slate"
        style={{ transform: `rotate(${-time * 5}deg)` }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full border border-ghost opacity-10"
      />
    </div>
  );
}
