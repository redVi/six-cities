import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import Favorites from "@/api/favorites";
import { checkAuthorization } from "@/reducer/user/selectors";
import { dataActionCreator } from "@/reducer/data/data";

interface Props {
  id: number;
  isFavorite: boolean;
  isLoggedIn: boolean;
  history: any[];
  changeFavorite: (id: number, flag: number) => void;
}

function withFavoriteAction (WrappedComponent) {
  return function withProps(props: Props) {
    const { id, changeFavorite, isFavorite, isLoggedIn } = props;
    const handleFavoriteClick = () => !isLoggedIn ? props.history.push("/login") : changeFavorite(id, isFavorite ? 0 : 1);

    return (
      <WrappedComponent
        {...props}
        onClick={handleFavoriteClick} />
    );
  };
}

const mapStateToProps = (state: object) => ({
  isLoggedIn: checkAuthorization(state)
});

const mapDispatchToProps = (dispatch: Function) => ({
  changeFavorite: (id: number, flag: number) => {
    Favorites.post(id, flag).then((response) => {
      dispatch(dataActionCreator.updateOffer(response.data))
    });
  }
});

const composedComponentWrapper: any = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withFavoriteAction
);

export { withFavoriteAction }
export default composedComponentWrapper
