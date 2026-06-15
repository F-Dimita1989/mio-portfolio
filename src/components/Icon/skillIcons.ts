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

const skillIconMap: Record<string, IconDefinition> = {
  React: faReact,
  'React Native': faReact,
  'Next.js': faNodeJs,
  Angular: faAngular,
  TypeScript: faTypescript,
  JavaScript: faJs,
  HTML5: faHtml5,
  CSS3: faCss3Alt,
  'Tailwind CSS': faTailwindCss,
  'C# / .NET': faMicrosoft,
  '.NET / C#': faMicrosoft,
  Git: faGitAlt,
  GitHub: faGithub,
  WordPress: faWordpress,
  Python: faPython,
}

export function getSkillIcon(skill: string): IconDefinition | undefined {
  return skillIconMap[skill]
}
