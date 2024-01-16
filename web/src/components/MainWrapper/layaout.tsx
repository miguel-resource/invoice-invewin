import Head from "next/head";
import Header from "@/components/common/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Administrator</title>
        <link href="./../../../public/admin/css/app.min.css" rel="stylesheet" />
        <link
          href="./../../../public/admin/css/vendor.min.css"
          rel="stylesheet"
        /> 
      </head>
      <body>
        <Header />
        {children}</body>
    </html>
  );
}
