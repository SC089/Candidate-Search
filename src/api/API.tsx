const searchGithub = async () => {
  try {
    console.log('Token from .env:', import.meta.env.VITE_GITHUB_TOKEN);
    const start = Math.floor(Math.random() * 100000000) + 1;
    console.log('Authorization Header:', `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`);
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
          // Authorization: `Bearer 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`,
        },
      }
    );
    // console.log('Response:', response);
    const data = await response.json();
    console.log('Detailed User Data:', data);
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // console.log('Data:', data);
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        // Authorization: `Bearer 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`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
