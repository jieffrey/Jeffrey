import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import ThemeProviderContext from "@/common/stores/theme";
import Layouts from "@/common/components/layouts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Jeffrey Studios",
  description: "Frontend Developer",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviderContext>
            <Layouts>{children}</Layouts>
          </ThemeProviderContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}