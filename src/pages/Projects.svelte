<script lang="ts">
  import laminarSvg from '../assets/projects/laminar-logo.svg';
  import potygenJpg from '../assets/projects/potygen-logo.jpg';
  import calendarTodoSvg from '../assets/projects/calendar-todo.svg';
  import vanillaTuexDuexJpg from '../assets/projects/vanilla-tuexduex.jpg';
  import rpslsSvg from '../assets/projects/rpsls.svg';
  import rocketsizedJpg from '../assets/projects/rocketsized.jpg';

  interface Project {
    title: string;
    image: string;
    description: string;
    backgroundSize: 'contain' | 'cover';
    link: string;
  }

  const projects: Project[] = [
    {
      title: 'rocketsized',
      image: rocketsizedJpg,
      description: 'A small hobby project to list and compare various launch vehicles against one another.',
      backgroundSize: 'cover',
      link: 'https://rocketsized.com',
    },
    {
      title: 'potygen',
      image: potygenJpg,
      description:
        'Parse raw sql queries and convert to AST. Use it to generate types for individual queries of any complexity.',
      backgroundSize: 'cover',
      link: 'https://github.com/ivank/potygen',
    },
    {
      title: 'calendar-todo',
      image: calendarTodoSvg,
      description:
        "A quick little project to test out what's new in backend/frontend land - fly.io, prisma, fastify, rtk-query, vite, etc.",
      backgroundSize: 'contain',
      link: 'https://github.com/ivank/calendar-todo',
    },
    {
      title: 'laminar',
      image: laminarSvg,
      description: 'OpenApi backed REST APIs. Automatic validation of request / response based on the api schema.',
      backgroundSize: 'contain',
      link: 'https://github.com/ivank/laminar',
    },

    {
      title: 'vanilla-tuexduex',
      image: vanillaTuexDuexJpg,
      description:
        'This case study is an attempt to answer the question - can we build a modern, animated, stateful SPA with no dependencies and no build steps.',
      backgroundSize: 'cover',
      link: 'https://github.com/ivank/vanilla-teuxdeux',
    },
    {
      title: 'rpsls',
      image: rpslsSvg,
      description:
        'Rock Paper Scissors Lizard Spock - A React & Redux app, built with create-react-app and hosted at firebase.',
      backgroundSize: 'contain',
      link: 'https://github.com/ivank/rpsls',
    },
  ];
</script>

<main class="p-4 sm:p-8 lg:p-20 xl:px-0">
  <ol class="grid auto-cols-max auto-rows-fr grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
    {#each projects as project, i}
      <li class="group flex flex-col">
        <h2>
          <a href={project.link}>
            <span class="mr-2 font-bold text-ulrtramarine">Project {i + 1}</span> // _{project.title}
          </a>
        </h2>
        <div
          class="mt-3 flex-grow rounded-2xl border border-gunmetal bg-ebony shadow-lg transition group-hover:-translate-x-px group-hover:-translate-y-0.5 group-hover:shadow-lavender/10"
        >
          <a href={project.link}>
            <figure
              class="h-48 rounded-t-2xl border-b border-gunmetal bg-center bg-no-repeat p-7 brightness-[0.8] saturate-[0.8] transition group-hover:brightness-100 group-hover:saturate-100"
              class:bg-contain={project.backgroundSize === 'contain'}
              class:bg-origin-content={project.backgroundSize === 'contain'}
              class:bg-cover={project.backgroundSize === 'cover'}
              style:background-image="url({project.image})"
            />
          </a>
          <div class="p-7">
            <p class="mb-4">
              {project.description}
            </p>

            <a
              href={project.link}
              class="inline-block rounded-lg bg-blueGrey/40 px-3 py-2 text-sm font-light text-white transition hover:bg-blueGrey/60"
            >
              view project
            </a>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</main>
