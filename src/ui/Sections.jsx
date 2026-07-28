import {
  about,
  contact,
  earlierExperience,
  education,
  experience,
  extracurriculars,
  highlights,
  profile,
  projects,
  skills,
} from "../data/content";
import { navStations, stations } from "../data/stations";
import Section from "./Section";
import Reveal from "./Reveal";

const stationOf = (id) => stations.find((s) => s.id === id);
const numberOf = (id) =>
  String(navStations.findIndex((s) => s.id === id) + 1).padStart(2, "0");

function Heading({ id, title }) {
  return (
    <header className="mb-6">
      <p className="kicker">
        Station {numberOf(id)} — {stationOf(id)?.label}
      </p>
      <h2 className="mt-2 font-display text-[clamp(1.9rem,5.5vw,2.75rem)] leading-tight font-black tracking-tight text-chalk uppercase">
        {title}
      </h2>
    </header>
  );
}

function Tags({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((point) => (
        <li key={point} className="flex gap-3 text-sm leading-relaxed text-haze">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-beam/70" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  return (
    <Section id="about" side={stationOf("about").side} label="About" width="max-w-[38rem]">
      <Heading id="about" title="Who's flying" />
      <div className="space-y-4">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 70} as="p">
            <span className="block text-sm leading-relaxed text-haze sm:text-[0.95rem]">{p}</span>
          </Reveal>
        ))}
      </div>

      <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-white/8 pt-6">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={i * 60}>
            <dt className="font-display text-2xl leading-none font-black text-chalk">{h.stat}</dt>
            <dd className="mt-1.5 font-mono text-[0.65rem] tracking-[0.12em] text-beam uppercase">
              {h.label}
            </dd>
            <dd className="mt-1.5 text-xs leading-relaxed text-haze/85">{h.body}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      side={stationOf("experience").side}
      label="Experience"
      width="max-w-[40rem]"
    >
      <Heading id="experience" title="Where I've worked" />
      <ol className="space-y-7">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 80} as="li">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg leading-snug font-bold text-chalk">{job.role}</h3>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] text-haze/80 uppercase">
                {job.period}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-beam">
              {job.org} · {job.place}
            </p>
            <Bullets items={job.points} />
            <Tags items={job.tags} />
          </Reveal>
        ))}
      </ol>

      <div className="mt-7 border-t border-white/8 pt-5">
        <p className="font-mono text-[0.65rem] tracking-[0.18em] text-haze/70 uppercase">
          Previously
        </p>
        <ul className="mt-2 space-y-1">
          {earlierExperience.map((job) => (
            <li key={job.role} className="text-xs text-haze/80">
              {job.role} — <span className="text-haze/60">{job.org}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      side={stationOf("projects").side}
      label="Projects"
      width="max-w-[40rem]"
    >
      <Heading id="projects" title="Things I've built" />

      <ol className="space-y-7">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} as="li">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-bold text-chalk">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-chalk"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] text-haze/80 uppercase">
                {p.period}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-beam">{p.subtitle}</p>
            <Bullets items={p.points} />
            <Tags items={p.tags} />
          </Reveal>
        ))}
      </ol>

      <div className="mt-7 border-t border-white/8 pt-5">
        <p className="font-mono text-[0.65rem] tracking-[0.18em] text-haze/70 uppercase">
          Also built
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {rest.map((p) => (
            <li key={p.title} className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
              <h4 className="font-display text-sm font-bold text-chalk">{p.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-haze/80">{p.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" side={stationOf("skills").side} label="Skills" width="max-w-[38rem]">
      <Heading id="skills" title="Instrument panel" />
      <div className="space-y-5">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 70}>
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-beam uppercase">
              {group.group}
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Community() {
  return (
    <Section
      id="community"
      side={stationOf("community").side}
      label="Community and volunteering"
      width="max-w-[38rem]"
    >
      <Heading id="community" title="Off the clock" />
      <ol className="space-y-6">
        {extracurriculars.map((item, i) => (
          <Reveal key={item.role} delay={i * 70} as="li">
            <h3 className="font-display text-base font-bold text-chalk">{item.role}</h3>
            <p className="mt-0.5 font-mono text-xs text-beam">{item.org}</p>
            <Bullets items={item.points} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Education() {
  return (
    <Section
      id="education"
      side={stationOf("education").side}
      label="Education"
      width="max-w-[36rem]"
    >
      <Heading id="education" title="Where I learned it" />
      <Reveal>
        <h3 className="font-display text-lg leading-snug font-bold text-chalk">
          {education.degree}
        </h3>
        <p className="mt-1 font-mono text-xs text-beam">
          {education.school} · {education.place}
        </p>
        <p className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-3xl font-black text-chalk">{education.gpa}</span>
          <span className="font-mono text-[0.65rem] tracking-[0.14em] text-haze uppercase">
            Cumulative GPA
          </span>
        </p>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-6 font-mono text-[0.65rem] tracking-[0.16em] text-haze/70 uppercase">
          Selected coursework
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {education.courses.map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" side="center" align="end" label="Contact" width="max-w-[34rem]">
      <Heading id="contact" title={contact.heading} />
      <p className="text-sm leading-relaxed text-haze sm:text-[0.95rem]">{contact.body}</p>

      <ul className="mt-6 space-y-2">
        {profile.socials.map((s, i) => (
          <Reveal key={s.label} delay={i * 60} as="li">
            <a
              href={s.href}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-beam/30 hover:bg-beam/[0.07]"
            >
              <span className="font-mono text-[0.65rem] tracking-[0.16em] text-beam uppercase">
                {s.label}
              </span>
              <span className="truncate text-sm text-chalk">{s.handle}</span>
              <span
                aria-hidden
                className="text-haze transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      <p className="mt-6 text-center font-mono text-[0.62rem] tracking-[0.14em] text-haze/60 uppercase">
        The badges above are clickable too
      </p>
    </Section>
  );
}
