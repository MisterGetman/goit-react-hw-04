const ImageCard = ({ image, openModal }) => {
  return (
    <li>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image.urls.regular, image.alt_description)}
      />
    </li>
  );
};

export default ImageCard;
