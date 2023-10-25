"use client";
import { usePathname } from "next/navigation";
import SocketContextProvider from "@/contexts/socket-context";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [test, setTest] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setTest(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>PONG</title>
        <meta name="multiplayer pong game " content="Description" />
        <meta
          name="cross-origin-opener-policy"
          content="same-origin-allow-popups"
        ></meta>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        {/* <meta content='IE=Edge;chrome=35+' https-equiv='X-UA-Compatible'/> */}
      </head>
      <body>
        {test && (
          <div>
            {pathname != "/" &&
            pathname != "/login" &&
            pathname != "/login/2FA" ? (
              <SocketContextProvider>{children}</SocketContextProvider>
            ) : (
              children
            )}
          </div>
        )}
      </body>
    </html>
  );
}
