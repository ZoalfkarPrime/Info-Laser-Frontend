import {Container} from "@/components/shared/Container";
import {getTranslations} from "next-intl/server";
import {ContactsInfo} from "@/components/shared/contacts/ContactsInfo";
import {SocialAndOnlineMini} from "@/components/shared/banners/SocialAndOnlineMini";
import React from "react";
import {Metadata} from "next";
import {cn} from "@/lib/utils";

export async function generateMetadata(
  {params}: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return {
    title: t('contactsMetaTitle'),
    description: t('contactsMetaDescription'),
  };
}

const ContactsPage = async ({params}: { params: Promise<{ locale: string }> }) => {

  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <>
      <section>
        <Container className="py-3">
          <h1
            className={cn(
              "text-5xl font-semibold mb-15",
              "max-xl:text-4xl max-xl:mb-7",
              "max-md:text-3xl max-md:mb-5",
            )}
          >
            Контакты InfoLaser
          </h1>
          <ContactsInfo t={t}/>
        </Container>
        <SocialAndOnlineMini className={"mb-15 max-xl:mb-10 max-md:mb-7"}/>
      </section>
    </>
  );
};

export default ContactsPage;
