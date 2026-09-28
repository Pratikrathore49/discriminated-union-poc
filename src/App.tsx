import { useState } from "react";
import PageHeader from "./components/PageHeader";
import StateTabs from "./components/StateTabs";
import UserCard from "./components/UserCard";
import StateInspector from "./components/StateInspector";
import userStates from "./data/userStates";

export default function App() {
  const [active, setActive] = useState("loading");
  const currentState = userStates[active];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center py-12 px-4">
      <PageHeader />
      <StateTabs active={active} onChange={setActive} />
      <main className="w-full max-w-md">
        <UserCard state={currentState} />
      </main>
      <StateInspector state={currentState} />
    </div>
  );
}
