import { NotUndefined } from 'object-hash';

export type Generator = {
  (): string;
};

export type Hasher = {
  (input: NotUndefined): string;
}

export type Helper = {
  extract: (input: NotUndefined) => string | undefined;
  isValid: (input: string) => boolean;
  inspect: (input: string) => Info;
  format: (input: string, style?: string) => string;
  minify: (input: string) => string;
};

export type Info = Record<string, unknown> & {
  input: NotUndefined,
  isValid: boolean,
  formatted?: string,
  minified?: string,
}
