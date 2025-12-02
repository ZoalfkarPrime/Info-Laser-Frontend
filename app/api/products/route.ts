import {NextResponse} from "next/server";
import {getProducts} from "@/api/api";

export const revalidate = 60;

export const GET = async () => {
  try {
    const data = await getProducts();

    return NextResponse.json(
      data,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Ошибка при проксировании /api/products:", error);

    return NextResponse.json(
      {
        message: "Ошибка загрузки продуктов",
      },
      {
        status: 500,
      }
    );
  }
};


