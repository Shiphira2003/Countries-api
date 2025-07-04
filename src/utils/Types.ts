export interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital?: string;
  flag: string;
  tld?: string;
  currencies: string;
  languages: string;
  borders: string[];
  cca3: string;
}
