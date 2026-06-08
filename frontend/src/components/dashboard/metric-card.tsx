interface Props {
  title: string;

  value: string;

  description: string;
}

export function MetricCard({
  title,
  value,
  description,
}: Props) {

  return (

    <div className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:shadow-md

      dark:border-white/10
      dark:bg-slate-900
    ">

      <div className="space-y-2">

        <p className="
          text-sm
          font-medium
          text-gray-500
          dark:text-gray-400
        ">
          {title}
        </p>

        <h2 className="
          text-4xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
        ">
          {value}
        </h2>

        <p className="
          text-sm
          text-gray-400
          dark:text-gray-500
        ">
          {description}
        </p>

      </div>

    </div>
  );
}