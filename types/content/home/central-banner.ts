import { ContentJson } from "../content";

export default class CentralBanner {
  id?: string;
  image?: string;
  upperText?: string;
  lowerText?: string;
  btnText?: string;
  btnLink?: string;
  telegram?: string;
  vk?: string;
  whatsapp?: string;
  youtube?: string;

  static fromContentJson(contentJson: ContentJson): CentralBanner {
    return {
      id: `${contentJson.id}`,
      image: contentJson.contentMetasJson?.['src'] ?? "",
      upperText: contentJson.contentMetasJson?.['upper_text'] ?? "",
      lowerText: contentJson.contentMetasJson?.['lower_text'] ?? "",
      btnText: contentJson.contentMetasJson?.['btn_text'] ?? "",
      btnLink: contentJson.contentMetasJson?.['btn_link'] ?? "",
      telegram: contentJson.contentMetasJson?.['telegram'] ?? "",
      vk: contentJson.contentMetasJson?.['vk'] ?? "",
      whatsapp: contentJson.contentMetasJson?.['whatsapp'] ?? "",
      youtube: contentJson.contentMetasJson?.['youtube'] ?? "",
    } as CentralBanner;
  }
}