import { AITypographyDemo } from "../../components/features/AITypographyDemo";

export const metadata = {
    title: 'AI Typography Generator',
    description: 'Describe your project and let AI instantly generate the mathematically perfect fluid typography scale.',
};

export default function AITypographyPage() {
    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Header background decoration */}
            <div className="absolute inset-0 top-0 h-[500px] w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a] -z-10" />
            <AITypographyDemo />
        </div>
    );
}
