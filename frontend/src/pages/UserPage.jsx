import { useContext } from "react"
import { UserContextData } from "../context/UserContext";

export const UserPage = () => {
  const { user } = useContext(UserContextData);
  console.log(user);

  return (
    <div>
      <h1>User Page</h1>
    </div>
  )
}
