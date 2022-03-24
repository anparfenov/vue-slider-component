import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VSlider from "../Slider/Slider.vue";

// TODO
describe("VSlider", () => {
	it("renders properly", async () => {
		const wrapper = mount(VSlider, { props: { modelValue: 50 } });
		const handle = wrapper.get(".slider__handle").element;
		const sliderStyle = getComputedStyle(handle);
		expect(sliderStyle.top).toContain("50%");
	});
});
