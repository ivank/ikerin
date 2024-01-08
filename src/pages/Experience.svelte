<script lang="ts">
  import clippingsSvg from '../assets/experiences/clippings.svg';
  import enhancvSvg from '../assets/experiences/enhancv.svg';
  import ovoEnergySvg from '../assets/experiences/ovo-energy.svg';
  import riznSvg from '../assets/experiences/rizn.svg';
  import zenGuruPng from '../assets/experiences/zen-guru.png';
  import awsSvg from '../assets/tech/aws.svg';
  import ectoSvg from '../assets/tech/ecto.svg';
  import braintreeSvg from '../assets/tech/braintree.svg';
  import cakePhpSvg from '../assets/tech/cake-php.svg';
  import clojureSvg from '../assets/tech/clojure.svg';
  import circleCISvg from '../assets/tech/circleci.svg';
  import materialUISvg from '../assets/tech/material-ui.svg';
  import cypressSvg from '../assets/tech/cypress.svg';
  import dockerSvg from '../assets/tech/docker.svg';
  import elixirSvg from '../assets/tech/elixir.svg';
  import bootstrapSvg from '../assets/tech/bootstrap.svg';
  import fastifySvg from '../assets/tech/fastify.svg';
  import figmaSvg from '../assets/tech/figma.svg';
  import vitestSvg from '../assets/tech/vitest.svg';
  import gcpSvg from '../assets/tech/gcp.svg';
  import gitSvg from '../assets/tech/git.svg';
  import chatgptSvg from '../assets/tech/chatgpt.svg';
  import graphqlSvg from '../assets/tech/graphql.svg';
  import gruntSvg from '../assets/tech/grunt.svg';
  import jestSvg from '../assets/tech/jest.svg';
  import jquerySvg from '../assets/tech/jest.svg';
  import kafkaSvg from '../assets/tech/kafka.svg';
  import kubernetesSvg from '../assets/tech/kubernetes.svg';
  import mongodbSvg from '../assets/tech/mongodb.svg';
  import mysqlSvg from '../assets/tech/mysql.svg';
  import nodejsSvg from '../assets/tech/nodejs.svg';
  import phoenixSvg from '../assets/tech/phoenix.svg';
  import phpSvg from '../assets/tech/php.svg';
  import postgresSvg from '../assets/tech/postgres.svg';
  import pythonSvg from '../assets/tech/python.svg';
  import reactSvg from '../assets/tech/react.svg';
  import flySvg from '../assets/tech/fly.svg';
  import reduxSvg from '../assets/tech/redux.svg';
  import rubySvg from '../assets/tech/ruby.svg';
  import svelteSvg from '../assets/tech/svelte.svg';
  import symfonySvg from '../assets/tech/symfony.svg';
  import terraformSvg from '../assets/tech/terraform.svg';
  import travisSvg from '../assets/tech/travis.svg';
  import typescriptSvg from '../assets/tech/typescript.svg';
  import ubuntuSvg from '../assets/tech/ubuntu.svg';
  import Tooltip from '../lib/Tooltip.svelte';

  interface Tech {
    icon: string;
    title: string;
  }

  interface Experience {
    role: string;
    company: string;
    companyLink: string;
    logo: string;
    logoHeight: number;
    description: string;
    dates: { from: string; to: string };
    location: string;
    tech: Tech[];
  }

  const t = {
    aws: { icon: awsSvg, title: 'Amazon Web Services (AWS)' },
    braintree: { icon: braintreeSvg, title: 'Braintree (PayPal)' },
    cakePhp: { icon: cakePhpSvg, title: 'CakePHP' },
    circleCI: { icon: circleCISvg, title: 'CircleCI' },
    cypress: { icon: cypressSvg, title: 'CypressJS' },
    elixir: { icon: elixirSvg, title: 'Elixir' },
    ecto: { icon: ectoSvg, title: 'Ecto' },
    bootstrap: { icon: bootstrapSvg, title: 'Twitter Bootstrap' },
    docker: { icon: dockerSvg, title: 'Docker' },
    fastify: { icon: fastifySvg, title: 'Fastify' },
    figma: { icon: figmaSvg, title: 'Figma' },
    fly: { icon: flySvg, title: 'Fly.io' },
    gcp: { icon: gcpSvg, title: 'Google Cloud Platform (GCP)' },
    git: { icon: gitSvg, title: 'Git' },
    chatgpt: { icon: chatgptSvg, title: 'AI Fundamentals' },
    clojure: { icon: clojureSvg, title: 'Clojure' },
    graphql: { icon: graphqlSvg, title: 'GraphQL' },
    grunt: { icon: gruntSvg, title: 'Grunt' },
    jest: { icon: jestSvg, title: 'Jest' },
    jquery: { icon: jquerySvg, title: 'JQuery' },
    kafka: { icon: kafkaSvg, title: 'Apache Kafka' },
    kubernetes: { icon: kubernetesSvg, title: 'Kubernetes' },
    mongodb: { icon: mongodbSvg, title: 'MongoDB' },
    mysql: { icon: mysqlSvg, title: 'MySQL' },
    nodejs: { icon: nodejsSvg, title: 'NodeJS' },
    phoenix: { icon: phoenixSvg, title: 'Phoenix' },
    php: { icon: phpSvg, title: 'PHP' },
    postgres: { icon: postgresSvg, title: 'Postgres' },
    python: { icon: pythonSvg, title: 'Python' },
    react: { icon: reactSvg, title: 'React' },
    redux: { icon: reduxSvg, title: 'Redux' },
    ruby: { icon: rubySvg, title: 'Ruby' },
    svelte: { icon: svelteSvg, title: 'Svelte' },
    symfony: { icon: symfonySvg, title: 'Symfony' },
    terraform: { icon: terraformSvg, title: 'Terraform' },
    travis: { icon: travisSvg, title: 'Travis' },
    typescript: { icon: typescriptSvg, title: 'Typescript' },
    ubuntu: { icon: ubuntuSvg, title: 'Ubuntu' },
    vitest: { icon: vitestSvg, title: 'Vitest' },
    materialUI: { icon: materialUISvg, title: 'Material UI' },
  };

  const experiences: Experience[] = [
    {
      role: 'Sabbatical',
      logo: zenGuruPng,
      logoHeight: 26,
      description: 'Rest and recharge by traveling around asia. Fool around with some new technologies. Have fun',
      location: 'Asia',
      company: 'Sabbatical',
      companyLink: 'https://www.youtube.com/watch?v=HlWW-o9yXQI',
      dates: { from: 'March 2023', to: 'present' },
      tech: [t.elixir, t.phoenix, t.ecto, t.chatgpt, t.svelte, t.react, t.redux, t.fastify, t.fly, t.vitest],
    },
    {
      role: 'Remote Team Lead',
      logo: ovoEnergySvg,
      logoHeight: 33,
      description:
        'A tech lead in a skunk-works team that managed to take over and successfully ship a project with a 2.5 years past its deadline, helping the company meet stringent regulatory requirements. Initiated and developed their green energy tech initiative.',
      location: 'Bristol',
      company: 'OVO Energy',
      companyLink: 'https://company.ovo.com',
      dates: { from: 'Jan 2018', to: 'March 2023' },
      tech: [
        t.nodejs,
        t.typescript,
        t.react,
        t.terraform,
        t.circleCI,
        t.aws,
        t.gcp,
        t.kafka,
        t.postgres,
        t.cypress,
        t.figma,
        t.clojure,
        t.docker,
        t.materialUI,
      ],
    },
    {
      role: 'Team Lead',
      logo: enhancvSvg,
      logoHeight: 18,
      description:
        "Implemented React Frontend and a nodejs payment backend. Helped the team turn the startup's MRR from $2000 to $100000, implementing the subscription service.",
      location: 'Sofia',
      company: 'Enhancv',
      companyLink: 'https://enhancv.com',
      dates: { from: 'Feb 2016', to: 'Dec 2017' },
      tech: [t.react, t.redux, t.mongodb, t.jest, t.ubuntu, t.braintree],
    },
    {
      role: 'CTO',
      logo: clippingsSvg,
      logoHeight: 18,
      description:
        'Led a team of software developers to build from scratch a high end furniture selling marketplace. The startup had several successful investment rounds starting at $2M Valuation and is still in business today.',
      location: 'London',
      company: 'Clippings',
      companyLink: 'https://clippings.com',
      dates: { from: 'Oct 2010', to: 'Jan 2016' },
      tech: [t.php, t.mysql, t.git, t.jquery, t.symfony, t.cakePhp, t.bootstrap],
    },
    {
      role: 'Lead Developer',
      logo: riznSvg,
      logoHeight: 18,
      description:
        'Developed more than 15 websites in the most innovative web agency in Bulgaria. E-commerce solutions, portfolio websites, forums etc. Most project won various web awards in Bulgaria.',
      location: 'Sofia',
      company: 'Rizn',
      companyLink: 'https://rizn.bg',
      dates: { from: 'Dec 2005', to: 'Oct 2010' },
      tech: [t.php, t.mysql, t.ruby, t.python, t.git],
    },
  ];
</script>

<main class="p-4 sm:p-8 lg:p-20 xl:px-0">
  <ol role="list" class="flex flex-col gap-14">
    {#each experiences as experience}
      <li
        class="relative border-l-2 border-gunmetal pl-4 before:absolute before:-left-4 before:-top-1 before:h-7 before:w-7 before:content-mapPin"
      >
        <div>
          <span class="text-ulrtramarine"> {experience.dates.from} - {experience.dates.to} </span>
          <span class="hidden sm:inline">|</span>
          <a href={experience.companyLink} class="group relative my-2 block sm:my-0 sm:inline">
            <img
              class="inline-block align-middle brightness-90 transition-all group-hover:brightness-100"
              style:height="{experience.logoHeight}px"
              src={experience.logo}
              alt={experience.logo}
              title={experience.company}
            />
            |
            <span class="align-middle transition-all group-hover:brightness-125">{experience.location}</span>

            <Tooltip>
              {experience.company}
            </Tooltip>
          </a>
        </div>
        <h2 class="my-2 text-2xl font-semibold text-lavender">
          {experience.role}
        </h2>
        <p class="mb-4 mt-2">
          {experience.description}
        </p>
        <ul class="flex-list flex flex-wrap gap-2">
          {#each experience.tech as tech}
            <li class="group relative">
              <img
                class="h-8 w-8 opacity-60 saturate-[0.1] transition hover:scale-105 hover:opacity-100 hover:saturate-100"
                src={tech.icon}
                alt={tech.title}
                title={tech.title}
              />
              <Tooltip>
                {tech.title}
              </Tooltip>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ol>
</main>
