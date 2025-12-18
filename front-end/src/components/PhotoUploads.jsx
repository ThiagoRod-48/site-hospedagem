import axios from "axios";

const PhotoUploads = ({ photolink, setPhotolink, setPhotos, photos }) => {
  const uploadByLink = async (e) => {
    e.preventDefault();

    if (photolink) {
      const { data: filename } = await axios.post("/places/upload/link", {
        link: photolink,
      });

      setPhotos((prevValue) => [...prevValue, filename]);
    } else {
      alert("Não existe nenhum link a ser enviado");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="photo" className="ml-2 text-2xl font-bold">
        Fotos
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          className="grow rounded-full border border-gray-300 px-4 py-2"
          placeholder="Adione uma foto pelo link dela"
          id="photolink"
          value={photolink}
          onChange={(e) => setPhotolink(e.target.value)}
        />
        <button
          onClick={uploadByLink}
          className="cursor-pointer rounded-full border border-gray-300 bg-gray-100 px-4 py-2 transition hover:bg-gray-200"
        >
          Enviar foto
        </button>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-4">
        {photos.map((photo) => (
          <img
            className="aspect-square rounded-2xl object-cover"
            src={`${axios.defaults.baseURL}/tmp/${photo}`}
            alt="Imagens do lugar"
            key={photo}
          />
        ))}

        <label
          htmlFor="file"
          className="flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-300"
        >
          <input type="file" id="file" className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotoUploads;
