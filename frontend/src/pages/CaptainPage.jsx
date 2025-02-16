import { useContext } from "react"
import { CaptainContextData } from "../context/CaptainContext";

export const CaptainPage = () => {
  const { captain } = useContext(CaptainContextData);
  console.log(captain);

  return (
    <div>CaptainPage</div>
  )
}
