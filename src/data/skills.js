/* Skills from the résumé's "Skills Summary", rendered as a logo wall.
   `id` is the SVG file in /public/skills (brand-coloured logos from
   devicon / simple-icons); `group` drives the category filter. */

export const SKILL_GROUPS = [
  'Languages',
  'Frontend',
  'Backend',
  'Data & Messaging',
  'Cloud & Containers',
  'CI/CD & IaC',
  'Observability',
  'Testing & Tools',
];

export const skills = [
  { id: 'java', name: 'Java', group: 'Languages' },
  { id: 'javascript', name: 'JavaScript', group: 'Languages' },
  { id: 'python', name: 'Python', group: 'Languages' },
  { id: 'bash', name: 'Shell', group: 'Languages' },

  { id: 'react', name: 'React', group: 'Frontend' },
  { id: 'webpack', name: 'Module Federation', group: 'Frontend' },
  { id: 'react', name: 'React Native', group: 'Frontend', key: 'react-native' },
  { id: 'html5', name: 'HTML5', group: 'Frontend' },
  { id: 'css3', name: 'CSS3', group: 'Frontend' },

  { id: 'spring', name: 'Spring Boot', group: 'Backend' },
  { id: 'hibernate', name: 'Hibernate', group: 'Backend' },
  { id: 'nodejs', name: 'Node.js', group: 'Backend' },
  { id: 'express', name: 'Express', group: 'Backend' },
  { id: 'fastapi', name: 'FastAPI', group: 'Backend' },
  { id: 'flask', name: 'Flask', group: 'Backend' },
  { id: 'swagger', name: 'OpenAPI', group: 'Backend' },
  { id: 'tomcat', name: 'Tomcat', group: 'Backend' },
  { id: 'nginx', name: 'Nginx', group: 'Backend' },

  { id: 'kafka', name: 'Apache Kafka', group: 'Data & Messaging' },
  { id: 'stomp', name: 'WebSocket', group: 'Data & Messaging' },
  { id: 'postgresql', name: 'PostgreSQL', group: 'Data & Messaging' },
  { id: 'mongodb', name: 'MongoDB', group: 'Data & Messaging' },
  { id: 'redis', name: 'Redis', group: 'Data & Messaging' },
  { id: 'h2', name: 'H2', group: 'Data & Messaging' },
  { id: 'firebase', name: 'Firebase', group: 'Data & Messaging' },

  { id: 'aws', name: 'AWS', group: 'Cloud & Containers' },
  { id: 'docker', name: 'Docker', group: 'Cloud & Containers' },
  { id: 'kubernetes', name: 'Kubernetes', group: 'Cloud & Containers' },
  { id: 'helm', name: 'Helm', group: 'Cloud & Containers' },
  { id: 'linux', name: 'Linux', group: 'Cloud & Containers' },
  { id: 'ubuntu', name: 'Ubuntu', group: 'Cloud & Containers' },
  { id: 'centos', name: 'CentOS', group: 'Cloud & Containers' },
  { id: 'huggingface', name: 'Hugging Face', group: 'Cloud & Containers' },

  { id: 'terraform', name: 'Terraform', group: 'CI/CD & IaC' },
  { id: 'ansible', name: 'Ansible', group: 'CI/CD & IaC' },
  { id: 'jenkins', name: 'Jenkins', group: 'CI/CD & IaC' },
  { id: 'githubactions', name: 'GitHub Actions', group: 'CI/CD & IaC' },
  { id: 'git', name: 'Git', group: 'CI/CD & IaC' },
  { id: 'github', name: 'GitHub', group: 'CI/CD & IaC' },
  { id: 'bitbucket', name: 'Bitbucket', group: 'CI/CD & IaC' },
  { id: 'maven', name: 'Maven', group: 'CI/CD & IaC' },
  { id: 'jfrog', name: 'JFrog', group: 'CI/CD & IaC' },

  { id: 'elasticsearch', name: 'Elasticsearch', group: 'Observability' },
  { id: 'logstash', name: 'Logstash', group: 'Observability' },
  { id: 'kibana', name: 'Kibana', group: 'Observability' },
  { id: 'sonarqube', name: 'SonarQube', group: 'Observability' },

  { id: 'junit', name: 'JUnit', group: 'Testing & Tools' },
  { id: 'jira', name: 'Jira', group: 'Testing & Tools' },
  { id: 'claude', name: 'Claude CLI', group: 'Testing & Tools' },
  { id: 'intellij', name: 'IntelliJ IDEA', group: 'Testing & Tools' },
  { id: 'vscode', name: 'VS Code', group: 'Testing & Tools' },
  { id: 'postman', name: 'Postman', group: 'Testing & Tools' },
  { id: 'dbeaver', name: 'DBeaver', group: 'Testing & Tools' },
];

/* id → display name, for tool icons on projects / experience */
export const SKILL_NAMES = Object.fromEntries(skills.map((s) => [s.id, s.name]));

export const skillSrc = (id) => `/skills/${id}.svg`;
