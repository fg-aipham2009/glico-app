import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
