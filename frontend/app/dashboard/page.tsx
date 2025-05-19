import { Card, CardContent } from "@/components/ui/card";


export default function Dashboard() {
    return (
        <div className="mx-2.5 mt-8">
            <h1 className="text-lg font-bold">Overview</h1>

            {/* Statistic Cards */}
            <div className="grid grid-cols-3">
                <Card>
                    <CardContent>
                        <h2>90 +</h2>
                        <p>Kontribusi</p>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}