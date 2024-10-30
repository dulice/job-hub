import { createRouter, createWebHistory } from "vue-router";
import Home from "./src/views/Home.vue";
import Jobs from "./src/views/Jobs.vue";
import JobDetail from "./src/views/JobDetail.vue";
import JobEdit from "./src/views/JobEdit.vue";
import JobAdd from "./src/views/JobAdd.vue";
import Register from "./src/views/auth/Register.vue";
import Login from "./src/views/auth/Login.vue";
import Profile from "./src/views/Profile.vue";
import ProfileEdit from "./src/views/ProfileEdit.vue";
import Search from "./src/views/Search.vue";
import Apply from "./src/views/Apply.vue";

export const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/jobs', name: 'jobs', component: Jobs},
    {path: '/jobs/search', name: 'search', component: Search, props: route => ({query: {q: route.query.q, location: route.query.location}})},
    {path: '/jobs/:id', name: 'job', component: JobDetail},
    {path: '/jobs/edit/:id', name: 'edit', component: JobEdit},
    {path: '/jobs/add', name: 'add', component: JobAdd},
    {path: '/register', name: 'register', component: Register},
    {path: '/login', name: 'login', component: Login},
    {path: '/profile/:id', name: 'profile', component: Profile, props: true},
    {path: '/profile/edit/:id', name: 'profileEdit', component: ProfileEdit},
    {path: '/apply/:jobId', name: 'apply', component: Apply},

];

export const router = createRouter({
    history: createWebHistory(),
    routes,
})