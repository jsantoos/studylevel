"use client";

export function AppBootstrapLoader() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9998]
        flex
        items-center
        justify-center
        bg-[#030712]
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
          gap-6
        "
      >

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-indigo-500
            via-violet-500
            to-fuchsia-500
            text-3xl
            font-black
            text-white
            shadow-2xl
          "
        >

          AI

        </div>

        <div className="text-center">

          <h2
            className="
              text-3xl
              font-black
              text-white
            "
          >

            StudyLevel

          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-400
            "
          >

            Inicializando plataforma...

          </p>

        </div>

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-white/10
            border-t-fuchsia-500
          "
        />

      </div>

    </div>

  );
}