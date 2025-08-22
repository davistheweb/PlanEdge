import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    FolderKanban,
    ListTodo,
    Plus,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IDashboardProps {
    stats?: {
        totalProjects: number;
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
    };
}

const breadCrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function Dashboard({
    stats = {
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
    },
}: IDashboardProps) {
    const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

    useEffect(() => {
        setTimeOfDay(getTimeOfDay());
    }, []);

    function getTimeOfDay() {
        const now = new Date();
        const currentHour = now.getHours();

        return currentHour >= 6 && currentHour < 12
            ? "Good morning"
            : currentHour >= 12 && currentHour < 18
              ? "Good afternoon"
              : "Good evening";
    }

    const { auth } = usePage<SharedData>().props;
    console.log(stats);

    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl bg-gradient-to-br from-background to-muted/20 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                            {timeOfDay}, {auth.user.name.split(" ")[0]}
                        </h1>
                        <p className="mt-1 text-bold-300">
                            Welcome back to PlanEdge
                        </p>
                        <p className="mt-1 text-bold-300">
                            Here's the overview from your projects and tasks.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 ">
                        <Link href={route("projects.index")}>
                            <Button className="shadow-lg cursor-pointer">
                                <FolderKanban className="h-4 mr-1 w-4" />
                                View Projects
                            </Button>
                        </Link>
                        <Link href={route("tasks.index")}>
                            <Button className="shadow-lg cursor-pointer">
                                <ListTodo className="h-4 mr-1 w-4" />
                                View Tasks
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-500">
                                Total Projects
                            </CardTitle>
                            <FolderKanban className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-500">
                                {stats.totalProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your total project
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-500">
                                Total Tasks
                            </CardTitle>
                            <ListTodo className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">
                                {stats.totalTasks}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your total task
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-500">
                                Pending Task
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-500">
                                {stats.pendingTasks}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your total pending task
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-500">
                                Completed Tasks
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-500">
                                {stats.completedTasks}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your total Completed task
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    <Card className="border-primary/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="textlg">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Link href={route("projects.index")}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start cursor-pointer"
                                    >
                                        <FolderKanban className="mr-2 h-4 w-4" />
                                        View All
                                    </Button>
                                </Link>
                                <Link href={route("tasks.index")}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start cursor-pointer"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Plus className="h-4 w-4 text-primary cursor-pointer" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Welcome to PlanEdge
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Start by creating your Project or
                                            Task
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
