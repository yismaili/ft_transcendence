"use client";
import UserProfile from "@/components/profile/UserProfile/UserProfile";

export default function Profile({ params }: { params: { user: string } }) {
  return <UserProfile params={params} />;
}
