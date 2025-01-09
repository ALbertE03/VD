import Inputs from "./componets/inputs";
import Header from "./componets/header";


export default function Home() {

  return <div>
    <Header />
    <div className="container mx-auto p-4 h-screen flex flex-col lg:flex-row">
      <Inputs />
    </div>

  </div>

};
