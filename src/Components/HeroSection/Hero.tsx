import React from 'react';

const images = [
    { urlImage: "/img/soft/Autodesk.png", altName: "AutoCAD" },
    { urlImage: "/img/soft/Windows11Pro.png", altName: "Windows 11 Pro" },
    { urlImage: "/img/soft/Civil3D.png", altName: "Civil 3D" },
    { urlImage: "/img/soft/Internet.png", altName: "ESET Internet Security" },
    { urlImage: "/img/soft/Office2021.png", altName: "Office" },
    { urlImage: "/img/soft/McAfee.png", altName: "McAfee Total Protection" },
    { urlImage: "/img/soft/Kaspersky.png", altName: "Kaspersky Total Security" },
    { urlImage: "/img/soft/Office2019.png", altName: "Office 2019" },
    { urlImage: "/img/soft/VisioProfesional 2021.png", altName: "Visio Professional 2021" },
  ];

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-t from-[#0101a7] via-[#015AFC] to-[#fdfdfd] text-center py-16">
      <div className="absolute -top-15 left-0 w-1/4 h-full bg-no-repeat bg-left" style={{ backgroundImage: 'url(/img/Vector.svg)',opacity: 0.5 }}></div>
      <div className="absolute -top-15 right-0 w-1/4 h-full bg-no-repeat bg-right" style={{ backgroundImage: 'url(/img/Vector.svg)',opacity: 0.5 }}></div>
      <p className="text-5xl font-bold  mb-4 relative z-10 text-gradient ">Potencia tu Negocio con <br />Softwares de Calidad</p>
      <p className="text-white mb-8 relative z-10">Licencias de Office, Windows, Eset, Kaspersky, <br />Adobe y más a precios competitivos.</p>
      <button className="bg-white text-[#0101a7] font-bold py-2 px-4 rounded-full relative z-10">¡Comprar Ahora!</button>
      <div className="flex w-full mt-8 space-x-4 overflow-x-auto relative z-10">
      {
        images.map((image, index) => (
          <img key={index} src={image.urlImage} alt={image.altName} className="h-60 w-3/4" />
        ))      
      }
      </div>
    </div>
  );
};

export default Hero;