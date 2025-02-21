import { createRouter, createWebHistory } from "vue-router";
import GLTFViewer from "../components/GLTFViewer.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: GLTFViewer,
    // props: { isAdmin: false },
  },
  {
    path: "/:userType",
    name: "Sub",
    component: GLTFViewer,
  },
  {
    path: "/:userType/:modelId",
    name: "Viewer",
    component: GLTFViewer,
    // props: { },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
