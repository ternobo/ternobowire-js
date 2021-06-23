<template>
	<component :is="layout" :loading="loading">
		<transition name="fade" mode="out-in">
			<component v-if="ready" ref="pageInstance" :is="componentInstance" v-bind="propsToBind"></component>
		</transition>
	</component>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
export default {
	methods: {
		emitBeforeRouteLeave(to, from, next) {
			this.$refs["pageInstance"].$options.beforeRouteLeave(to, from, next, this.$refs["pageInstance"]);
		},
		emitbeforeRouteEnter(to, from) {
			return this.resolveComponent(this.component).then((value) => {
				this.destroyPage();
				let page = value.default;
				let next = () => {
					this.loadPage(page);
				};
				if (page.beforeRouteEnter) {
					this.componentInstance.beforeRouteEnter(to, from, next);
				} else {
					next();
				}
			});
		},
		destroyPage() {
			if (this.$refs["pageInstance"]) {
				this.$refs["pageInstance"].$destroy();
			}
		},

		loadPage(page) {
			this.componentInstance = page;
			if (this.componentInstance.layout != null) {
				this.layout = this.componentInstance.layout;
			}
			if (this.componentInstance.props) {
				this.propsToBind = {};
				if (Array.isArray(this.componentInstance.props)) {
					this.componentInstance.props.forEach((item) => {
						this.propsToBind[item] = this.data[item];
					});
				} else {
					Object.keys(this.componentInstance.props).forEach((item) => {
						this.propsToBind[item] = this.data[item];
					});
				}
			}
			this.$forceUpdate();
			this.ready = true;
		},
	},
	data() {
		return {
			loading: true,
			propsToBind: {},
			component: null,
			componentInstance: null,
			layout: AppLayout,
			ready: false,
			data: {},
		};
	},
	created() {
		axios
			.post("/ternobo-wire/get-data/" + this.dataToken)
			.then((response) => {
				let data = response.data;
				this.data = data.data;
				this.component = data.component;
				this.$store.commit("updateShared", data.shared);
				this.loading = false;
				this.$store.dispatch("loadUser");
				this.$store.commit("setupApp", { data: this.data, component: this.component, app: this });
			})
			.catch(() => {
				window.location.reload();
			});
	},
	props: ["dataToken", "resolveComponent"],
};
</script>
