
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherDashboard from "./pages/WeatherDashboard";
import "./index.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WeatherDashboard />
  </QueryClientProvider>
);

export default App;
