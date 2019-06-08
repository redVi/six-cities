import React from 'react';
import {offer} from '@/types';
import Mark from '@/components/mark/mark';
import PlaceImage from '@/components/place-image/place-image';
import PlaceInfo from '@/components/place-info/place-info';

interface Props {
  offer: offer,
  handleImageClick: () => void,
  current?: number,
  className?: string
}

const PlacesListItem = (props) => {
  const className = props.className || 'cities__place-card';
  const {offer, current, handleImageClick}: Props = props;
  const mark = offer.isPremium ? <Mark/> : null;
  const activeClass = current >= 0 ? `${className}--active` : ``;

  return (
    <article className={`${className} ${activeClass} place-card`}>
      {mark}
      <PlaceImage previewImage={offer.previewImage} handleClick={() => handleImageClick()} />
      <PlaceInfo {...offer} />
    </article>
  );
};

export default PlacesListItem;
