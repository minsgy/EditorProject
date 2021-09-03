const API_END_POINT = "https://kdt.roto.codes";
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "minsgy",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json(); // Promise
    }
  } catch (e) {
    alert(e.message);
  }
};
