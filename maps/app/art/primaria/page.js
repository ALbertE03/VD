'use client';
import Header from "@/app/componets/header";
import SubHeader from "@/app/componets/subHeader";
import dynamic from 'next/dynamic';

const PrimaryCharts = dynamic(() => import('./pri'), {
    ssr: false,
});
export default function Home() {
    return (
        <div>
            <Header />
            <h1 className="flex justify-center items-center text-4xl text-[#3E3C3C] py-10 bg-[#CCC5B7] uppercase font-bold ">
                Artemisa
            </h1>
            <SubHeader actual={'primaria'} />
            <PrimaryCharts />

        </div>
    );
}
