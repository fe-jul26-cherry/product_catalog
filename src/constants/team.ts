export type TeamRole =
  'teamLead' | 'projectManager' | 'developer1' | 'developer2';

export interface TeamMember {
  id: string;
  role: TeamRole;
  name: string;
  github: string;
  photo?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-lead',
    role: 'teamLead',
    name: 'Olga',
    github: 'https://github.com/AlucardYagamiGame',
  },
  {
    id: 'project-manager',
    role: 'projectManager',
    name: 'Andrii',
    github: 'https://github.com/itisandrew25-ship-it',
  },
  {
    id: 'developer-1',
    role: 'developer1',
    name: 'Jenya',
    github: 'https://github.com/Dm1trik',
  },
  {
    id: 'developer-2',
    role: 'developer2',
    name: 'Anton',
    github: 'https://github.com/toshka7313',
  },
];
