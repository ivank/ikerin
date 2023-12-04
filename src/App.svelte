<script>
  // @ts-ignore
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import Experience from './pages/Experience.svelte';
  import Projects from './pages/Projects.svelte';
  import twitterXSvg from './assets/twitter-x.svg';
  import yCombinatorSvg from './assets/y-combinator.svg';

  export let url = '';
</script>

<Router {url}>
  <div class="bg-ebony p-4 font-code sm:p-16">
    <div class="flex min-h-full flex-col rounded border border-gunmetal bg-midnight font-code text-blueGrey">
      <section class="grid grid-cols-[1fr_minmax(min-content,theme(screens.lg))_1fr] border-b border-gunmetal">
        <div class="hidden h-14 flex-row items-center xl:flex">
          <div class="whitespace-nowrap px-6">ivan kerin</div>
        </div>
        <nav class="flex flex-row">
          <Link class="h-14" to="/" let:active>
            <div
              class="border-b-apricot border-l-gunmetal bg-gradient-to-t px-6 py-4 hover:from-apricot/10 xl:border-l"
              class:border-b-4={active}
              class:text-white={active}
            >
              <span class="hidden sm:inline">_hello</span>
              <span class="sm:hidden">_hi</span>
            </div>
          </Link>
          <Link class="h-14" to="/experience" let:active>
            <div
              class="border-l border-b-apricot border-l-gunmetal bg-gradient-to-t px-6 py-4 hover:from-apricot/10"
              class:border-b-4={active}
              class:text-white={active}
            >
              <span class="hidden sm:inline">_experience</span>
              <span class="sm:hidden">_exp</span>
            </div>
          </Link>
          <Link class="h-14" to="/projects" let:active>
            <div
              class="border-x border-x-gunmetal border-b-apricot bg-gradient-to-t px-6 py-4 hover:from-apricot/10"
              class:border-b-4={active}
              class:text-white={active}
            >
              <span class="hidden sm:inline">_projects</span>
              <span class="sm:hidden">_prg</span>
            </div>
          </Link>
        </nav>
      </section>
      <section class="flex-grow">
        <div class="mx-auto max-w-screen-lg">
          <Route path="/projects" component={Projects} />
          <Route path="/experience" component={Experience} />
          <Route path="/"><Home /></Route>
        </div>
      </section>
      <footer class="flex flex-row border-t border-gunmetal text-blueGrey/40">
        <span class="px-5 py-2"> Find me in: </span>
        <a
          class="-mr-px border-x border-gunmetal px-5 py-3 opacity-40 transition-opacity hover:opacity-100"
          title="Ivan Kerin on Twitter (X)"
          target="_blank"
          href="https://twitter.com/ikerin1"
        >
          <img src={twitterXSvg} alt="twitter icon" height="16" width="16" />
        </a>
        <a
          class="-mr-px border-x border-gunmetal px-5 py-3 opacity-40 transition-opacity hover:opacity-100"
          title="Ivan Kerin on Hacker News"
          target="_blank"
          href="https://news.ycombinator.com/user?id=seer"
        >
          <img src={yCombinatorSvg} alt="Twitter (X) icon" height="16" width="16" />
        </a>
      </footer>
    </div>
  </div>
</Router>
