import {getTranslations} from "next-intl/server";
import CartPage from "@/components/shared/cart/CartPage";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('cartMetaTitle')}`,
    description: `${t('cartMetaDescription')}`,
  };
}

export default function CartPageWrapper() {
  return <CartPage/>;
}
