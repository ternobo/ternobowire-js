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
			this.$refs["pageInstance"].$options.beforeRouteLeave(to, from, next);
		},
		emitbeforeRouteEnter(to, from) {
			let next = () => {
				this.updateComponent();
			};
			this.componentInstance.beforeRouteEnter(to, from, next);
		},
		destroyPage() {
			if (this.componentInstance) {
				this.componentInstance.$destroy();
			}
		},
		updateComponent() {
			this.resolveComponent(this.component).then((value) => {
				this.destroyPage();
				let page = value.default;
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
			});
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
		axios.post("/ternobo-wire/get-data/" + this.dataToken).then((response) => {
			let data = response.data;
			this.data = data.data;
			this.component = data.component;
			this.$store.commit("updateShared", data.shared);
			this.$nextTick(() => {
				this.updateComponent();
			});
			this.loading = false;
			this.$store.dispatch("loadUser");
			this.$store.commit("setupApp", { data: this.data, component: this.component, app: this });
		});
	},
	props: ["dataToken", "resolveComponent"],
};
</script>
