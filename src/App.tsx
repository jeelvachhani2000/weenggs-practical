import { Suspense, lazy } from "react";
import Spinner from "./components/ui/Spinner";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Dashboard />
    </Suspense>
  );
};

export default App;
