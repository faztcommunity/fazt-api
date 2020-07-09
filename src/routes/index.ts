import { Router } from "express";

import taskRoutes from "./tasks.routes";
import projectsRoutes from "./projects.routes";
import userRoutes from "./users.routes";
import jobRoutes from "./jobs.routes";
import indexRoutes from "./index.routes";

const routes = Router();

// routes.use('/discord', route);
// routes.use('/github', route);
// routes.use('/job', route);
routes.use("/", indexRoutes);
routes.use("/tasks", taskRoutes);
routes.use("/projects", projectsRoutes);
routes.use("/users", userRoutes);
routes.use("/jobs", jobRoutes);

export default routes;
