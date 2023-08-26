'use client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>PONG</title>
        <meta name='multiplayer pong game ' content='Description' />
      </head>
      <body>{children}</body>
    </html>
  );
}
