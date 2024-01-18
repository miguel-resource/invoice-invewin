"use client";

import Header from "@/components/common/Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <head>
          <title>Administrator</title>
          <link
            href="./../../../public/admin/css/app.min.css"
            rel="stylesheet"
          />
          <link
            href="./../../../public/admin/css/vendor.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </Provider>
  );
}
