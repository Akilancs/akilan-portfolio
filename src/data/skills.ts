import type { SkillData } from '../types/projects';

export const skills: SkillData[] = [
  // Languages
  { id: 'java', name: 'Java', category: 'languages', categoryLabel: 'Languages', relatedProjects: ['log-analyzer'], prominence: 'core' },
  { id: 'python', name: 'Python', category: 'languages', categoryLabel: 'Languages', relatedProjects: ['nids', 'docverify'], prominence: 'core' },
  { id: 'c', name: 'C', category: 'languages', categoryLabel: 'Languages', relatedProjects: [], prominence: 'core' },
  { id: 'cpp', name: 'C++', category: 'languages', categoryLabel: 'Languages', relatedProjects: ['fuzzer'], prominence: 'core' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', categoryLabel: 'Languages', relatedProjects: ['network-cli'], prominence: 'core' },
  { id: 'html', name: 'HTML', category: 'languages', categoryLabel: 'Languages', relatedProjects: [], prominence: 'secondary' },
  { id: 'css', name: 'CSS', category: 'languages', categoryLabel: 'Languages', relatedProjects: [], prominence: 'secondary' },

  // ML / Deep Learning
  { id: 'cnn', name: 'CNN', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'core' },
  { id: 'bilstm', name: 'BiLSTM', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'core' },
  { id: 'attention', name: 'Attention Architectures', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'core' },
  { id: 'model-training', name: 'Model Training/Evaluation', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'secondary' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'core' },
  { id: 'keras', name: 'Keras', category: 'ml-dl', categoryLabel: 'ML / Deep Learning', relatedProjects: ['nids'], prominence: 'secondary' },

  // Cybersecurity / Systems
  { id: 'nid', name: 'Network Intrusion Detection', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['nids'], prominence: 'core' },
  { id: 'fuzzing', name: 'Coverage-Guided Fuzzing', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['fuzzer'], prominence: 'core' },
  { id: 'crypto', name: 'Applied Cryptography', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['docverify'], prominence: 'core' },
  { id: 'sha256', name: 'SHA-256', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['docverify'], prominence: 'secondary' },
  { id: 'rsa-pss', name: 'RSA-PSS', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['docverify'], prominence: 'secondary' },
  { id: 'net-diag', name: 'Network Diagnostics', category: 'cybersecurity-systems', categoryLabel: 'Cybersecurity / Systems', relatedProjects: ['network-cli'], prominence: 'secondary' },

  // Tooling / Infrastructure
  { id: 'git', name: 'Git', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: [], prominence: 'core' },
  { id: 'github', name: 'GitHub', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: [], prominence: 'secondary' },
  { id: 'maven', name: 'Maven', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: ['log-analyzer'], prominence: 'secondary' },
  { id: 'vitest', name: 'Vitest', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: ['network-cli'], prominence: 'secondary' },
  { id: 'linux', name: 'Linux', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: [], prominence: 'core' },
  { id: 'nodejs', name: 'Node.js', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: ['network-cli'], prominence: 'secondary' },
  { id: 'vite', name: 'Vite', category: 'tooling-infrastructure', categoryLabel: 'Tooling / Infrastructure', relatedProjects: [], prominence: 'secondary' },
];

export const skillCategories = [
  { id: 'languages', label: 'Languages' },
  { id: 'ml-dl', label: 'ML / Deep Learning' },
  { id: 'cybersecurity-systems', label: 'Cybersecurity / Systems' },
  { id: 'tooling-infrastructure', label: 'Tooling / Infrastructure' },
];
