import { createMemoryHistory, createRouter } from "vue-router";
import Home from "./src/views/Home.vue";
import Jobs from "./src/views/Jobs.vue";
import JobDetail from "./src/views/JobDetail.vue";
import JobEdit from "./src/views/JobEdit.vue";
import JobAdd from "./src/views/JobAdd.vue";

export const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/jobs', name: 'jobs', component: Jobs},
    {path: '/jobs/:id', name: 'job', component: JobDetail},
    {path: '/jobs/edit/:id', name: 'edit', component: JobEdit},
    {path: '/jobs/add', name: 'add', component: JobAdd},
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})