import { CastingCard } from "../../components";
import { castingcalldata } from "../../data";


const CastingCalls = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Casting Calls</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {castingcalldata.map((item) => (
                    <CastingCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default CastingCalls;
