import { ContentJson } from "../content";

export default class Promo {
  id?: string;
  titleAbove?: string;
  mainTitle?: string;
  details?: string;
  btnText?: string;
  src?: string;

  static fromContentJson(contentJson: ContentJson): Promo {
    return {
      id: `${contentJson.id}`,
      titleAbove: contentJson.contentMetasJson?.['upper_text'] ?? "",
      mainTitle: contentJson.contentMetasJson?.['main_text'] ?? "",
      details: contentJson.contentMetasJson?.['lower_text'] ?? "",
      btnText: contentJson.contentMetasJson?.['btn_text'] ?? "",
      src: contentJson.contentMetasJson?.['src'] ?? "",
    } as Promo;
  }
}