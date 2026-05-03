import {getTranslations} from "next-intl/server";
import CartPage from "@/components/shared/cart/CartPage";
import { OfflineOrOnlineMain } from "@/components/shared/banners/OfflineOrOnlineMain";
import { BASKET_PAGE_CONTENT } from "@/lib/variables";
import { cn } from "@/lib/utils";

export async function generateMetadata({params: paramsPromise}: { params: Promise<{ locale: string }> }) {
  const {locale} = await paramsPromise;
  const t = await getTranslations({locale});

  return {
    title: `${t('cartMetaTitle')}`,
    description: `${t('cartMetaDescription')}`,
  };
}

export default function CartPageWrapper() {
  return (
    <CartPage
      banner={
        <OfflineOrOnlineMain
          title={BASKET_PAGE_CONTENT.bannerTitle}
          className={cn(
            "[&>div>div]:py-5 [&>div]:px-0 [&>div>div>div]:max-w-[400px]",
            "max-xl:hidden"
          )}
        />
      }
    />
  );
}
