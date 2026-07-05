import DashboardGrid from "./components/layout/DashboardGrid";
import DashboardHeader from "./components/layout/DashboardHeader";

export default function Dashboard() {
    return (
        <section className="space-y-8">
            <DashboardHeader />

            <DashboardGrid />
        </section>
    );
}