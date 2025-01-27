// App.js
import './App.css';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfilePage from './pages/Profile';
import QuestsList from './pages/QuestsList';
import QuestTasks from './pages/QuestTasks';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#6F3FF5',
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Navbar />
            <div className="App">
              <Routes>
                <Route path="/" element={<div>Welcome to the Main Page</div>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/quests" element={<QuestsList  />} />
                <Route path="/quest/:title" element={<QuestTasks />} />
              </Routes>
            </div>
          </Router>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}