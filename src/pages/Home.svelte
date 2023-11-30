<script>
  import rivetSvg from '../assets/rivet.svg';
  import splash1Svg from '../assets/splash-1.svg';
  import splash2Svg from '../assets/splash-2.svg';
</script>

<main class="flex flex-row justify-stretch py-8 sm:py-20 lg:py-40">
  <div class="flex-grow px-4 sm:px-8 lg:px-40 xl:px-0">
    <h1 class="relative text-lavender">
      Hi all, I am
      <p class="-m-1 mb-3 mt-1 text-6xl">Ivan Kerin</p>
      <p class="text-3xl text-ulrtramarine">&gt; Developer Polyglot</p>
    </h1>
    <div class="mt-8">
      <p>
        <span class="text-ulrtramarine">const</span> <span class="text-aquamarine">github</span> =
        <a href="https://github.com/ivank" class="text-apricot underline"
          >"<span class="hidden sm:inline">https://</span>github.com/ivank"</a
        >
      </p>
      <p>
        <span class="text-ulrtramarine">const</span> <span class="text-aquamarine">linkedIn</span> =
        <a href="https://linkedin.com/in/ivankerin" class="text-apricot underline"
          >"<span class="hidden sm:inline">https://</span>linkedin.com/in/ivankerin"</a
        >
      </p>
    </div>
    <img
      class="pointer-events-none absolute left-[15%] top-[28%] -translate-x-[50%] -translate-y-[50%] blur-3xl lg:left-[30%] lg:top-[40%] xl:hidden"
      src={splash1Svg}
      alt="splash"
      width="450"
      height="490"
    />
    <img
      class="pointer-events-none absolute bottom-[50%] left-[10%] translate-x-[50%] translate-y-[50%] rotate-12 blur-3xl lg:bottom-[40%] lg:right-[40%] xl:hidden"
      src={splash2Svg}
      alt="splash"
      width="450"
      height="490"
    />
  </div>
  <div class="relative hidden flex-grow xl:block">
    <div
      class="bg-gradient-150deg from-plantation relative aspect-video rounded-lg border border-ebony to-aquamarine/5 p-6 shadow-inner shadow-white/30"
    >
      <img class="absolute left-2 top-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute bottom-2 left-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute bottom-2 right-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute right-2 top-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <canvas class="box-border h-full w-full rounded bg-ebony p-4 shadow shadow-white/50"> </canvas>
    </div>
    <img
      class="pointer-events-none absolute -left-28 -top-36 blur-3xl"
      src={splash1Svg}
      alt="splash"
      width="450"
      height="490"
    />
    <img
      class="pointer-events-none absolute -bottom-28 -right-36 rotate-12 blur-3xl"
      src={splash2Svg}
      alt="splash"
      width="450"
      height="490"
    />
  </div>
</main>
