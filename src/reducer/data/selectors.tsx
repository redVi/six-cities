import {createSelector} from 'reselect';
import {offerType} from '@/types';
import NameSpace from '@/reducer/namespaces';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state: object) => state[NAME_SPACE].offers;
export const getCity = (state: object) => state[NAME_SPACE].city;
export const getComments = (state: object) => state[NAME_SPACE].comments;

export const getOfferById = (state: object, id: string) =>
  state[NAME_SPACE].offers.filter((it) => it.id === parseInt(id))[0];

export const getSimilarOffers = (state: object, id: string) => {
  const offer = getOfferById(state, id);

  return getOffers(state)
    .filter((it) => it.city.name === offer.city.name)
    .filter((it) => it.id !== parseInt(id));
};

export const getCityOffers = createSelector(
    [getOffers, getCity],
    (offers, city) => offers.filter((o: offerType) => o.city.name === city.name)
);

export const getCities = createSelector(
    [getOffers],
    (offers) => Array.from(new Set(offers.map((o) => o.city.name))).slice(0, 6),
);

export const getFavorites = createSelector(
  [getOffers],
  (offers) => offers.filter((o: offerType) => o.isFavorite)
);
