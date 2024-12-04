import React, {ReactNode} from "react";
import {getActiveLanguage, getDefaultDictionary, getPreferredDictionary} from "@/dictionaries";
import Providers from "@/app/providers";

export default async function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    const dict = await getPreferredDictionary();
    const defaultDict = await getDefaultDictionary();
    const activeLanguage = getActiveLanguage();

    return (
        <html lang="en">
        <body>
        <Providers dict={dict} defaultDict={defaultDict} activeLanguage={activeLanguage}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
