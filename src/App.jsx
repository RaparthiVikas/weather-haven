
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherDashboard from "./pages/WeatherDashboard";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <Toaster />
      <Sonner />
      <WeatherDashboard />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
