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

const Estadisticas = () => {
  const [activeTab, setActiveTab] = useState("war");

  return (
    <div className="container mx-auto my-5 px-4">
      <h2 className="text-center my-10 text-3xl font-semibold">
        📊 Estadísticas de Jugadores Venezolanos
      </h2>

      <ul className="flex border-b border-gray-300 pb-2 justify-center flex-wrap">


        <li className="mr-6">
          <button
            onClick={() => setActiveTab("war")}
            className={`py-2 px-4 block focus:outline-none ${
              activeTab === "war"
                ? "border-b-2 border-red-200 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
            }`}
          >
            WAR
          </button>
        </li>

        <li className="mr-6">
          <button
            onClick={() => setActiveTab("avg")}
            className={`py-2 px-4 block focus:outline-none ${
              activeTab === "avg"
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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
                ? "border-b-2 border-red-500 text-red-400 font-semibold"
                : "text-gray-600 hover:text-red-400"
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


      </div>
    </div>
  );
};

export default Estadisticas;
