import DashboardGrid from "./components/DashboardGrid";
import DashboardHeader from "./components/DashboardHeader";

export default function Dashboard() {
    return (
        <section className="space-y-8">
            <DashboardHeader />

            <DashboardGrid />
        </section>
    );
}