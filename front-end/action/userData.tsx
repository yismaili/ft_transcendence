import { cookies } from "next/headers";

export default async function getUserData() {
  const mycookie = cookies().get("userData");
  if (!mycookie) throw new Error("User data cookie not found. ----> Plese login <----");

  const data = JSON.parse(mycookie!.value);

  const token = data?.response?.token;
  if (!token) throw new Error("Token not found in the user data.");

  const res = await fetch(
    `http://localhost:3001/users/profile/${data.response.user.username}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return res.json();
}
