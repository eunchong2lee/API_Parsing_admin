import { Redirect } from "react-router-dom";

//profile
import UserProfile from "../pages/Authentication/user-profile";

//Error
import Error1 from "../pages/Error/Error1";
import Error2 from "../pages/Error/Error2";
import ErrorBasic from "../pages/Error/ErrorBasic";
import ErrorCover from "../pages/Error/ErrorCover";

//Authentication pages
import Logout from "../pages/Authentication/Logout";

// Productions
import HealthFoodData from "src/pages/HealthFoodData/HealthFoodData";
import HealthFoodDataDetail from "src/pages/HealthFoodData/HealthFoodDataDetail";
import HealthFoodDataRegister from "src/pages/HealthFoodData/HealthFoodDataRegister";
import HealthFoodDataRevise from "src/pages/HealthFoodData/HealthFoodDataRevise";

// Auth
import LoginPage from "../pages/Auth/Login";
import RegisterIndividual from "../pages/Auth/Register";

// Analytics
import Analytics from "../pages/Analytics/Analytics";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const userRoutes: Array<RouteProps> = [
  // //profile
  { path: "/profile", component: UserProfile },

  //healthfooddata
  { path: "/HealthFoodData", component: HealthFoodData },
  { path: "/HealthFoodDataRegister", component: HealthFoodDataRegister },
  { path: "/HealthFoodData/:id", component: HealthFoodDataDetail },
  { path: "/HealthFoodDataRevise/:id", component: HealthFoodDataRevise },

  // analytics
  { path: "/analytics", component: Analytics },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/drug-table" /> },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  { path: "/logout", component: Logout },

  { path: "/error-404-basic", component: Error1 },
  { path: "/error-404-cover", component: Error2 },
  { path: "/error-500-basic", component: ErrorBasic },
  { path: "/error-500-cover", component: ErrorCover },

  // auth
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterIndividual },
];

export { userRoutes, authRoutes };
