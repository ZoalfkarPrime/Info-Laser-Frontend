import { ContentJson } from "../content";

export default class Partner {
  id?: string;
  mainImg?: string;

  static fromContentJson(contentJson: ContentJson): Partner {
    return {
      id: `${contentJson.id}`,
      mainImg: contentJson.contentMetasJson?.['main-img'] ?? "",
    } as Partner;
  }
}