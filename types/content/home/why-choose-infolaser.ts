import { ContentJson } from "../content";

export default class WhyChooseInfolaser {
  id?: string;
  mainText?: string;
  grayText?: string;
  firstReasonTitle?: string;
  firstReasonDesc?: string;
  secondReasonTitle?: string;
  secondReasonDesc?: string;
  thirdReasonTitle?: string;
  thirdReasonDesc?: string;

  static fromContentJson(contentJson: ContentJson): WhyChooseInfolaser {
    return {
      id: `${contentJson.id}`,
      mainText: contentJson.contentMetasJson?.['main_text'] ?? "",
      grayText: contentJson.contentMetasJson?.['gray_text'] ?? "",
      firstReasonTitle: contentJson.contentMetasJson?.['first_reason_title'] ?? "",
      firstReasonDesc: contentJson.contentMetasJson?.['first_reason_desc'] ?? "",
      secondReasonTitle: contentJson.contentMetasJson?.['second_reason_title'] ?? "",
      secondReasonDesc: contentJson.contentMetasJson?.['second_reason_desc'] ?? "",
      thirdReasonTitle: contentJson.contentMetasJson?.['third_reason_title'] ?? "",
      thirdReasonDesc: contentJson.contentMetasJson?.['third_reason_desc'] ?? "",
    } as WhyChooseInfolaser;
  }
}
