import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Perks from "./Perks";
import PhotoUploads from "./PhotoUploads";

const NewPlaces = () => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [photolink, setPhotolink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // photos.length > 0 &&
    if (
      title &&
      city &&
      description &&
      price &&
      checkin &&
      checkout &&
      guests
    ) {
      try {
        const newPlaces = await axios.post("places", {
          owner: user._id,
          title,
          city,
          photos,
          description,
          extras,
          perks,
          price,
          checkin,
          checkout,
          guests,
        });

        console.log(newPlaces);

        setRedirect(true);
      } catch (error) {
        console.error(JSON.stringify(error));
        alert("Deu erro ao criar um novo lugar");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  if (redirect) return <Navigate to="/account/places" />;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-9">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          Título
        </label>
        <input
          type="text"
          className="rounded-full border border-gray-300 px-4 py-2"
          placeholder="Digite o título do seu anúncio"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="ml-2 text-2xl font-bold">
          Cidade e País
        </label>
        <input
          type="text"
          className="rounded-full border border-gray-300 px-4 py-2"
          placeholder="Digite a cidade e pais do seu anúncio"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <PhotoUploads {...{ photolink, setPhotolink, setPhotos, photos }} />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>

        <textarea
          type="textarea"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          placeholder="Digite a descrição do seu anúncio"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>

        <Perks {...{ perks, setPerks }} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          Informações Extras
        </label>

        <textarea
          type="textarea"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          placeholder="Digite a descrição do seu anúncio"
          id="extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restrições e Preço</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-24">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>
            <input
              type="number"
              className="rounded-full border border-gray-300 px-4 py-2"
              placeholder="500"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkin">
              Checkin
            </label>
            <input
              type="text"
              className="rounded-full border border-gray-300 px-4 py-2"
              placeholder="16:00"
              id="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkout">
              Checkout
            </label>
            <input
              type="text"
              className="rounded-full border border-gray-300 px-4 py-2"
              placeholder="12:00"
              id="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="guests">
              N° de Covidados
            </label>
            <input
              type="number"
              className="rounded-full border border-gray-300 px-4 py-2"
              placeholder="4"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className="hover:bg-primary-500 bg-primary-400 min-w-40 cursor-pointer rounded-full px-4 py-2 text-white">
        Salvar Informações
      </button>
    </form>
  );
};

export default NewPlaces;
