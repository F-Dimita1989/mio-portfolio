import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  MobileIcon,
} from '@radix-ui/react-icons'
import type { ContactLink } from '../../data/contacts'
import type { RadixIconComponent } from './RadixIcon'

export const contactIcons: Record<ContactLink['id'], RadixIconComponent> = {
  phone: MobileIcon,
  email: EnvelopeClosedIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  cv: FileTextIcon,
}
