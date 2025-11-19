import Itens from "../components/Itens";

const Home = () => {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 p-8">
        <Itens />
        <Itens />
        <Itens />
        <Itens />
        <Itens />
        <Itens />
        <Itens />
        <Itens />
      </div>
    </section>
  );
};

export default Home;
