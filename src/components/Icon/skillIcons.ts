import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faAngular,
  faCss3Alt,
  faGitAlt,
  faGithub,
  faHtml5,
  faJs,
  faMicrosoft,
  faNodeJs,
  faPython,
  faReact,
  faTailwindCss,
  faTypescript,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons'
import type { IconType } from 'react-icons'
import {
  SiCss,
  SiDocker,
  SiEslint,
  SiGooglefit,
  SiLaravel,
  SiLighthouse,
  SiMysql,
  SiOllama,
  SiRender,
  SiSqlite,
  SiSupabase,
  SiVercel,
  SiVite,
} from 'react-icons/si'

export type SkillIcon =
  | { kind: 'fa'; icon: IconDefinition }
  | { kind: 'si'; icon: IconType }

const skillIconMap: Record<string, SkillIcon> = {
  React: { kind: 'fa', icon: faReact },
  'React Native': { kind: 'fa', icon: faReact },
  'React & TypeScript': { kind: 'fa', icon: faReact },
  'Next.js': { kind: 'fa', icon: faNodeJs },
  Angular: { kind: 'fa', icon: faAngular },
  TypeScript: { kind: 'fa', icon: faTypescript },
  JavaScript: { kind: 'fa', icon: faJs },
  HTML5: { kind: 'fa', icon: faHtml5 },
  CSS3: { kind: 'fa', icon: faCss3Alt },
  'Tailwind CSS': { kind: 'fa', icon: faTailwindCss },
  'C# / .NET': { kind: 'fa', icon: faMicrosoft },
  '.NET / C#': { kind: 'fa', icon: faMicrosoft },
  'PHP / Laravel': { kind: 'si', icon: SiLaravel },
  Docker: { kind: 'si', icon: SiDocker },
  Ollama: { kind: 'si', icon: SiOllama },
  'Ollama & Python': { kind: 'si', icon: SiOllama },
  Render: { kind: 'si', icon: SiRender },
  Vercel: { kind: 'si', icon: SiVercel },
  Git: { kind: 'fa', icon: faGitAlt },
  GitHub: { kind: 'fa', icon: faGithub },
  'Git & GitHub': { kind: 'fa', icon: faGithub },
  WordPress: { kind: 'fa', icon: faWordpress },
  Python: { kind: 'fa', icon: faPython },
  Vite: { kind: 'si', icon: SiVite },
  Supabase: { kind: 'si', icon: SiSupabase },
  MySQL: { kind: 'si', icon: SiMysql },
  SQLite: { kind: 'si', icon: SiSqlite },
  'MySQL & SQLite': { kind: 'si', icon: SiMysql },
  'Health Tech': { kind: 'si', icon: SiGooglefit },
  'UI responsive': { kind: 'si', icon: SiCss },
  'Performance & UX': { kind: 'si', icon: SiLighthouse },
  'Clean code': { kind: 'si', icon: SiEslint },
}

const skillKeywordRules: [RegExp, SkillIcon][] = [
  [/supabase/i, { kind: 'si', icon: SiSupabase }],
  [/vite/i, { kind: 'si', icon: SiVite }],
  [/sqlite/i, { kind: 'si', icon: SiSqlite }],
  [/mysql/i, { kind: 'si', icon: SiMysql }],
  [/vercel/i, { kind: 'si', icon: SiVercel }],
  [/render/i, { kind: 'si', icon: SiRender }],
  [/ollama/i, { kind: 'si', icon: SiOllama }],
  [/laravel|php/i, { kind: 'si', icon: SiLaravel }],
  [/ocr/i, { kind: 'si', icon: SiGooglefit }],
  [/responsive/i, { kind: 'si', icon: SiCss }],
  [/performance|ux/i, { kind: 'si', icon: SiLighthouse }],
  [/clean\s*code/i, { kind: 'si', icon: SiEslint }],
  [/github/i, { kind: 'fa', icon: faGithub }],
  [/git/i, { kind: 'fa', icon: faGitAlt }],
  [/typescript/i, { kind: 'fa', icon: faTypescript }],
  [/react/i, { kind: 'fa', icon: faReact }],
  [/next\.?js/i, { kind: 'fa', icon: faNodeJs }],
  [/angular/i, { kind: 'fa', icon: faAngular }],
  [/javascript/i, { kind: 'fa', icon: faJs }],
  [/tailwind/i, { kind: 'fa', icon: faTailwindCss }],
  [/html\s*5?/i, { kind: 'fa', icon: faHtml5 }],
  [/css\s*3?/i, { kind: 'fa', icon: faCss3Alt }],
  [/python/i, { kind: 'fa', icon: faPython }],
  [/wordpress/i, { kind: 'fa', icon: faWordpress }],
  [/(\.net|c#)/i, { kind: 'fa', icon: faMicrosoft }],
  [/node\.?js/i, { kind: 'fa', icon: faNodeJs }],
]

export function getSkillIcon(skill: string): SkillIcon | undefined {
  const exact = skillIconMap[skill]
  if (exact) return exact

  return skillKeywordRules.find(([pattern]) => pattern.test(skill))?.[1]
}
