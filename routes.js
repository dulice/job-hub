import { createMemoryHistory, createRouter } from "vue-router";
import Home from "./src/views/Home.vue";
import Jobs from "./src/views/Jobs.vue";
import JobDetail from "./src/views/JobDetail.vue";
import JobEdit from "./src/views/JobEdit.vue";
import JobAdd from "./src/views/JobAdd.vue";
import Register from "./src/views/auth/Register.vue";
import Login from "./src/views/auth/Login.vue";
import Profile from "./src/views/Profile.vue";
import ProfileEdit from "./src/views/ProfileEdit.vue";

export const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/jobs', name: 'jobs', component: Jobs},
    {path: '/jobs/:id', name: 'job', component: JobDetail},
    {path: '/jobs/edit/:id', name: 'edit', component: JobEdit},
    {path: '/jobs/add', name: 'add', component: JobAdd},
    {path: '/register', name: 'register', component: Register},
    {path: '/login', name: 'login', component: Login},
    {path: '/profile/:id', name: 'profile', component: Profile},
    {path: '/profile/edit/:id', name: 'profileEdit', component: ProfileEdit},
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})