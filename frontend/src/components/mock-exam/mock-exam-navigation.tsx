interface Props {
  onNext: () => void;

  onPrevious: () => void;

  disablePrevious: boolean;

  disableNext: boolean;
}

export function MockExamNavigation({
  onNext,
  onPrevious,
  disablePrevious,
  disableNext,
}: Props) {

  return (

    <div className="flex items-center justify-between gap-4">

      <button
        onClick={onPrevious}
        disabled={disablePrevious}
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-6
          py-3
          text-sm
          font-semibold
          text-gray-700
          shadow-sm
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40

          dark:border-white/10
          dark:bg-slate-900
          dark:text-gray-200
          dark:hover:bg-slate-800
        "
      >

        Anterior

      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className="
          rounded-2xl
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-fuchsia-500
          px-6
          py-3
          text-sm
          font-bold
          text-white
          shadow-xl
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-fuchsia-500/30
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >

        Próxima

      </button>

    </div>
  );
}