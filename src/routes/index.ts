import Home from "@views/Home/index.vue" 
import Login from "@views/Auth/Login/index.vue";
import Register from "@views/Auth/Register/index.vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { Route } from "@/utils";
import { useStore } from "vuex";
import { key } from "@/store";

const routes: Array<RouteRecordRaw> = [
	{
		path: Route.HOME,
		name: Route.HOME,
		component: Home,
	},
	{
		path: Route.LOGIN,
		name: Route.LOGIN,
		component: Login,
	},
	{
		path: Route.REGISTER,
		name: Route.REGISTER,
		component: Register,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _from, next) => {
	const isLogged = useStore(key).state.auth.isLogged;
	if(isLogged){
		if(to.path==Route.LOGIN||to.path==Route.REGISTER){
			next({ name: Route.HOME });
		}
		else next()
	}
	else{
		to.name !== Route.LOGIN && to.name !== Route.REGISTER ? next({ name: Route.LOGIN }) : next()
	}
});

export default router;
