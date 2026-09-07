

export type AssetCategory = 'entity-cat' | 'entity-eye' | 'env-void' | 'env-mechanical' | 'env-cosmic' | 'env-corruption' | 'artifact' | 'ui';

interface ProceduralPlaceholderProps {
  category: AssetCategory;
  width?: number;
  height?: number;
}

export default function ProceduralPlaceholder({ category, width = 100, height = 100 }: ProceduralPlaceholderProps) {
  const style = { width, height };

  switch (category) {
    case 'entity-cat':
      return (
        <div style={style} className="relative opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-charcoal rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] blur-sm" />
          <div className="absolute top-0 left-[20%] w-[20%] h-[30%] bg-charcoal rotate-[-30deg] origin-bottom-right blur-[2px]" />
          <div className="absolute top-0 right-[20%] w-[20%] h-[30%] bg-charcoal rotate-[30deg] origin-bottom-left blur-[2px]" />
        </div>
      );
    case 'entity-eye':
      return (
        <div style={style} className="relative flex items-center justify-center opacity-30">
          <div className="w-[80%] h-[40%] border-t border-b border-ash rounded-[50%] flex items-center justify-center">
            <div className="w-[30%] aspect-square bg-slate rounded-full" />
          </div>
        </div>
      );
    case 'env-void':
      return (
        <div style={style} className="bg-gradient-radial from-abyss to-void opacity-50" />
      );
    case 'env-mechanical':
      return (
        <div style={style} className="relative overflow-hidden opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #35354a 1px, transparent 1px), linear-gradient(to bottom, #35354a 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-ghost" />
          <div className="absolute top-0 left-1/3 w-[1px] h-full bg-ghost" />
        </div>
      );
    case 'env-cosmic':
      return (
        <div style={style} className="relative overflow-hidden opacity-40">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-ghost rounded-full" 
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
      );
    case 'env-corruption':
      return (
        <div style={style} className="relative overflow-hidden opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-cold/20 to-transparent" style={{ backgroundSize: '10px 10px', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #1a1a24 10px, #1a1a24 20px)' }} />
        </div>
      );
    case 'artifact':
      return (
        <div style={style} className="relative flex items-center justify-center opacity-40">
          <div className="absolute inset-2 border border-dashed border-ash rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-6 border border-slate rounded-full bg-gradient-radial from-charcoal to-transparent" />
          <div className="w-2 h-2 bg-accent-cold rounded-full shadow-[0_0_10px_#4466aa]" />
        </div>
      );
    case 'ui':
    default:
      return (
        <div style={style} className="bg-charcoal/50 border border-slate/30" />
      );
  }
}
