"use client";

export function GlobalLoader() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-white/80
        backdrop-blur-md

        dark:bg-slate-950/80
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
              h-24
              w-24
              rounded-full
              border-4
              border-indigo-500/10
            "
          />

          <div
            className="
              absolute
              inset-0
              h-24
              w-24
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
              inset-4
              flex
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-2xl

              dark:bg-slate-950
            "
          >

            <div
              className="
                bg-gradient-to-r
                from-indigo-500
                via-violet-500
                to-fuchsia-500
                bg-clip-text
                text-2xl
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
              text-2xl
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