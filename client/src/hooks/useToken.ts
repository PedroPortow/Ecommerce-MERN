import { useCookies } from "react-cookie";

export const useToken = () => {
  const [cookies, _] = useCookies(["access_token"]);

  console.log({cookies})

  return {
    headers: { authorization: cookies.access_token },
  };
};