export default async function getUser(cookie: string) {
  let cookieContent = JSON.parse(cookie);
  const profile = await fetch(
    `http://back_end:3001/users/profile/${cookieContent.response.user.username}`,
    {
      headers: {
        Authorization: `Bearer ${cookieContent.response.token}`,
      },
    }
  );

  return profile.json();
}
