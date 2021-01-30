<template>
	<component :is="layout" v-if="ready">
		<transition name="fade" mode="out-in">
			<component :is="componentInstance" v-bind="propsToBind"></component>
		</transition>
	</component>
</template>

<script>
import AppLayout from "./Layouts/AppLayout";
export default {
	methods: {
		updateComponent() {
			console.log(this.component);
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
			propsToBind: {},
			component: null,
			componentInstance: null,
			layout: AppLayout,
			ready: false,
			data: {},
		};
	},
	created() {
		this.data = this.initialData;
		this.component = this.initialComponent;
		this.$store.commit("userUpdate");
		this.$store.commit("setupApp", { data: this.data, app: this });
		this.$nextTick(() => {
			this.updateComponent();
		});
	},
	props: ["initialData", "resolveComponent", "initialComponent"],
};
</script>
