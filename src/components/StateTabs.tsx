const BUTTONS = [
  "loading",
  "success",
  "empty",
  "validation-error",
  "server-error",
] as const;

interface Props {
  active: string;
  onChange: (key: string) => void;
}

export default function StateTabs({ active, onChange }: Props) {
  return (
    <nav className="flex flex-wrap justify-center gap-2 mb-8">
      {BUTTONS.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer
            ${
              active === key
                ? "bg-sky-500 border-sky-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-sky-400 hover:text-sky-400"
            }`}
        >
          {key}
        </button>
      ))}
    </nav>
  );
}
