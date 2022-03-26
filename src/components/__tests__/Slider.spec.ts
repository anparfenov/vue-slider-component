import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VSlider from "../Slider/Slider.vue";

describe("VSlider", () => {
	it("renders properly", async () => {
		const wrapper = mount(VSlider, { props: { modelValue: 50 } });
		console.log('wrapper');
		// TODO figure out how to test it (style checks doesn't work)
	});
});
