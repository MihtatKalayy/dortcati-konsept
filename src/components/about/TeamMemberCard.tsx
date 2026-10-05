import { initials } from '../../content/team'
import type { TeamMember } from '../../content/types'

/** Ekip üyesi; fotoğraf yerine baş harfli soyut avatar. */
export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article>
      <div
        aria-hidden="true"
        className="flex aspect-square w-20 items-center justify-center border-2 border-ink bg-white font-display text-h3"
      >
        {initials(member.name)}
      </div>
      <h3 className="mt-5 text-h3">{member.name}</h3>
      <p className="mt-1 font-medium text-gray-600">{member.role}</p>
      <p className="mt-3 text-gray-600">{member.bio}</p>
    </article>
  )
}
