const Itens = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMwMDY3NTc0MTgxNjE2MTA1MA%3D%3D/original/6d6a4556-8920-418b-acda-eefb2cecdf63.jpeg"
        alt="Imagem da comodação"
        className="aspect-square rounded-2xl object-cover"
      />

      <div>
        <h3 className="text-xl font-semibold">João Pessoa, Parana</h3>
        <p className="truncate text-gray-600">
          Localizado de frente para a Praia de Manaíra - um dos endereços mais
          nobres da capital paraibana, essa localização privilegiada com
          estrutura completa para receber tanto viajantes a lazer quanto
          hóspedes corporativos. A poucos passos dos melhores bares,
          restaurantes e centros de compras da cidade, a hospendagem oferece
          fácil acesso ao que João Pessoa tem de melhor, sem abrir mão da
          tranquilidade e do conforto de estar à beira-mar.
        </p>
      </div>

      <p>
        <span className="font-semibold"> R$ 550 </span> por noite
      </p>
    </a>
  );
};

export default Itens;
