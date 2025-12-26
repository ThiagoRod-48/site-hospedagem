import axios from "axios";
import { useEffect, useState } from "react";
import Itens from "../components/Itens";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axioGet = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };

    axioGet();
  }, []);
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 p-8">
        {places.map((place) => (
          <Itens {...{ place }} key={place._id} />
        ))}

        {places.map((place) => (
          <Itens {...{ place }} key={place._id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
