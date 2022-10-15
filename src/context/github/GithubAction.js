const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async (text) => {
  // setLoading();
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.json();

  // dispatch({
  //   type: "GET_USERS",
  //   payload: items,
  // });

  return items;
};

export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token${GITHUB_TOKEN}`,
    },
  });
  if (response.status === 404) {
    window.location = "./notfound";
  } else {
    const data = await response.json();

    return data;
  }
};

export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(
    `${GITHUB_URL}/users/${login}/repos/${login}/repos?${params}`,
    {
      headers: {
        Authorization: `token${GITHUB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  //from postman
  // setUsers(data);
  // setLoading(false);
  return data;
};
