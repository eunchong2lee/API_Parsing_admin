import { combineReducers } from "redux";

import contactsReducer from "./Contacts/reducer";

import layoutReducer from "./Layout/reducer";

// Calendar
import calendarReducer from "./Calendar/reducer";

//Chat
import chatReducer from "./Chat/reducer";

// //Invoices
import invoicesReducer from "./Invoices/reducer";

//register
import registerReducer from "./Auth/Register/reducer";

//login
import loginReducer from "./Auth/Login/reducer";

//project
import projectsReducer from "./Projects/reducer";

// // User Profile
import profileReducer from "./Auth/Profile/reducer";

// //kanban
import kanbanboardsReducer from "./Kanbanboards/reducer";

// // Forget Password
import forgetPasswordReducer from "./Auth/Forgetpwd/reducer";

import itemReducer from "./HealthFoodData/HealthFoodData";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  Layout: layoutReducer,
  calendar: calendarReducer,
  chat: chatReducer,
  invoices: invoicesReducer,
  register: registerReducer,
  login: loginReducer,
  forgetPassword: forgetPasswordReducer,
  projects: projectsReducer,
  profile: profileReducer,
  kanbanboards: kanbanboardsReducer,
  itemdata: itemReducer,
});

export interface itemReducerType {}

export default rootReducer;
