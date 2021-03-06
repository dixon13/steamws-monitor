import { CHANGE_GAME_PANE, ADD_WORKSHOP_ITEM, REMOVE_WORKSHOP_ITEM } from "../actions/gameActions";
import { getConfig, changeConfig, saveWorkshopData, deleteConfig } from "../configManipulators";

const initialState = {
  gameData: null
};

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case CHANGE_GAME_PANE:
      return {
        ...state,
        gameData: getConfig(`games.${action.payload}`)
      };
    case ADD_WORKSHOP_ITEM:
      saveWorkshopData(action.payload.consumer_app_id, action.payload);
      var fileID = null;
      if (typeof action.payload.publishedfileid === "string" || action.payload.publishedfileid instanceof String) {
        fileID = parseInt(action.payload.publishedfileid);
      } else {
        fileID = action.payload.publishedfileid;
      }
      return {
        ...state,
        gameData: {
          ...state.gameData,
          workshopItems: [...state.gameData.workshopItems, fileID]
        }
      };
    case REMOVE_WORKSHOP_ITEM:
      var filteredWorkshopItems = state.gameData.workshopItems.filter(ele => ele !== action.payload);
      changeConfig(`games.${state.gameData.appid}.workshopItems`, filteredWorkshopItems);
      deleteConfig(`allWorkshopData.${action.payload}`);
      return {
        ...state,
        gameData: {
          ...state.gameData,
          workshopItems: filteredWorkshopItems
        }
      };
    default:
      return state;
  }
}