import { useState } from "react";
import TopWar from "./Estadisticas/TopWar";
import TopHr from "./Estadisticas/TopHr";
import TopAvg from "./Estadisticas/TopAvg";
import TopDobles from "./Estadisticas/TopDobles";
import TopTriples from "./Estadisticas/TopTriples";
import TopOps from "./Estadisticas/TopOps";
import TopRc from "./Estadisticas/TopRc";
import TopIso from "./Estadisticas/TopIso";
import TopBb from "./Estadisticas/TopBB";
import Topk from "./Estadisticas/Topk";
import TopEbh from "./Estadisticas/TopEbh";
import TopSb from "./Estadisticas/TopSb";
import TopTb from "./Estadisticas/TopTb";
import TopAllStar from "./Estadisticas/TopAllStar";
import Top1b from "./Estadisticas/Top1b";

const Estadisticas = () => {
  const [activeTab, setActiveTab] = useState("war");

  return (
    <div className="bg-[var(--body)] min-h-screen">
      <div className="container mx-auto my-5 px-4 bg-[var(--body)]">
        <h2 className="text-center my-10 text-3xl font-semibold">
          📊 Estadísticas de Jugadores Venezolanos
        </h2>

        <ul className="flex border-b border-[var(--dorado)] pb-2 justify-center flex-wrap">


          <li className="mr-6">
            <button
              onClick={() => setActiveTab("war")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "war"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              WAR
            </button>
          </li>

          <li className="mr-6">
            <button
              onClick={() => setActiveTab("Hits")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "Hits"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              HITS
            </button>
          </li>

          <li className="mr-6">
            <button
              onClick={() => setActiveTab("avg")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "avg"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              AVG
            </button>
          </li>

          <li className="mr-6">
            <button
              onClick={() => setActiveTab("hr")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "hr"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              HR
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("Dobles")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "Dobles"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              Dobles
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("Triples")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "Triples"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              Triples
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("OPS")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "OPS"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              OPS
            </button>
          </li>
          
          <li>
            <button
              onClick={() => setActiveTab("RC")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "RC"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              RC
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("ISO")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "ISO"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              ISO
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("BB")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "BB"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              BB
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("porcentajestrike")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "porcentajestrike"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              strike%
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("ebh")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "ebh"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              Ebh
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("sb")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "sb"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              Sb
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("tb")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "tb"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              Tb
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("allstar")}
              className={`py-2 px-4 block focus:outline-none ${
                activeTab === "allstar"
                  ? "border-b-2  border-[var(--dorado)] text-[var(--dorado)] font-semibold"
                  : "text-gray-400 hover:text-[var(--dorado)]"
              }`}
            >
              All Star
            </button>
          </li>


        </ul>

        <div className="mt-4">

          {activeTab === "war" && <TopWar />}
          {activeTab === "avg" && <TopAvg />}
          {activeTab === "hr" && <TopHr />}
          {activeTab === "Dobles" && <TopDobles />}
          {activeTab === "Triples" && <TopTriples />}
          {activeTab === "OPS" && <TopOps />}
          {activeTab === "RC" && <TopRc />}
          {activeTab === "ISO" && <TopIso />}
          {activeTab === "BB" && <TopBb />}
          {activeTab === "porcentajestrike" && <Topk/>}
          {activeTab === "ebh" && <TopEbh/>}
          {activeTab === "sb" && <TopSb/>}
          {activeTab === "tb" && <TopTb/>}
          {activeTab === "allstar" && <TopAllStar/>}
          {activeTab === "Hits" && <Top1b/>}

        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
