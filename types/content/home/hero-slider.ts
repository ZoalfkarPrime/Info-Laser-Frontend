import { ContentJson } from "../content";

export default class HeroSlider {
  id?: string;
  mainImg?: string;
  subTitleAbove?: string;
  mainTitle?: string;
  subTitleBelow?: string;
  btnText?: string;
  btnLink?: string;

  static fromContentJson(contentJson: ContentJson): HeroSlider {
    return {
      id: `${contentJson.id}`,
      mainImg: contentJson.contentMetasJson?.['src'] ?? "",
      subTitleAbove: contentJson.contentMetasJson?.['upper_text'] ?? "",
      mainTitle: contentJson.contentMetasJson?.['main_text'] ?? "",
      subTitleBelow: contentJson.contentMetasJson?.['lower_text'] ?? "",
      btnText: contentJson.contentMetasJson?.['btn_text'] ?? "",
      btnLink: contentJson.contentMetasJson?.['btn_link'] ?? "",
    } as HeroSlider;
  }
}