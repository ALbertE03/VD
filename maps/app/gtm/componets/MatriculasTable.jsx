import {
    AcademicCapIcon, // Para Primaria
    BookOpenIcon,    // Para Secundaria básica
    LightBulbIcon,   // Para Preuniversitario
    WrenchIcon,      // Para Técnica y profesional
    CogIcon,         // Para Técnico medio
    UserIcon,        // Para Obrero calificado
    BuildingLibraryIcon, // Para Superior
} from '@heroicons/react/24/outline';

const MatriculasTable = () => {
    const matriculasData = [
        {
            concepto: "Primaria",
            "2014-2015": 847,
            "2015-2016": 833,
            "2016-2017": 812,
            "2017-2018": 821,
            "2018-2019": 828,
            "2019-2020": 839,
        },
        {
            concepto: "Secundaria básica",
            "2014-2015": 405,
            "2015-2016": 408,
            "2016-2017": 364,
            "2017-2018": 349,
            "2018-2019": 327,
            "2019-2020": 312,
        },
        {
            concepto: "Preuniversitario",
            "2014-2015": 148,
            "2015-2016": 156,
            "2016-2017": 152,
            "2017-2018": 152,
            "2018-2019": 154,
            "2019-2020": 146,
        },
        {
            concepto: "Técnica y profesional",
            "2014-2015": 171,
            "2015-2016": 165,
            "2016-2017": 169,
            "2017-2018": 158,
            "2018-2019": 153,
            "2019-2020": 162,
        },
        {
            concepto: "Técnico medio",
            "2014-2015": 162,
            "2015-2016": 152,
            "2016-2017": 151,
            "2017-2018": 139,
            "2018-2019": 135,
            "2019-2020": 137,
        },
        {
            concepto: "Obrero calificado",
            "2014-2015": 4,
            "2015-2016": 4,
            "2016-2017": 5,
            "2017-2018": 4,
            "2018-2019": 4,
            "2019-2020": 4,
        },
        {
            concepto: "Superior",
            "2014-2015": 164,
            "2015-2016": 336,
            "2016-2017": 260,
            "2017-2018": 259,
            "2018-2019": 283,
            "2019-2020": 319,
        },
    ];

    // Mapeo de conceptos a iconos
    const conceptIcons = {
        Primaria: <AcademicCapIcon className="w-5 h-5 inline-block mr-2" />,
        "Secundaria básica": <BookOpenIcon className="w-5 h-5 inline-block mr-2" />,
        Preuniversitario: <LightBulbIcon className="w-5 h-5 inline-block mr-2" />,
        "Técnica y profesional": <WrenchIcon className="w-5 h-5 inline-block mr-2" />,
        "Técnico medio": <CogIcon className="w-5 h-5 inline-block mr-2" />,
        "Obrero calificado": <UserIcon className="w-5 h-5 inline-block mr-2" />,
        Superior: <BuildingLibraryIcon className="w-5 h-5 inline-block mr-2" />,
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">Conceptos</th>
                        <th className="py-2 px-4 border-b">2014-2015</th>
                        <th className="py-2 px-4 border-b">2015-2016</th>
                        <th className="py-2 px-4 border-b">2016-2017</th>
                        <th className="py-2 px-4 border-b">2017-2018</th>
                        <th className="py-2 px-4 border-b">2018-2019</th>
                        <th className="py-2 px-4 border-b">2019-2020</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculasData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">
                                {conceptIcons[row.concepto]}
                                {row.concepto}
                            </td>
                            <td className="py-2 px-4 border-b text-center">{row["2014-2015"]}</td>
                            <td className="py-2 px-4 border-b text-center">{row["2015-2016"]}</td>
                            <td className="py-2 px-4 border-b text-center">{row["2016-2017"]}</td>
                            <td className="py-2 px-4 border-b text-center">{row["2017-2018"]}</td>
                            <td className="py-2 px-4 border-b text-center">{row["2018-2019"]}</td>
                            <td className="py-2 px-4 border-b text-center">{row["2019-2020"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
MatriculasTable.displayName = 'MatriculasTable';
export default MatriculasTable;