"use client";

import Header from "@/components/common/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Head from "next/head";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <Head>
          <title>Administrator</title>
        </Head>
        <body>
          <div className="h-screen bg-slate-100">
            <Header />
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
