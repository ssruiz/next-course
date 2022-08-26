import { UIState } from './';

type UIType = { type: 'UIToogleMenu' };

export const uiReducer = (state: UIState, action: UIType): UIState => {
  switch (action.type) {
    case 'UIToogleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};
