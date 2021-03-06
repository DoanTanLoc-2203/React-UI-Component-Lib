import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount, shallow } from "enzyme";
import React from "react";
import { Button } from ".";

Enzyme.configure({ adapter: new Adapter() });

describe("Default button", () => {
  it("Default text", () => {
    const wrapper = shallow(<Button>Click me</Button>);
    expect(wrapper.text()).toEqual("Click me");
  });
  it("Default props", () => {
    const wrapper = mount(<Button>Click me</Button>);
    expect(wrapper.prop("size")).toBe("xs");
    expect(wrapper.prop("bgColor")).toBe("default");
    expect(wrapper.prop("variant")).toBe("solid");
  });
});
describe("Button size", () => {
  const size = ["xs", "sm", "md", "lg", "xl"];
  const sizepx = ["10px", "15px", "20px", "25px", "30px", "35px"];
  for (let i = 0; i < size.length; i++) {
    it("size = " + size[i] + " => fontsize = " + sizepx[i] + "px", () => {
      const wrapper = mount(<Button size={size[i]}>Click me</Button>);
      expect(
        getComputedStyle(wrapper.getDOMNode()).getPropertyValue("font-size"),
      ).toBe(sizepx[i]);
    });
  }
});
describe("Button Click", () => {
  it("Test click event", () => {
    let check = false;
    const button = mount(
      <Button
        onClick={() => {
          check = true;
        }}></Button>,
    );
    button.simulate("click");
    expect(check).toEqual(true);
  });
});
