import { ContentJson } from "../content";

export default class SocialMedia {
  id?: string;
  whatsapp?: string;
  telegram?: string;
  vk?: string;
  youtube?: string;

  static fromContentJson(contentJson: ContentJson): SocialMedia {
    return {
      id: `${contentJson.id}`,
      whatsapp: contentJson.contentMetasJson?.['whatsapp'] ?? "",
      telegram: contentJson.contentMetasJson?.['telegram'] ?? "",
      vk: contentJson.contentMetasJson?.['vk'] ?? "",
      youtube: contentJson.contentMetasJson?.['youtube'] ?? "",
    } as SocialMedia;
  }
}