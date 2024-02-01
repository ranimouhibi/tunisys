
import Feries from "./components/Feries";
import Prochaineabsences from "./components/prochaineabsences";
import Event from "./components/event";
import MiniCalendar from "components/calendar/MiniCalendar";
import Solde from "./components/Solde";

const Dashboard = () => {
  return (
    <div>

      <div className="mt-5 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-3">

        <Solde />
        <Prochaineabsences />        <Event/>

      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-3">
        <Feries />
        <MiniCalendar />

      </div>

    </div>
  );
};

export default Dashboard;
