import { FileManager } from "../types";

export class Article {
  id!: number;
  categoryId!: number;
  title!: string;
  image!: string | null;
  slug!: string;
  content!: ArticleContentItem[];
  publishedAt!: string;
  isActive!: boolean;
  createdAt!: string;
  updatedAt!: string;

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.id = d.id;
    this.categoryId = d.category_id;
    this.title = d.title;
    this.image = d.image;
    this.slug = d.slug;
    this.content = (d.content || []).map((item: unknown) => new ArticleContentItem(item as Record<string, unknown>));
    this.publishedAt = d.published_at;
    this.isActive = d.is_active === 1;
    this.createdAt = d.created_at;
    this.updatedAt = d.updated_at;
  }

  static fromJson(json: unknown): Article {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const j = json as any;
    const attachment = j.data?.ProductAttachment || j.ProductAttachment || j;
    return new Article(attachment);
  }
}

export class ArticleContentItem {
  uuid: string;
  type: string;
  order: number;
  data: ArticleContentData;

  constructor(item: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const i = item as any;
    this.uuid = i.uuid;
    this.type = i.type;
    this.order = i.order;
    this.data = this.parseData(i.type, i.data);
  }

  private parseData(type: string, data: unknown): ArticleContentData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    switch (type) {
      case "text-with-list":
        return new ArticleTextWithListData(d);
      case "editor":
        return new ArticleEditorData(d);
      case "product":
        return new ArticleProductData(d);
      case "title-image-body":
        return new ArticleTitleImageBodyData(d);
      case "title-with-list":
        return new ArticleTitleWithListData(d);
      case "image":
        return new ArticleImageData(d);
      case "table":
        return new ArticleTableData(d);
      case "editor-with-background":
        return new ArticleEditorWithBackgroundData(d);
      default:
        return d as ArticleContentData;
    }
  }
}

export type ArticleContentData =
  | ArticleTextWithListData
  | ArticleEditorData
  | ArticleProductData
  | ArticleTitleImageBodyData
  | ArticleTitleWithListData
  | ArticleImageData
  | ArticleTableData
  | ArticleEditorWithBackgroundData;

export class ArticleTextWithListData {
  tag: string;
  text: string;
  list: { uuid: string; text: string }[];

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.tag = String(d.tag);
    this.text = d.text;
    this.list = d.list || [];
  }
}

export class ArticleEditorData {
  tag: boolean;
  text: string;
  border: { width: number; color: string };

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.tag = !!d.tag;
    this.text = d.text;
    this.border = d.border || { width: 0, color: "#000" };
  }
}

export class ArticleProductData {
  file: FileManager;
  badge: string;
  title: string;
  slug: string;
  price1Label: string;
  price1: string;
  price2Label: string;
  price2: string;
  buttonText: string;
  buttonLink: string;
  rating: string;
  guarantee: string;

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.file = d.file;
    this.badge = d.badge;
    this.title = d.title;
    this.slug = d.slug;
    this.price1Label = d.price1Label;
    this.price1 = d.price1;
    this.price2Label = d.price2Label;
    this.price2 = d.price2;
    this.buttonText = d.buttonText;
    this.buttonLink = d.buttonLink;
    this.rating = d.rating;
    this.guarantee = d.guarantee;
  }
}

export class ArticleTitleImageBodyData {
  tag: string;
  title: string;
  body: string;
  file: FileManager;

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.tag = String(d.tag);
    this.title = d.title;
    this.body = d.body;
    this.file = d.file;
  }
}

export class ArticleTitleWithListData {
  tag: string;
  title: string;
  body: string;
  listStyle: "checkmark" | "numbered";
  items: { uuid: string; text: string }[];

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.tag = String(d.tag);
    this.title = d.title;
    this.body = d.body;
    this.listStyle = d.listStyle;
    this.items = d.items || [];
  }
}

export class ArticleImageData {
  file: FileManager;

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.file = d.file;
  }
}

export class ArticleTableData {
  columns: { uuid: string; header: string }[];
  rows: { uuid: string; cells: Record<string, string | null> }[];

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.columns = d.columns || [];
    this.rows = d.rows || [];
  }
}

export class ArticleEditorWithBackgroundData {
  text: string;

  constructor(data: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = data as any;
    this.text = d.text;
  }
}
