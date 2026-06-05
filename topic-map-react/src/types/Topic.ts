export type Topic = {
  id: string;
  title: string;
  summary?: string;
  specRef?: string;
  url?: string;
  dependsOn: string[];
};
