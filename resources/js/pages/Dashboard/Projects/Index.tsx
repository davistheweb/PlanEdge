import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface IProject {
    id: number;
    title: string;
    description: string | null;
    project_count?: number;
}

interface IProjectIndexProps {
    projects: IProject[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadCrumbs: BreadcrumbItem[] = [
    {
        title: "Projects",
        href: "/projects",
    },
];
export default function Index({ projects, flash }: IProjectIndexProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<IProject | null>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        else if (flash?.error) toast.error(flash.error);
    }, [flash]);
    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        delete: destroy,
    } = useForm({
        title: "",
        description: "",
    });

    const handleSubmitProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingProject) {
            put(route("projects.update", editingProject.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingProject(null);
                },
            });
        } else {
            post(route("projects.store"), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEditProject = (project: IProject) => {
        setEditingProject(project);
        setData({
            title: project.title,
            description: project.description || "",
        });
        setIsOpen(true);
    };

    const handleDeleteProject = (projectId: number) => {
        destroy(route("projects.destroy", projectId));
    };

    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    {projects.length > 0 && (
                        <div>
                            <h1 className="text-2xl font-bold">Projects</h1>
                            <p className="mt-1 text-muted-foreground">
                                Manage your projects and stay organized
                            </p>
                        </div>
                    )}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        {projects.length > 0 && (
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Project
                                </Button>
                            </DialogTrigger>
                        )}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingProject
                                        ? "Edit Project"
                                        : "Create New Project"}
                                </DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmitProject}
                                className="space-y-8"
                            >
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="cursor-pointer"
                                >
                                    {editingProject ? "Update" : "Create"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {!projects.length ? (
                    <div className="flex justify-center items-center">
                        <Card className="w-full">
                            <CardHeader className="flex justify-center items-center">
                                <CardTitle className="">
                                    <Plus size={50} />
                                </CardTitle>
                                <CardDescription>
                                    No project found
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 justify-center items-center">
                                <p>Start by creating your first project</p>
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <Plus className="h-4 w-4" />
                                    New project
                                </Button>
                            </CardContent>
                            <CardFooter>
                                <p>PlanEdge@ {new Date().getFullYear()}</p>
                            </CardFooter>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                className="transition-colors hover:bg-accent/50"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium">
                                        {project.title}
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleEditProject(project)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDeleteProject(project.id)
                                            }
                                            className="cursor-pointer text-destructive hover:text-destructive/90"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {project.description ||
                                            "No description"}
                                    </p>
                                    {project.project_count !== undefined && (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {project.project_count} tasks
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
