<script>
  import rivetSvg from './assets/rivet.svg';
  import splash1Svg from './assets/splash-1.svg';
  import splash2Svg from './assets/splash-2.svg';
  // import viteLogo from '/vite.svg';
  // import Counter from './lib/Counter.svelte';
</script>

<main class="h-full rounded border border-blueGrey bg-midnight text-blueGrey">
  <section class="grid grid-cols-[1fr_minmax(min-content,theme(screens.lg))_1fr] border-b border-blueGrey">
    <div class="hidden h-14 flex-row items-center xl:flex">
      <div class="px-6">ivan kerin</div>
    </div>
    <nav class="flex h-14 flex-row">
      <a class="border-b-4 border-b-apricot border-l-blueGrey px-6 py-4 text-white xl:border-l" href="/"> _hello </a>
      <a class="hover: border-l border-l-blueGrey bg-gradient-to-t px-6 py-4 hover:from-apricot/10" href="/">
        _experience
      </a>
      <a class="border-x border-x-blueGrey bg-gradient-to-t px-6 py-4 hover:from-apricot/10" href="/"> _contacts </a>
    </nav>
  </section>
  <section class="mx-auto flex max-w-screen-lg flex-row justify-stretch py-40">
    <h1 class="flex-grow text-lavender">
      Hi all, I am
      <p class="-m-1 my-2 text-6xl">Ivan Kerin</p>
      <p class="text-3xl text-ulrtramarine">&gt; Developer Polyglot</p>
    </h1>
    <div class="relative">
      <div
        class="bg-gradient-150deg from-plantation relative h-96 w-96 rounded-lg border border-ebony to-aquamarine/5 p-5 shadow-inner shadow-white/30"
      >
        <img class="absolute left-2 top-2 w-3" src={rivetSvg} alt="rivet" />
        <img class="absolute bottom-2 left-2 w-3" src={rivetSvg} alt="rivet" />
        <img class="absolute bottom-2 right-2 w-3" src={rivetSvg} alt="rivet" />
        <img class="absolute right-2 top-2 w-3" src={rivetSvg} alt="rivet" />
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
  </section>
</main>
