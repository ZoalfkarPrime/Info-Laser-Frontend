import { ContentJson } from "../content";

export default class OfflineOrOnline {
  id?: string;
  title?: string;
  subtitle?: string;
  btnText?: string;
  btnLink?: string;

  static fromContentJson(contentJson: ContentJson): OfflineOrOnline {
    return {
      id: `${contentJson.id}`,
      title: contentJson.contentMetasJson?.['title'] ?? "",
      subtitle: contentJson.contentMetasJson?.['subtitle'] ?? "",
      btnText: contentJson.contentMetasJson?.['btn-text'] ?? "",
      btnLink: contentJson.contentMetasJson?.['btn-link'] ?? "",
    } as OfflineOrOnline;
  }
}