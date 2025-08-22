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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    CircleCheck,
    FolderKanban,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface ITask {
    id: number;
    title: string;
    description: string | null;
    is_completed: boolean;
    due_date: string | null;
    project_id: number;
    project: {
        id: number;
        title: string;
    };
}

interface IProject {
    id: number;
    title: string;
}

interface ITasksIndexProps {
    tasks: {
        data: ITask[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        to: number;
        from: number;
    };
    projects: IProject[];
    filters: {
        search: string;
        filter: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

const tableHeaders: string[] = [
    "Title",
    "Description",
    "Project",
    "Due Date",
    "Status",
    "Actions",
];

const breadCrumbs: BreadcrumbItem[] = [{ title: "Tasks", href: "/dashboard/tasks" }];

export default function Index({
    tasks,
    projects,
    filters,
    flash,
}: ITasksIndexProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(filters.search);
    const [completionFilter, SetCompletionFilter] = useState<
        "all" | "completed" | "pending"
    >(filters.filter as "all" | "completed" | "pending");

    useEffect(() => {
        if (flash?.success) toast.success(flash?.success);
        else if (flash?.error) toast.error(flash?.error);
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
        due_date: "",
        project_id: "",
        is_completed: false as boolean,
    });

    const handleSubmitTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingTask) {
            put(route("tasks.update", editingTask.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingTask(null);
                },
            });
        } else {
            post(route("tasks.store"), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEditTask = (task: ITask) => {
        setEditingTask(task);
        setData({
            title: task.title,
            description: task.description || "",
            due_date: task.due_date || "",
            project_id: task.project_id.toString(),
            is_completed: task.is_completed,
        });
        setIsOpen(true);
    };

    const handleDeleteTask = (taskId: number) => {
        destroy(route("tasks.destroy", taskId));
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(
            route("tasks.index"),
            {
                search: searchTerm,
                filter: completionFilter,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterChange = (value: "all" | "completed" | "pending") => {
        SetCompletionFilter(value);
        router.get(
            route("tasks.index"),
            {
                search: searchTerm,
                filter: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route("tasks.index"),
            {
                page,
                search: searchTerm,
                filter: completionFilter,
            },
            { preserveState: true, preserveScroll: true },
        );
    };
    return (
        <AppLayout breadcrumbs={breadCrumbs}>
            <Head title="Tasks" />
            <div className="form-background flex h-full flex-1 flex-col gap-6 rounded-xl bg-gradient-to-br to-muted/20 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tasks
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Manage your tasks and stay organized
                        </p>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        {tasks.data.length > 0 && (
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer">
                                    <Plus className="h-4 w-4" /> Create New Task
                                </Button>
                            </DialogTrigger>
                        )}
                        <DialogContent
                            className="sm:max-w-[425px]"
                            aria-description="Form"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-xl">
                                    {editingTask
                                        ? "Edit Task"
                                        : "Create New Tasks"}
                                </DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={handleSubmitTask}
                                className="space-y-4"
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
                                        className="focus:ring-2 focus:ring-primary"
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
                                        // required
                                        className="max-h-40 focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="project_id">
                                        Select Project
                                    </Label>
                                    <Select
                                        value={data.project_id}
                                        onValueChange={(value) =>
                                            setData("project_id", value)
                                        }
                                    >
                                        <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem
                                                    key={project.id}
                                                    value={project.id.toString()}
                                                >
                                                    {project.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="due_date">Due Date</Label>
                                    <Input
                                        id="due_date"
                                        type="date"
                                        value={data.due_date}
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                        required
                                        className="text-white"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="is_completed"
                                        checked={data.is_completed}
                                        onChange={(e) =>
                                            setData(
                                                "is_completed",
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-primary"
                                    />
                                    <Label htmlFor="is_completed">
                                        Completed
                                    </Label>
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full cursor-pointer hover:bg-primary/90"
                                    >
                                        {editingTask
                                            ? "Update Task"
                                            : "Create Task"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {!tasks.data.length ? (
                    <div className="flex justify-center items-center">
                        <Card className="w-full">
                            <CardHeader className="flex justify-center items-center">
                                <CardTitle className="">
                                    <Plus size={50} />
                                </CardTitle>
                                <CardDescription>
                                    No task found
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2 justify-center items-center">
                                <p>Start by creating your first task</p>
                                <Button
                                    className="cursor-pointer"
                                    onClick={() => setIsOpen((prev) => !prev)}
                                >
                                    <Plus className="h-4 w-4" />
                                    New Task
                                </Button>
                            </CardContent>
                            <CardFooter>
                                <p>PlanEdge@ {new Date().getFullYear()}</p>
                            </CardFooter>
                        </Card>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex md:flex-row flex-col gap-4">
                            <form
                                onSubmit={handleSearch}
                                className="relative flex-1"
                            >
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                <Input
                                    placeholder="Search Tasks..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </form>
                            <Select
                                value={completionFilter}
                                onValueChange={handleFilterChange}
                            >
                                <SelectTrigger className="md:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Tasks
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="rounded-md border">
                            <div className="relative w-full overflow-auto">
                                <table className="caption-buttom w-full text-sm">
                                    <thead className="[&-tr]:border-b">
                                        <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                            {tableHeaders.map((header) => (
                                                <th
                                                    key={header}
                                                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {tasks.data.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="border-b transition-colors data-[state=selected]:bg-muted"
                                            >
                                                <td className="p-4 align-middle font-medium">
                                                    {task.title}
                                                </td>
                                                <td className="max-w-[200px] truncate p-4 align-middle">
                                                    {task.description ||
                                                        "No Description"}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                                                        {task.project.title}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {task.due_date ? (
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            {new Date(
                                                                task.due_date,
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            No due date
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    {task.is_completed ? (
                                                        <div className="flex items-center gap-2 text-green-500">
                                                            <CircleCheck className="h-4 w-4" />
                                                            <span>
                                                                Completed
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-yellow-500">
                                                            <span>Pending</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right align-middle">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleEditTask(
                                                                    task,
                                                                )
                                                            }
                                                            className="hover:bg-primary/10 hover:text-primary/10 cursor-pointer"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleDeleteTask(
                                                                    task.id,
                                                                )
                                                            }
                                                            className="hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* {!tasks.data.length && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="p-4 text-center text-muted-foreground"
                                        >
                                            No Tasks found
                                        </td>
                                    </tr>
                                )} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Paginition */}
                        <div className="flex items-center justify-between px-2">
                            <div className="text-sm text-muted-foreground">
                                Showing {tasks.from} to {tasks.to} of{" "}
                                {tasks.total}
                                tasks
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        handlePageChange(tasks.current_page - 1)
                                    }
                                    disabled={tasks.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center space-x-1">
                                    {Array.from(
                                        { length: tasks.last_page },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            variant={
                                                page === tasks.current_page
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="icon"
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        handlePageChange(tasks.current_page + 1)
                                    }
                                    disabled={
                                        tasks.current_page === tasks.last_page
                                    }
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
