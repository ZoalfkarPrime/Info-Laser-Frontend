import { ContentJson } from "../content";

export default class Promo {
  id?: string;
  titleAbove?: string;
  mainTitle?: string;
  details?: string;
  btnText?: string;
  videoUrl?: string;

  static fromContentJson(contentJson: ContentJson): Promo {
    return {
      id: `${contentJson.id}`,
      titleAbove: contentJson.contentMetasJson?.['title-above'] ?? "",
      mainTitle: contentJson.contentMetasJson?.['main-title'] ?? "",
      details: contentJson.contentMetasJson?.['details'] ?? "",
      btnText: contentJson.contentMetasJson?.['btn-text'] ?? "",
      videoUrl: contentJson.contentMetasJson?.['video-url'] ?? "",
    } as Promo;
  }
}