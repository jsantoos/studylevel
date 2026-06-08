export function PageLoader() {

  return (

    <div
      className="
        flex
        min-h-[400px]
        items-center
        justify-center
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
        "
      >

        <div className="relative">

          <div
            className="
              h-20
              w-20
              rounded-full
              border-4
              border-indigo-500/20
            "
          />

          <div
            className="
              absolute
              inset-0
              h-20
              w-20
              animate-spin
              rounded-full
              border-4
              border-transparent
              border-t-indigo-500
              border-r-fuchsia-500
            "
          />

          <div
            className="
              absolute
              inset-3
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-lg

              dark:bg-slate-950
            "
          >

            <div
              className="
                bg-gradient-to-r
                from-indigo-500
                to-fuchsia-500
                bg-clip-text
                text-lg
                font-black
                text-transparent
              "
            >

              AI

            </div>

          </div>

        </div>

        <div className="mt-8 text-center">

          <h3
            className="
              text-xl
              font-black
              tracking-tight
              text-gray-900

              dark:text-white
            "
          >

            Carregando experiência

          </h3>

          <p
            className="
              mt-2
              text-sm
              text-gray-500

              dark:text-gray-400
            "
          >

            Preparando sua jornada inteligente...

          </p>

        </div>

      </div>

    </div>

  );
}