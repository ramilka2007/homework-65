export interface PageContent {
  title: string;
  content: string;
}

export interface EditPage extends PageContent {
  page: string;
}
