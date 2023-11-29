<script>
  import rivetSvg from '../assets/rivet.svg';
  import splash1Svg from '../assets/splash-1.svg';
  import splash2Svg from '../assets/splash-2.svg';
  // import viteLogo from '/vite.svg';
  // import Counter from './lib/Counter.svelte';
</script>

<main class="flex flex-row justify-stretch py-40">
  <div class="flex-grow">
    <h1 class=" text-lavender">
      Hi all, I am
      <p class="-m-1 mb-3 mt-1 text-6xl">Ivan Kerin</p>
      <p class="text-3xl text-ulrtramarine">&gt; Developer Polyglot</p>
    </h1>
    <div class="mt-8">
      <p>
        <span class="text-ulrtramarine">const</span> <span class="text-aquamarine">github</span> =
        <a href="https://github.com/ivank" class="text-apricot underline">"https://github.com/ivank"</a>
      </p>
      <p>
        <span class="text-ulrtramarine">const</span> <span class="text-aquamarine">linkedIn</span> =
        <a href="https://linkedin.com/in/ivankerin" class="text-apricot underline"
          >"https://linkedin.com/in/ivankerin"</a
        >
      </p>
    </div>
  </div>
  <div class="relative flex-grow">
    <div
      class="bg-gradient-150deg from-plantation relative aspect-video rounded-lg border border-ebony to-aquamarine/5 p-6 shadow-inner shadow-white/30"
    >
      <img class="absolute left-2 top-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute bottom-2 left-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute bottom-2 right-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <img class="absolute right-2 top-2" src={rivetSvg} alt="rivet" width="13" height="13" />
      <canvas class="box-border h-full w-full rounded bg-ebony p-4 shadow shadow-white/50"> </canvas>
    </div>
    <img class="absolute -left-28 -top-36 blur-3xl" src={splash1Svg} alt="splash" width="450" height="490" />
    <img
      class="absolute -bottom-28 -right-36 rotate-12 blur-3xl"
      src={splash2Svg}
      alt="splash"
      width="450"
      height="490"
    />
  </div>
</main>
