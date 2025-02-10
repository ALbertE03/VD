
'use client';
import Header from "@/app/componets/header";
import SubHeader from "../componets/subHeader";
import dynamic from 'next/dynamic';
import SecondaryCharts from "./secu";

export default function Home() {
    return (
        <div className="c- #CCC5B7">
            <Header />
            <h1 className="flex justify-center items-center text-4xl text-[#3E3C3C] py-10 bg-[#CCC5B7] uppercase font-bold ">
                Artemisa
            </h1>
            <SubHeader actual={'/art/secundaria'} />
            <SecondaryCharts />

        </div>
    );
}
