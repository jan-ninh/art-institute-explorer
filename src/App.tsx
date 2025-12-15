import { Header } from "./components/Header";
import { SearchSection } from "./components/SearchSection";

export default function App() {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <Header />
      <SearchSection />
    </div>
  );
}
