import './App.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from './components/Navbar';
import ProfilePage from './pages/Profile';
import QuestsList from './pages/QuestsList';
import QuestTasks from './pages/QuestTasks';
import Home from './pages/Home';
import { CHAIN } from './onchain/constants';

const wagmiConfig = getDefaultConfig({
  appName: 'NadQuests',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [CHAIN],
  ssr: false,
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme({
        accentColor: 'rgba(131, 110, 249, 1)',
      })}>
          <Router>
            <Navbar />
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/quests" element={<QuestsList />} />
                <Route path="/quest/:title" element={<QuestTasks />} />
              </Routes>
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
