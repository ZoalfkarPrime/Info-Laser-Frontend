export default class Partner {
  id?: string;
  name?: string;
  slug?: string
  filemanager?: {
    url: string;
  };
}

export class PartnerVM {
  id?: number;
  name?: string;
  slug?: string
  filemanager?: {
    url: string;
  };

  constructor(data: PartnerVM) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.filemanager = data.filemanager;
  }

  toPartner(): Partner {
    return {
      id: String(this.id),
      name: this.name ?? "",
      slug: this.slug ?? "",
      filemanager: this.filemanager
    };
  }
}