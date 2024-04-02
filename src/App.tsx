import { Header } from "./components/header";
import { ParticipantsList } from "./components/participants-list";
import { Column } from "./components/layout/column";

export default function App() {
 return (
    <section>
       <Column className="max-w-screen-xl mx-auto px-10 py-5 gap-5">
            <Header />
            <ParticipantsList />
        </Column>
    </section>
 )
}