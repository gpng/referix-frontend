// local imports
import { RESIZED } from 'actions/types';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

/**
 * Tracks change from mobile <> desktop width for responsive design
 */
export const deviceWidthUpdated = () => (dispatch, getState) => {
  let isMobile = false;
  if (window.innerWidth < breakpoints.sm) {
    isMobile = true;
  }
  if (getState().responsive.isMobile !== isMobile) {
    dispatch({ type: RESIZED, isMobile });
  }
};
