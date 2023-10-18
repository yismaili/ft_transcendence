export default async function getUser(cookie: string) {
  let cookieContent = JSON.parse(cookie);

  const profile = await fetch(
    `http://localhost:3001/users/profile/${cookieContent.response.user.username}`,
    {
      headers: {
        Authorization: `Bearer ${cookieContent.response.token}`,
      },
    }
  );
  let test = await profile.json();
    console.log(test);

  return test;
}
