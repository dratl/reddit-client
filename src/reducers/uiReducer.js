// src/reducers/uiReducer.js
const initialState = {
    theme: 'light',
    sidebarOpen: true,
    currentView: 'home',
  };
  
  const uiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
      case 'TOGGLE_SIDEBAR':
        return {
          ...state,
          sidebarOpen: !state.sidebarOpen,
        };
      case 'SET_VIEW':
        return {
          ...state,
          currentView: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default uiReducer;