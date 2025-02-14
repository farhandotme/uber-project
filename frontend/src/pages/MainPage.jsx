import { useContext } from "react"
import { UserContextData } from "../context/UserContext";

export const MainPage = () => {
  const { user } = useContext(UserContextData);
  console.log(user);

  return (
    <div>
      <h1>Main Page</h1>
    </div>
  )
}
