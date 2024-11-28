import HelperPage from "@/components/about/HelperPage";

const people = [
    {
        id: 1,
        name: ["Oleksandr", "Tyutyunnyk"],
        role: "CEO / Main Teacher",
        fluentIn: ["Slovene", "English", "Russian"],
        imageUrl:
            "https://generalseba.github.io/slovene-step-by-step/foto-oleksandr3.jpg",
        education: "University of Ljubljana",
        nativeLanguage: "Russian",
        languageExperience: "Extensive practical experience in Slovene, including spelling, grammar, and conversational fluency",
        tutoringExperience: "5 years of Tutoring experience",
        goal: "Dedication to helping students build confidence and overcome language barriers",
    },
    {
        id: 2,
        name: ["Manca", "Levašič"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "English"],
        imageUrl: "https://placehold.co/600x600",
        education: "University of Ljubljana",
        nativeLanguage: "Slovene",
        languageExperience: "Native speaker",
        tutoringExperience: "4 years of tutoring experience",
        goal: "",
    },
    {
        id: 3,
        name: ["Teja", "Šabec"],
        role: "Professional Teacher",
        fluentIn: ["Slovene", "Italian", "English"],
        imageUrl: "https://placehold.co/600x600",
        education: "University of Ljubljana",
        nativeLanguage: "Slovene",
        languageExperience: "Native speaker",
        tutoringExperience: "5 years of tutoring experience",
        goal: "Teaching is more than just a job — it's a way to share culture, connect with people from all walks of life, and help them discover Slovenia.",
    },
];

const link = "https://generalseba.github.io/slovene-step-by-step";

export default function MeetTheTeamPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-xl mb-10">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        Meet our Team
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        We're a dynamic group of individuals who are passionate about what
                        we do and dedicated to delivering the best results for our clients.
                    </p>
                </div>
                <HelperPage people={people} link={link} />
            </div>
        </div>
    );
}
