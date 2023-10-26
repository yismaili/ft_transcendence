"use client";
import UserProfile from "@/components/profile/UserProfile/UserProfile";
import SocketContextProvider from "@/contexts/socket-context";

export default function Profile({ params }: { params: { user: string } }) {
  throw Error();
  return (
    <SocketContextProvider>
      <UserProfile params={params} />
    </SocketContextProvider>
  );
}
