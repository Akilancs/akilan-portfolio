// Maps skill IDs and contact link types to their icon SVG imports
import pythonIcon from '../assets/icons/python.svg';
import javaIcon from '../assets/icons/java.svg';
import cIcon from '../assets/icons/c.svg';
import cppIcon from '../assets/icons/cplusplus.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import html5Icon from '../assets/icons/html5.svg';
import cssIcon from '../assets/icons/css.svg';
import tensorflowIcon from '../assets/icons/tensorflow.svg';
import kerasIcon from '../assets/icons/keras.svg';
import gitIcon from '../assets/icons/git.svg';
import githubIcon from '../assets/icons/github.svg';
import mavenIcon from '../assets/icons/apachemaven.svg';
import vitestIcon from '../assets/icons/vitest.svg';
import linuxIcon from '../assets/icons/linux.svg';
import nodejsIcon from '../assets/icons/nodedotjs.svg';
import viteIcon from '../assets/icons/vite.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import gmailIcon from '../assets/icons/gmail.svg';

export const skillIconMap: Record<string, string> = {
  python: pythonIcon,
  java: javaIcon,
  c: cIcon,
  cpp: cppIcon,
  typescript: typescriptIcon,
  html: html5Icon,
  css: cssIcon,
  tensorflow: tensorflowIcon,
  keras: kerasIcon,
  git: gitIcon,
  github: githubIcon,
  maven: mavenIcon,
  vitest: vitestIcon,
  linux: linuxIcon,
  nodejs: nodejsIcon,
  vite: viteIcon,
};

export const contactIconMap: Record<string, string> = {
  email: gmailIcon,
  gmail: gmailIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
};
