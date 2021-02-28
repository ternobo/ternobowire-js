<template>
	<component :is="layout" :loading="loading">
		<transition name="fade" mode="out-in">
			<component v-if="ready" :is="componentInstance" v-bind="propsToBind"></component>
		</transition>
	</component>
</template>

<script>
import AppLayout from "@/Layouts/AppLayout";
export default {
	methods: {
		updateComponent() {
			this.resolveComponent(this.component).then((value) => {
				this.componentInstance = value.default;
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
		});
		this.$store.dispatch("loadUser");
		this.$store.commit("setupApp", { data: this.data, app: this });
	},
	props: ["dataToken", "resolveComponent"],
};
</script>
